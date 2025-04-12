let { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports = {
  GetAll: async function () {
    return await prisma.review.findMany({
      include: { user: true, movie: true },
    });
  },

  Create: async function (req) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      let { movieId, rating, comment } = req.body;

      let review = await prisma.review.create({
        data: {
          rating,
          comment,
          user: {
            connect: { id: userId },
          },
          movie: {
            connect: { id: parseInt(movieId) },
          },
        },
        include: {
          user: true,
          movie: true,
        },
      });
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      let { rating, comment } = req.body;
      let review = await prisma.review.update({
        where: { id: parseInt(req.params.id) },
        data: { rating, comment },
      });
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Delete: async function (req) {
    try {
      let reviewId = parseInt(req.params.id);
      let deletedReview = await prisma.review.delete({
        where: { id: reviewId },
      });
      return deletedReview;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
