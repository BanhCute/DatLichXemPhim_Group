import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Fade,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TheatersIcon from "@mui/icons-material/Theaters"; // Icon cho thể loại

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data.data || []);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)",
        pt: { xs: 2, md: 4 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Fade in timeout={1000}>
          <Box>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                p: 3,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 65, 108, 0.2)",
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#FF416C",
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 2, md: 0 },
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                <LocalMoviesIcon
                  sx={{
                    fontSize: { xs: 28, md: 36 },
                    mr: 2,
                    color: "#FF416C",
                  }}
                />
                Phim Đang Chiếu
              </Typography>

              <TextField
                placeholder="Tìm kiếm phim..."
                variant="outlined"
                size="medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: { xs: "100%", md: "300px" },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    color: "white",
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
                  "& .MuiInputAdornment-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Movies Grid - 3 phim trên 1 dòng */}
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {loading ? (
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    p: 3,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  ⏳ Đang tải dữ liệu...
                </Typography>
              ) : error ? (
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FF416C",
                    p: 3,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  ❌ {error}
                </Typography>
              ) : filteredMovies.length === 0 ? (
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.5)",
                    mt: 4,
                    width: "100%",
                  }}
                >
                  😢 Không tìm thấy phim phù hợp
                </Typography>
              ) : (
                filteredMovies.map((movie, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={movie.id}>
                    <Fade in timeout={500 + index * 100}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "16px",
                          overflow: "hidden",
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 65, 108, 0.2)",
                          transition: "all 0.4s ease",
                          "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: "0 15px 30px rgba(255, 65, 108, 0.3)",
                          },
                        }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            height="300"
                            image={
                              movie.imageUrl ||
                              "/images/movies/default-movie.jpg"
                            }
                            alt={movie.title}
                            sx={{
                              objectFit: "cover",
                              aspectRatio: "16/9",
                            }}
                          />

                          <IconButton
                            onClick={() => toggleFavorite(movie.id)}
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              bgcolor: "rgba(0,0,0,0.6)",
                              backdropFilter: "blur(5px)",
                              "&:hover": {
                                bgcolor: "rgba(0,0,0,0.8)",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            <FavoriteIcon
                              sx={{
                                color: favorites.includes(movie.id)
                                  ? "#FF416C"
                                  : "rgba(255,255,255,0.7)",
                                transition: "color 0.3s ease",
                              }}
                            />
                          </IconButton>
                        </Box>

                        <CardContent
                          sx={{
                            flexGrow: 1,
                            p: { xs: 2, md: 3 },
                            color: "white",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              mb: 1,
                              fontSize: { xs: "1rem", md: "1.2rem" },
                            }}
                          >
                            {movie.title}
                          </Typography>

                          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                            <Chip
                              icon={
                                <AccessTimeIcon sx={{ color: "#FF416C" }} />
                              }
                              label={`${movie.duration} phút`}
                              sx={{
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                borderRadius: "8px",
                                fontSize: "0.8rem",
                              }}
                            />
                          </Box>

                          {/* Thêm phần thể loại */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              flexWrap: "wrap",
                              mb: 2,
                            }}
                          >
                            {movie.genres && movie.genres.length > 0 ? (
                              movie.genres.map((genre) => (
                                <Chip
                                  key={genre.id}
                                  icon={
                                    <TheatersIcon
                                      sx={{
                                        color: "#FF416C",
                                        fontSize: "1rem",
                                      }}
                                    />
                                  }
                                  label={genre.name}
                                  sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontSize: "0.8rem",
                                    "&:hover": {
                                      bgcolor: "rgba(255, 65, 108, 0.2)",
                                    },
                                  }}
                                />
                              ))
                            ) : (
                              <Chip
                                icon={
                                  <TheatersIcon
                                    sx={{ color: "#FF416C", fontSize: "1rem" }}
                                  />
                                }
                                label="Không xác định"
                                sx={{
                                  bgcolor: "rgba(255, 255, 255, 0.1)",
                                  color: "white",
                                  borderRadius: "8px",
                                  fontSize: "0.8rem",
                                }}
                              />
                            )}
                          </Box>

                          <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to={`/movies/${movie.id}`}
                            sx={{
                              mt: "auto",
                              py: 1,
                              px: 3,
                              borderRadius: "12px",
                              background: "#FF416C",
                              textTransform: "none",
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              fontWeight: "bold",
                              transition: "all 0.3s ease",
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
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default MoviesList;
