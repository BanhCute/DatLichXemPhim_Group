let jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

module.exports = {
    CheckAuth: async function (req, res, next) {
        if (req.headers && req.headers.authorization) {
          let authorization = req.headers.authorization;
          if (authorization.startsWith("Bearer")) {
            let token = authorization.split(" ")[1];
            try {
              let result = jwt.verify(token, process.env.JWT_SECRET);
              let user = await authController.Me(result.id);
              if (!user) {
                return res.status(401).json({ message: "User không tồn tại" });
              }
              req.user = user;
              next();
            } catch (error) {
              console.log(error.message);
              return res.status(403).json({ message: "Token không hợp lệ" });
            }
          } else {
            return res.status(401).json({ message: "Chưa đăng nhập" });
          }
        } else {
          return res.status(401).json({ message: "Chưa đăng nhập" });
        }
    },

    CheckRole: async function (req, res, next) {
      try {
          let roleOfUser = req.user.role;
          if (roleOfUser === "ADMIN") {
            next();
          } else {
            throw new Error("Không có quyền truy cập");
          }
      } catch (error) {
          next(error);
      }
    },
};