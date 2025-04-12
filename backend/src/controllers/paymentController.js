import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetAll(userId) {
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
}
export async function Create(body) {
  try {
    let { bookingId, amount, method, status } = body;
    let payment = await prisma.payment.create({
      data: { bookingId, amount, method, status },
    });
    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function Update(req) {
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
}