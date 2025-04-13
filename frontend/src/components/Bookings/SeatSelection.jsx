import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Paper,
  Container,
  Chip,
  Divider,
  Card,
  CardMedia,
  Stack,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import WeekendIcon from "@mui/icons-material/Weekend";
import TheatersIcon from "@mui/icons-material/Theaters";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import dayjs from "dayjs";
import { motion } from "framer-motion";

// Tạo MotionButton
const MotionButton = motion(Button);

const SeatSelection = () => {
  const { showTimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTime, setShowTime] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    fetchShowTimeDetails();
    fetchSeats();
  }, [showTimeId]);

  const fetchShowTimeDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/showtimes/${showTimeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể tải thông tin suất chiếu");
      }

      const data = await response.json();
      console.log("ShowTime data:", data);
      setShowTime(data.data);
      setMovieInfo(data.data.movie);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const fetchSeats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/showtimes/${showTimeId}/seats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể tải thông tin ghế");
      }

      const data = await response.json();

      const sortedSeats = data.data.sort((a, b) => {
        const aRow = a.number.charAt(0);
        const bRow = b.number.charAt(0);
        return aRow === bRow
          ? parseInt(a.number.slice(1)) - parseInt(b.number.slice(1))
          : aRow.localeCompare(bRow);
      });

      const groupedSeats = {};
      sortedSeats.forEach((seat) => {
        const row = seat.number.charAt(0);
        if (!groupedSeats[row]) {
          groupedSeats[row] = [];
        }
        groupedSeats[row].push(seat);
      });

      setSeats(groupedSeats);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status === "BOOKED") return;

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const getSeatColor = (status, isSelected) => {
    if (isSelected) return "success";
    switch (status) {
      case "AVAILABLE":
        return "primary";
      case "BOOKED":
        return "error";
      case "RESERVED":
        return "warning";
      default:
        return "default";
    }
  };

  const handleContinue = () => {
    navigate("/booking/confirm", {
      state: {
        showTimeId,
        selectedSeats: selectedSeats.map((id) => {
          const seat = Object.values(seats)
            .flat()
            .find((s) => s.id === id);
          return {
            id: seat.id,
            number: seat.number,
          };
        }),
        showTime,
        movieInfo,
        totalPrice: selectedSeats.length * (showTime?.price || 0),
      },
    });
  };

  const formatDateTime = (dateString) => {
    return dayjs(dateString).format("HH:mm - DD/MM/YYYY");
  };

  // Hiệu ứng chuyển động
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(229, 9, 20, 0.7)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          ⌛ Đang tải thông tin...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
          backgroundSize: "200%",
          animation: "gradientBackground 10s ease infinite",
        }}
      >
        <Typography variant="h6" sx={{ color: "#e50914" }}>
          ❌ {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #0a0a0a, #1c2526, #0a0a0a)",
        backgroundSize: "200%",
        animation: "gradientBackground 10s ease infinite",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Thông tin phim */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 9, 20, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
              },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <motion.div variants={childVariants}>
                  <Card sx={{ borderRadius: 3, height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={movieInfo?.imageUrl || "/images/default-movie.jpg"}
                      alt={movieInfo?.title}
                      sx={{
                        objectFit: "cover",
                        borderRadius: 3,
                        boxShadow: "0 6px 20px rgba(229, 9, 20, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 10px 30px rgba(229, 9, 20, 0.5)",
                        },
                      }}
                    />
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={9}>
                <Stack spacing={2} sx={{ color: "white" }}>
                  <motion.div variants={childVariants}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 800,
                        color: "transparent",
                        background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                        backgroundSize: "200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientText 3s ease infinite",
                        textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                      }}
                    >
                      {movieInfo?.title || "Đang tải thông tin phim..."}
                    </Typography>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {movieInfo?.genres?.map((genre) => (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          size="small"
                          sx={{
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 500,
                            background: "rgba(229, 9, 20, 0.2)",
                            color: "#fff",
                            "&:hover": {
                              background: "rgba(229, 9, 20, 0.4)",
                              boxShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.8)",
                        textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                      }}
                    >
                      {movieInfo?.description || "Đang tải mô tả..."}
                    </Typography>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccessTimeIcon sx={{ color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          {movieInfo?.duration || "--"} phút
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EventIcon sx={{ color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          {showTime?.startTime ? formatDateTime(showTime.startTime) : "--"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TheatersIcon sx={{ color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          Phòng: {showTime?.room || "--"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocalMoviesIcon sx={{ color: "#e50914" }} />
                        <Typography sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                          Giá vé: {showTime?.price ? `${showTime.price.toLocaleString()}đ` : "--"}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Phần chọn ghế */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 9, 20, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
              },
            }}
          >
            <motion.div variants={childVariants}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{
                  mb: 3,
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 800,
                  color: "transparent",
                  background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientText 3s ease infinite",
                  textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                }}
              >
                🎟️ Chọn Ghế Ngồi
              </Typography>
            </motion.div>

            {/* Màn hình */}
            <motion.div variants={childVariants}>
              <Box
                sx={{
                  width: "100%",
                  height: "60px",
                  background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                  backgroundSize: "200%",
                  animation: "gradientBackground 10s ease infinite",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 4,
                  transform: "perspective(500px) rotateX(-15deg)",
                  boxShadow: "0 10px 20px rgba(229, 9, 20, 0.5)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 15px 30px rgba(229, 9, 20, 0.7)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    color: "#fff",
                    textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                  }}
                >
                  🎬 MÀN HÌNH
                </Typography>
              </Box>
            </motion.div>

            {/* Chú thích */}
            <motion.div variants={childVariants}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 4,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={<WeekendIcon />}
                  label="Ghế trống"
                  variant="outlined"
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    borderColor: "#e50914",
                    color: "#e50914",
                    "& .MuiChip-icon": { color: "#e50914" },
                    "&:hover": {
                      background: "rgba(229, 9, 20, 0.2)",
                      boxShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                    },
                  }}
                />
                <Chip
                  icon={<WeekendIcon />}
                  label="Đã đặt"
                  variant="outlined"
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    borderColor: "grey",
                    color: "grey",
                    "& .MuiChip-icon": { color: "grey" },
                    "&:hover": {
                      background: "rgba(128, 128, 128, 0.2)",
                    },
                  }}
                />
                <Chip
                  icon={<WeekendIcon />}
                  label="Đang chọn"
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    background: "rgba(229, 9, 20, 0.5)",
                    color: "#fff",
                    "& .MuiChip-icon": { color: "#fff" },
                    "&:hover": {
                      background: "rgba(229, 9, 20, 0.7)",
                      boxShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    },
                  }}
                />
              </Box>
            </motion.div>

            <Divider sx={{ mb: 4, borderColor: "rgba(229, 9, 20, 0.3)" }} />

            {/* Sơ đồ ghế */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Object.entries(seats).map(([row, rowSeats]) => (
                <Grid
                  container
                  key={row}
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={1}>
                    <Typography
                      variant="subtitle2"
                      align="center"
                      sx={{
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 500,
                        color: "#fff",
                        textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                      }}
                    >
                      {row}
                    </Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container spacing={1} justifyContent="center">
                      {rowSeats.map((seat) => (
                        <Grid item key={seat.id}>
                          <MotionButton
                            variant={
                              selectedSeats.includes(seat.id)
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.status === "BOOKED"}
                            sx={{
                              minWidth: "45px",
                              height: "45px",
                              p: 0,
                              borderRadius: 2,
                              transition: "all 0.2s",
                              borderColor: seat.status === "BOOKED" ? "grey" : "#e50914",
                              color: seat.status === "BOOKED" ? "grey" : "#e50914",
                              "& .MuiSvgIcon-root": {
                                color: seat.status === "BOOKED" ? "grey" : "#e50914",
                              },
                              "&:hover": {
                                transform:
                                  seat.status !== "BOOKED" ? "scale(1.1)" : "none",
                                boxShadow:
                                  seat.status !== "BOOKED"
                                    ? "0 0 10px rgba(229, 9, 20, 0.5)"
                                    : "none",
                              },
                              ...(seat.status === "BOOKED" && {
                                bgcolor: "rgba(128, 128, 128, 0.2)",
                              }),
                              ...(selectedSeats.includes(seat.id) && {
                                bgcolor: "#e50914",
                                borderColor: "#e50914",
                                "& .MuiSvgIcon-root": { color: "#fff" },
                                "&:hover": {
                                  bgcolor: "#ff6f61",
                                  boxShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                                },
                              }),
                            }}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <WeekendIcon />
                          </MotionButton>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>

            {/* Thông tin đã chọn */}
            <motion.div variants={childVariants}>
              <Box
                sx={{
                  mt: 4,
                  textAlign: "center",
                  p: 3,
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(229, 9, 20, 0.3)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.5)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 800,
                    color: "transparent",
                    background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "gradientText 3s ease infinite",
                    textShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                  }}
                >
                  🎫 Thông tin đặt vé
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    color: "#fff",
                    textShadow: "0 0 5px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  Ghế đã chọn:{" "}
                  <Chip
                    label={
                      selectedSeats.length > 0
                        ? selectedSeats
                            .map((id) => {
                              const seat = Object.values(seats)
                                .flat()
                                .find((s) => s.id === id);
                              return seat?.number;
                            })
                            .join(", ")
                        : "Chưa chọn ghế"
                    }
                    sx={{
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 500,
                      background: "rgba(229, 9, 20, 0.5)",
                      color: "#fff",
                      "&:hover": {
                        background: "rgba(229, 9, 20, 0.7)",
                        boxShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                      },
                    }}
                  />
                </Typography>
                {showTime && (
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 800,
                      color: "#e50914",
                      my: 2,
                      textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                    }}
                  >
                    Tổng tiền: {(selectedSeats.length * showTime.price).toLocaleString()}đ
                  </Typography>
                )}
                <MotionButton
                  variant="contained"
                  disabled={selectedSeats.length === 0}
                  onClick={handleContinue}
                  sx={{
                    mt: 2,
                    px: 6,
                    py: 1.5,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #e50914, #ff6f61, #e50914)",
                    backgroundSize: "200%",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
                    animation: "neonGlow 2s ease-in-out infinite",
                    "&:hover": {
                      backgroundPosition: "100% 50%",
                      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    },
                    "&:disabled": {
                      background: "grey",
                      boxShadow: "none",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Tiếp tục đặt vé
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  onClick={() => navigate(`/movies/${showTime?.movieId}`)}
                  sx={{
                    mt: 2,
                    ml: 2,
                    px: 6,
                    py: 1.5,
                    borderRadius: "25px",
                    textTransform: "none",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    borderColor: "#e50914",
                    color: "#e50914",
                    "&:hover": {
                      background: "rgba(229, 9, 20, 0.2)",
                      borderColor: "#e50914",
                      color: "#e50914",
                      textShadow: "0 0 15px rgba(229, 9, 20, 0.7)",
                    },
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Quay lại
                </MotionButton>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>

      {/* CSS Animations */}
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
          @keyframes neonGlow {
            0% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
            50% { box-shadow: 0 0 30px rgba(229, 9, 20, 0.8); }
            100% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.5); }
          }
        `}
      </style>
    </Box>
  );
};

export default SeatSelection;