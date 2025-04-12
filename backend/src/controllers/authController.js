import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
const prisma = new PrismaClient();

const authController = {
  CreateAnUser: async function (email, password, name, role = "USER") {
    try {
      let existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email đã tồn tại");
      }

      let hashedPassword = await hash(password, 10);
      let user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Update: async function (req) {
    try {
      let { email, name } = req.body;
      let userId = parseInt(req.params.id);

      let updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Delete: async function (req) {
    try {
      let userId = parseInt(req.params.id);
      let deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  CheckLogin: async function (email, password) {
    let user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }
    let isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }
    return user;
  },

  Me: async function (id) {
    let user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return user;
  },

  ChangePassword: async function (req, res) {
    try {
      const userId = parseInt(req.user.id);
      const { currentPassword, newPassword } = req.body;
      if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Thiếu thông tin cần thiết",
        });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "Không tìm thấy người dùng",
        });
      }
      const isValidPassword = await compare(
        currentPassword,
        user.password
      );
      if (!isValidPassword) {
        return res.status(400).json({
          message: "Mật khẩu hiện tại không đúng",
        });
      }
      const hashedPassword = await hash(newPassword, 10);
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  GetAllUsers: async function () {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });
      return users;
    } catch (error) {
      throw new Error("Không thể lấy danh sách người dùng");
    }
  },
};

export default authController;