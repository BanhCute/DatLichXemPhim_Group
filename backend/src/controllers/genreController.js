let { PrismaClient } = require("@prisma/client");
const { Update } = require("./authController");

const prisma = new PrismaClient();

module.exports = {
  GetAll: async function () {
    return await prisma.genre.findMany();
  },

  Create: async function (name) {
    try {
        let genre = await prisma.genre.create({
            data: { name: name },
        });
        return genre;
    } catch (error) {
        throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      let { name } = req.body;
      let genre = await prisma.genre.update({
        where: { id: parseInt(req.params.id) },
        data: { name: name },
      });
      return genre;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Delete: async function (req) {
    try {
        const genreId = parseInt(req.params.id);
        const movieGenres = await prisma.movieGenre.findMany({
            where: { genreId: genreId },
        });
        if (movieGenres.length > 0) {
            throw new Error("Không thể xóa thể loại vì đang được sử dụng trong phim");
        }
        const deletedGenre = await prisma.genre.delete({
            where: { id: genreId },
        });
        return deletedGenre;
    } catch (error) {
        throw new Error(error.message);
    }
},
};