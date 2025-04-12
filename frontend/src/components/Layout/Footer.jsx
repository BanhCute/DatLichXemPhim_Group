import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#141414",
        color: "#fff",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        borderTop: "1px solid #333",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        🎬 <strong style={{ color: "#e50914" }}>RẠP PHIM LGTV</strong> – Trải nghiệm mua vé xem phim tại nhà
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 14, color: "#aaa" }}>
        © {new Date().getFullYear()} LGTV. All rights reserved.
      </Typography>
      <Box mt={1}>
        <Link
          href="#"
          underline="hover"
          sx={{ color: "#ccc", mx: 1, "&:hover": { color: "#e50914" } }}
        >
          Chính sách bảo mật
        </Link>
        <Link
          href="#"
          underline="hover"
          sx={{ color: "#ccc", mx: 1, "&:hover": { color: "#e50914" } }}
        >
          Điều khoản dịch vụ
        </Link>
        <Link
          href="#"
          underline="hover"
          sx={{ color: "#ccc", mx: 1, "&:hover": { color: "#e50914" } }}
        >
          Liên hệ
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
