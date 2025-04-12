const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const showTimeController = {
  GetAll: async function () {
    try {
      const showTimes = await prisma.showTime.findMany({
        include: {
          movie: true,
          seats: true,
        },
        orderBy: {
          startTime: "asc",
        },
      });
      return showTimes;
    } catch (error) {
      throw new Error("Không thể lấy danh sách suất chiếu: " + error.message);
    }
  },

  GetByMovie: async function (req, res) {
    try {
      const movieId = parseInt(req.params.movieId);
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
      });
      if (!movie) {
        return res.status(404).json({
          message: "Không tìm thấy phim",
        });
      }
      const showTimes = await prisma.showTime.findMany({
        where: {
          movieId: movieId,
        },
        orderBy: {
          startTime: "asc",
        },
      });
      return res.json({
        data: showTimes,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  GetById: async function (req, res) {
    try {
      const showTimeId = parseInt(req.params.id);
      const showTime = await prisma.showTime.findUnique({
        where: { id: showTimeId },
        include: {
          movie: true,
          seats: true,
        },
      });
      if (!showTime) {
        return res.status(404).json({
          message: "Không tìm thấy suất chiếu",
        });
      }
      return res.json({
        data: showTime,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  Create: async function (body) {
    try {
      let { movieId, startTime, endTime, room, price } = body;
      let showTime = await prisma.showTime.create({
        data: {
          movieId,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          room,
          price,
        },
        include: {
          movie: true,
        },
      });
      return showTime;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      const { movieId, startTime, endTime, room, price } = req.body;
      const showTimeId = parseInt(req.params.id);

      const showTime = await prisma.showTime.update({
        where: { id: showTimeId },
        data: {
          movieId: parseInt(movieId),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          room,
          price: parseFloat(price),
        },
        include: {
          movie: true,
        },
      });
      return showTime;
    } catch (error) {
      throw new Error("Không thể cập nhật suất chiếu: " + error.message);
    }
  },

  Delete: async function (req) {
    try {
      const showTimeId = parseInt(req.params.id);

      // Kiểm tra xem có booking nào không
      const bookings = await prisma.booking.findMany({
        where: { showTimeId: showTimeId },
      });

      if (bookings.length > 0) {
        throw new Error("Không thể xóa suất chiếu đã có người đặt vé");
      }

      // Xóa tất cả ghế của suất chiếu
      await prisma.seat.deleteMany({
        where: { showTimeId: showTimeId },
      });

      // Xóa suất chiếu
      const deletedShowTime = await prisma.showTime.delete({
        where: { id: showTimeId },
      });

      return deletedShowTime;
    } catch (error) {
      throw new Error("Không thể xóa suất chiếu: " + error.message);
    }
  },


  GetSeats: async function (req, res) {
    try {
      const showTimeId = parseInt(req.params.id);
      const showTime = await prisma.showTime.findUnique({
        where: { id: showTimeId },
      });
      if (!showTime) {
        return res.status(404).json({
          message: "Không tìm thấy suất chiếu",
        });
      }
      const seats = await prisma.seat.findMany({
        where: { showTimeId: showTimeId },
        orderBy: [{ number: "asc" }],
      });
      if (seats.length === 0) {
        const rows = ["A", "B", "C", "D", "E"];
        const seatsPerRow = 8;
        const defaultSeats = [];
        for (let row of rows) {
          for (let i = 1; i <= seatsPerRow; i++) {
            defaultSeats.push({
              number: `${row}${i}`,
              showTimeId: showTimeId,
              status: "AVAILABLE",
            });
          }
        }
        await prisma.seat.createMany({
          data: defaultSeats,
        });
        const newSeats = await prisma.seat.findMany({
          where: { showTimeId: showTimeId },
          orderBy: [{ number: "asc" }],
        });
        return res.json({
          data: newSeats,
        });
      }
      return res.json({
        data: seats,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = showTimeController;
