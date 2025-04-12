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

      // Sắp xếp ghế theo hàng và số
      const sortedSeats = data.data.sort((a, b) => {
        const aRow = a.number.charAt(0);
        const bRow = b.number.charAt(0);
        return aRow === bRow
          ? parseInt(a.number.slice(1)) - parseInt(b.number.slice(1))
          : aRow.localeCompare(bRow);
      });

      // Nhóm ghế theo hàng
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h6">⌛ Đang tải thông tin...</Typography>
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
        }}
      >
        <Typography variant="h6" color="error">
          ❌ {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Thông tin phim */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(to right, #1a237e, #0d47a1)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2, height: "100%" }}>
              <CardMedia
                component="img"
                height="300"
                image={movieInfo?.imageUrl || "/images/default-movie.jpg"}
                alt={movieInfo?.title}
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Stack spacing={2} sx={{ color: "white" }}>
              <Typography variant="h4" fontWeight="bold">
                {movieInfo?.title || "Đang tải thông tin phim..."}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {movieInfo?.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  />
                ))}
              </Box>
              <Typography variant="body1">
                {movieInfo?.description || "Đang tải mô tả..."}
              </Typography>
              <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon />
                  <Typography>{movieInfo?.duration || "--"} phút</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EventIcon />
                  <Typography>
                    {showTime?.startTime
                      ? formatDateTime(showTime.startTime)
                      : "--"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TheatersIcon />
                  <Typography>Phòng: {showTime?.room || "--"}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalMoviesIcon />
                  <Typography>
                    Giá vé:{" "}
                    {showTime?.price
                      ? `${showTime.price.toLocaleString()}đ`
                      : "--"}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Phần chọn ghế */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "white",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#1a237e",
          }}
        >
          🎟️ Chọn Ghế Ngồi
        </Typography>

        {/* Màn hình */}
        <Box
          sx={{
            width: "100%",
            height: "60px",
            background: "linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            transform: "perspective(500px) rotateX(-15deg)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            🎬 MÀN HÌNH
          </Typography>
        </Box>

        {/* Chú thích */}
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
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<WeekendIcon />}
            label="Đã đặt"
            color="error"
            variant="outlined"
          />
          <Chip
            icon={<WeekendIcon />}
            label="Đang chọn"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "& .MuiChip-icon": {
                color: "white",
              },
              borderColor: "#1976d2",
            }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

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
                <Typography variant="subtitle2" align="center">
                  {row}
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1} justifyContent="center">
                  {rowSeats.map((seat) => (
                    <Grid item key={seat.id}>
                      <Button
                        variant={
                          selectedSeats.includes(seat.id)
                            ? "contained"
                            : "outlined"
                        }
                        color={seat.status === "BOOKED" ? "error" : "primary"}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === "BOOKED"}
                        sx={{
                          minWidth: "45px",
                          height: "45px",
                          p: 0,
                          borderRadius: 2,
                          transition: "all 0.2s",
                          "&:hover": {
                            transform:
                              seat.status !== "BOOKED" ? "scale(1.1)" : "none",
                            backgroundColor: selectedSeats.includes(seat.id)
                              ? "#1976d2"
                              : "",
                          },
                          ...(seat.status === "BOOKED" && {
                            bgcolor: "error.light",
                            borderColor: "error.main",
                            "& .MuiSvgIcon-root": {
                              color: "error.main",
                            },
                          }),
                          ...(selectedSeats.includes(seat.id) && {
                            bgcolor: "#1976d2",
                            borderColor: "#1976d2",
                            "& .MuiSvgIcon-root": {
                              color: "white",
                            },
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }),
                        }}
                      >
                        <WeekendIcon />
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Box>

        {/* Thông tin đã chọn */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            p: 3,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom color="primary">
            🎫 Thông tin đặt vé
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
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
              color="primary"
              variant="outlined"
            />
          </Typography>
          {showTime && (
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                my: 2,
              }}
            >
              Tổng tiền:{" "}
              {(selectedSeats.length * showTime.price).toLocaleString()}đ
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
            sx={{
              mt: 2,
              px: 6,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              background:
                "linear-gradient(45deg,rgb(113, 205, 248) 30%, rgb(113, 205, 248) 90%)",
              "&:hover": {
                background:
                  "linear-gradient(45deg, rgb(113, 205, 248) 30%, rgb(113, 205, 248) 90%)",
              },
            }}
          >
            Tiếp tục đặt vé
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => navigate(`/movies/${showTime?.movieId}`)}
            sx={{ mt: 2, px: 6, py: 1.5 }}
          >
            Quay lại
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SeatSelection;