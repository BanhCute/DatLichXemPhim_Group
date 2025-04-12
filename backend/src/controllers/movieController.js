const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const movieController = {
  GetAll: async function () {
    try {
      const movies = await prisma.movie.findMany({
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Chuyển đổi dữ liệu trước khi trả về
      return movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        imageUrl: movie.imageUrl,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        genres: movie.genres.map((mg) => mg.genre),
      }));
    } catch (error) {
      throw new Error("Không thể lấy danh sách phim: " + error.message);
    }
  },

  GetById: async function (req, res) {
    try {
      const id = parseInt(req.params.id);
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
          showTimes: {
            where: {
              startTime: {
                gte: new Date(), // Chỉ lấy lịch chiếu từ hiện tại trở đi
              },
            },
            orderBy: {
              startTime: "asc",
            },
          },
        },
      });

      if (!movie) {
        return res.status(404).json({
          message: "Không tìm thấy phim",
        });
      }

      const transformedMovie = {
        ...movie,
        genres: movie.genres.map((mg) => mg.genre),
      };

      return res.json({ data: transformedMovie });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  Create: async function (req) {
    try {
      const { title, description, duration, imageUrl, genres } = req.body;

      const movie = await prisma.movie.create({
        data: {
          title,
          description,
          duration: parseInt(duration),
          imageUrl,
          // Tạo quan hệ với genres
          genres: {
            create: genres
              ? genres.map((genreId) => ({
                  genreId: parseInt(genreId),
                }))
              : [],
          },
        },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      });

      // Chuyển đổi dữ liệu trước khi trả về
      const transformedMovie = {
        ...movie,
        genres: movie.genres.map((mg) => mg.genre),
      };

      return transformedMovie;
    } catch (error) {
      throw new Error(`Không thể tạo phim: ${error.message}`);
    }
  },

  Update: async function (req) {
    try {
      const { title, description, duration, imageUrl, genres } = req.body;
      const movieId = parseInt(req.params.id);

      // Cập nhật thông tin phim và thể loại
      const movie = await prisma.movie.update({
        where: { id: movieId },
        data: {
          title,
          description,
          duration: parseInt(duration),
          imageUrl,
          // Cập nhật quan hệ với genres
          genres: {
            // Xóa tất cả quan hệ cũ
            deleteMany: {},
            // Tạo quan hệ mới
            create: genres.map((genreId) => ({
              genreId: parseInt(genreId),
            })),
          },
        },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      });

      // Chuyển đổi dữ liệu trước khi trả về
      const transformedMovie = {
        ...movie,
        genres: movie.genres.map((mg) => mg.genre),
      };

      return transformedMovie;
    } catch (error) {
      throw new Error(`Không thể cập nhật phim: ${error.message}`);
    }
  },

  Delete: async function (req) {
    try {
      const movieId = parseInt(req.params.id);

      // Xóa phim trực tiếp, các bảng liên quan sẽ tự động xóa theo cascade
      const deletedMovie = await prisma.movie.delete({
        where: { id: movieId },
        include: {
          genres: true,
          showTimes: true,
          reviews: true,
        },
      });

      return deletedMovie;
    } catch (error) {
      throw new Error("Không thể xóa phim: " + error.message);
    }
  },
};

module.exports = movieController;
