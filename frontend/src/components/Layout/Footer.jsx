import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  // Hiệu ứng chuyển động cho container và các thành phần con
  const containerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box
        component="footer"
        sx={{
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
          color: "#fff",
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.5)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 -8px 30px rgba(229, 9, 20, 0.3)",
          },
        }}
      >
        <motion.div variants={childVariants}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
            }}
          >
            🎬{" "}
            <span
              style={{
                color: "transparent",
                background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#e50914", // Fallback
                animation: "gradientText 3s ease infinite",
                textShadow: "0 0 15px rgba(229, 9, 20, 0.5)",
              }}
            >
              🎬 LGTV CENIMA
            </span>{" "}
            – Trải nghiệm mua vé xem phim tại nhà
          </Typography>
        </motion.div>

        <motion.div variants={childVariants}>
          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              color: "#aaa",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} LGTV. All rights reserved.
          </Typography>
        </motion.div>

        <Box mt={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <motion.div variants={childVariants}>
            <Link
              href="#"
              underline="none"
              component={motion.a}
              variants={linkVariants}
              whileHover="hover"
              sx={{
                color: "#ccc",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                position: "relative",
                "&:hover": {
                  color: "#e50914",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                    animation: "ripple 1s ease-out",
                  },
                },
              }}
            >
              Chính sách bảo mật
            </Link>
          </motion.div>

          <motion.div variants={childVariants}>
            <Link
              href="#"
              underline="none"
              component={motion.a}
              variants={linkVariants}
              whileHover="hover"
              sx={{
                color: "#ccc",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                position: "relative",
                "&:hover": {
                  color: "#e50914",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                    animation: "ripple 1s ease-out",
                  },
                },
              }}
            >
              Điều khoản dịch vụ
            </Link>
          </motion.div>

          <motion.div variants={childVariants}>
            <Link
              href="#"
              underline="none"
              component={motion.a}
              variants={linkVariants}
              whileHover="hover"
              sx={{
                color: "#ccc",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                position: "relative",
                "&:hover": {
                  color: "#e50914",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #e50914, transparent)",
                    animation: "ripple 1s ease-out",
                  },
                },
              }}
            >
              Liên hệ
            </Link>
          </motion.div>
        </Box>

        <style>
          {`
            @keyframes gradientBackground {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes gradientText {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes ripple {
              0% { transform: scaleX(0); opacity: 1; }
              100% { transform: scaleX(1); opacity: 0; }
            }
          `}
        </style>
      </Box>
    </motion.div>
  );
};

export default Footer;