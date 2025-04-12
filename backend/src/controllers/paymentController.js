let { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  GetAll: async function (userId) {
    const userPayments = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        bookings: {
          include: {
            payments: true,
          },
        },
      },
    });
    const payments = userPayments.bookings.flatMap(booking => booking.payments);
    return payments;
  },

  Create: async function (body) {
    try {
      let { bookingId, amount, method, status } = body;
      let payment = await prisma.payment.create({
        data: { bookingId, amount, method, status },
      });
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      let { status } = req.body;
      let payment = await prisma.payment.update({
        where: { id: parseInt(req.params.id) },
        data: { status },
      });
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};