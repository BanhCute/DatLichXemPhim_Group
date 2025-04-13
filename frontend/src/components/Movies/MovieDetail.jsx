import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Divider,
  Paper,
  Box,
  Stack,
  CircularProgress,
  Chip,
  Rating,
  Button,
  TextField,
  Avatar,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ShowTimesList from "../ShowTimes/ShowTimesList";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TheatersIcon from "@mui/icons-material/Theaters";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải thông tin phim");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const movieReviews = data.data.filter(
        (review) => review.movieId === parseInt(id)
      );
      setReviews(movieReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để đánh giá");
      }

      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: parseInt(id),
          rating: userReview.rating,
          comment: userReview.comment || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể gửi đánh giá");
      }

      setUserReview({ rating: 0, comment: "" });
      fetchReviews();

      alert("Đánh giá thành công!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        }}
      >
        <CircularProgress sx={{ color: "#FF416C" }} size={40} />
        <Typography variant="h6" sx={{ ml: 2, color: "white" }}>
          ⏳ Đang tải thông tin phim...
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
          background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        }}
      >
        <Typography variant="h6" sx={{ color: "#FF416C" }}>
          ❌ {error}
        </Typography>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          😢 Không tìm thấy thông tin phim
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        pt: { xs: 2, md: 4 },
        pb: 8,
      }}
    >
      {/* hien nut quay lai movie lsit */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
      >
        Quay lại danh sách phim
      </Button>

      <Container maxWidth="xl">
        <Fade in timeout={1000}>
          <Box>
            {/* Movie Detail Section */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 65, 108, 0.2)",
              }}
            >
              <Grid container spacing={{ xs: 2, md: 4 }}>
                {/* Poster */}
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      bgcolor: "transparent",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 12px 40px rgba(255, 65, 108, 0.3)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? "300" : "400"} // Giảm chiều cao trên mobile
                      image={
                        movie.imageUrl ||
                        "https://via.placeholder.com/400x600?text=No+Image"
                      }
                      alt={movie.title}
                      sx={{
                        objectFit: "cover",
                        aspectRatio: "16/9", // Tỷ lệ giống trong hình
                      }}
                    />
                  </Card>
                </Grid>

                {/* Movie Info */}
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                          color: "#FF416C", // Đổi màu tiêu đề thành đỏ/hồng
                          fontWeight: 800,
                          mb: 2,
                          fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                      >
                        {movie.title}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={`${movie.duration} phút`}
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            color: "white",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                          }}
                        />
                        <Chip
                          icon={<TheatersIcon />}
                          label="Đang chiếu"
                          sx={{
                            bgcolor: "rgba(255, 65, 108, 0.2)",
                            color: "#FF416C",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                          }}
                        />
                        <Chip
                          label={movie.rating ? `⭐ ${movie.rating}` : "N/A"}
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                            color: "white",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mb: 2,
                        }}
                      >
                        {movie.genres?.map((genre) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.1)",
                              color: "white",
                              borderRadius: "12px",
                              fontSize: "0.9rem",
                              "&:hover": {
                                bgcolor: "rgba(255, 65, 108, 0.2)",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#FF416C",
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        📌 Thông tin phim
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          lineHeight: 1.8,
                          fontSize: { xs: "0.9rem", md: "1.1rem" },
                        }}
                      >
                        {movie.description}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        py: 1.5,
                        px: 4,
                        borderRadius: "12px",
                        background: "#FF416C", // Màu đỏ/hồng giống trong hình
                        textTransform: "none",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: "bold",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #FF4B2B, #FF416C)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 5px 15px rgba(255, 65, 108, 0.6)",
                        },
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Showtimes Section */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: "#FF416C",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                <TheatersIcon sx={{ color: "#FF416C" }} />
                Lịch chiếu phim
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.9rem", md: "1.1rem" },
                  mb: 2,
                }}
              >
                Chọn ngày và thời gian để xem lịch chiếu phim
              </Typography>

              <Divider sx={{ mb: 3, borderColor: "rgba(255, 65, 108, 0.2)" }} />
              <ShowTimesList movieId={id} requireAuth={true} />
            </Box>

            {/* Reviews Section */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: "#FF416C",
                  mb: 2,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                ⭐ Đánh giá phim
              </Typography>
              <Divider sx={{ mb: 3, borderColor: "rgba(255, 65, 108, 0.2)" }} />

              {/* Review Form */}
              <Paper
                sx={{
                  p: { xs: 2, md: 4 },
                  mb: 4,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 65, 108, 0.2)",
                }}
              >
                <form onSubmit={handleSubmitReview}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      component="legend"
                      sx={{ color: "white", mb: 1 }}
                    >
                      Đánh giá của bạn
                    </Typography>
                    <Rating
                      name="rating"
                      value={userReview.rating}
                      onChange={(event, newValue) => {
                        setUserReview({ ...userReview, rating: newValue });
                      }}
                      precision={1}
                      size="large"
                      sx={{
                        color: "#FF416C",
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Nhập nhận xét của bạn..."
                    value={userReview.comment}
                    onChange={(e) =>
                      setUserReview({ ...userReview, comment: e.target.value })
                    }
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        "& fieldset": {
                          borderColor: "rgba(255, 65, 108, 0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 65, 108, 0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#FF416C",
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || userReview.rating === 0}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: "12px",
                      background: "#FF416C",
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: "bold",
                      "&:hover": {
                        background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 5px 15px rgba(255, 65, 108, 0.6)",
                      },
                      "&:disabled": {
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    Gửi đánh giá
                  </Button>
                </form>
              </Paper>

              {/* Reviews List */}
              <Box>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Fade in timeout={500} key={review.id}>
                      <Paper
                        sx={{
                          p: 3,
                          mb: 2,
                          borderRadius: "16px",
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 65, 108, 0.2)",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: "#FF416C",
                              width: 48,
                              height: 48,
                            }}
                          >
                            {review.user?.name?.[0] || "U"}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              {review.user?.name || "Người dùng ẩn danh"}
                            </Typography>
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                              sx={{
                                color: "#FF416C",
                                "& .MuiRating-iconEmpty": {
                                  color: "rgba(255, 255, 255, 0.3)",
                                },
                              }}
                            />
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                          >
                            {new Date(review.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                        >
                          {review.comment}
                        </Typography>
                      </Paper>
                    </Fade>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      textAlign: "center",
                      py: 4,
                    }}
                  >
                    Chưa có đánh giá nào cho phim này
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default MovieDetail;
