let { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  GetAll: async function () {
    return await prisma.movieGenre.findMany({
      include: { movie: true, genre: true },
    });
  },

  Create: async function (body) {
    try {
      let { movieId, genreId } = body;
      let movieGenre = await prisma.movieGenre.create({
        data: { movieId, genreId },
      });
      return movieGenre;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      let { movieId, genreId } = req.body;
      let movieGenre = await prisma.movieGenre.update({
        where: { id: parseInt(req.params.id) },
        data: { movieId, genreId },
      });
      return movieGenre;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Delete: async function (req) {
    try {
      let movieGenreId = parseInt(req.params.id);
      let deletedMovieGenre = await prisma.movieGenre.delete({
        where: { id: movieGenreId },
      });
      return deletedMovieGenre;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};