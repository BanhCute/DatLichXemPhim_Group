const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const bookingController = {
  GetAll: async function (req, res) {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          showTime: {
            include: {
              movie: true,
            },
          },
          seats: true,
          payments: true,
          promotion: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.json({ data: bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  GetById: async function (req, res) {
    try {
      const bookingId = parseInt(req.params.id);

      if (!bookingId) {
        return res.status(400).json({
          message: "ID đặt vé không hợp lệ",
        });
      }

      const booking = await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
        include: {
          showTime: {
            include: {
              movie: true,
            },
          },
          seats: true,
          promotion: true,
          payments: true,
        },
      });

      if (!booking) {
        return res.status(404).json({
          message: "Không tìm thấy đơn đặt vé",
        });
      }

      return res.json({
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  },

  Create: async function (req, res) {
    try {
      let { showTimeId, seatNumbers, promotionCode, paymentMethod } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (
        !showTimeId ||
        !seatNumbers ||
        !Array.isArray(seatNumbers) ||
        seatNumbers.length === 0
      ) {
        return res.status(400).json({
          message: "Thông tin đặt vé không hợp lệ",
        });
      }

      // Lấy thông tin user từ token
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Kiểm tra user
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy thông tin người dùng",
        });
      }

      // Kiểm tra suất chiếu
      const showTimeIdInt = parseInt(showTimeId);
      let showTime = await prisma.showTime.findUnique({
        where: { id: showTimeIdInt },
        include: {
          movie: true,
        },
      });

      if (!showTime) {
        return res.status(404).json({
          message: "Không tìm thấy suất chiếu",
        });
      }

      // Kiểm tra ghế đã được đặt chưa
      const bookedSeats = await prisma.seat.findMany({
        where: {
          showTimeId: showTimeIdInt,
          number: { in: seatNumbers },
          status: "BOOKED",
        },
      });

      if (bookedSeats.length > 0) {
        return res.status(400).json({
          message: "Một số ghế đã được đặt. Vui lòng chọn ghế khác.",
          bookedSeats: bookedSeats.map((seat) => seat.number),
        });
      }

      // Tính giá và kiểm tra mã giảm giá
      let totalPrice = seatNumbers.length * showTime.price;
      let promotionId = null;

      if (promotionCode) {
        const promotion = await prisma.promotion.findFirst({
          where: {
            code: promotionCode,
            startDate: {
              lte: new Date(),
            },
            endDate: {
              gte: new Date(),
            },
          },
        });

        if (promotion) {
          promotionId = promotion.id;
          const discount = totalPrice * (promotion.discount / 100);
          totalPrice = totalPrice - discount;
        }
      }

      // Sử dụng transaction để đảm bảo tính nhất quán
      const result = await prisma.$transaction(async (prisma) => {
        // Tạo booking
        const booking = await prisma.booking.create({
          data: {
            userId,
            showTimeId: showTimeIdInt,
            totalPrice,
            status: "CONFIRMED",
            promotionId: promotionId,
            payments: {
              create: {
                amount: totalPrice,
                method: paymentMethod || "CASH",
                status: "COMPLETED",
              },
            },
          },
          include: {
            promotion: true,
            seats: true,
            showTime: {
              include: {
                movie: true,
              },
            },
            payments: true,
          },
        });

        // Cập nhật trạng thái ghế
        await prisma.seat.updateMany({
          where: {
            showTimeId: showTimeIdInt,
            number: { in: seatNumbers },
          },
          data: {
            status: "BOOKED",
            bookingId: booking.id,
          },
        });

        return booking;
      });

      // Trả về kết quả
      return res.status(201).json({
        success: true,
        data: result,
        message: "Đặt vé thành công",
      });
    } catch (error) {
      console.error("Booking error:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi khi đặt vé: " + error.message,
      });
    }
  },

  GetMyBookings: async function (req, res) {
    try {
      const userId = parseInt(req.user.id);
      const bookings = await prisma.booking.findMany({
        where: {
          userId: userId,
        },
        include: {
          showTime: {
            include: {
              movie: true,
            },
          },
          seats: true,
          promotion: true,
          payments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.json({
        data: bookings,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server: " + error.message,
      });
    }
  },
};

module.exports = bookingController;