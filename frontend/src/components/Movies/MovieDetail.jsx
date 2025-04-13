import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Divider,
  Box,
  Stack,
  Button,
} from "@mui/material";
import ShowTimesList from "../ShowTimes/ShowTimesList";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setMovie(data.data);
        } else {
          setMovie(data);
        }
      })
      .catch((err) => console.error("❌ Error fetching movie:", err));
  }, [id]);

  if (!movie || !movie.title) {
    return (
      <Typography
        variant="h6"
        sx={{ mt: 4, textAlign: "center", color: "#ff4c4c" }}
      >
        ⏳ Đang tải thông tin phim...
      </Typography>
    );
  }

  return (
    <Box sx={{ background: "linear-gradient(135deg, #2c3e50 0%, #4a6a8a 100%)" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Poster phim */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 8px 16px rgba(0,0,0,0.6)",
                bgcolor: "#2a2a2a",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={"./../../images/movies/Avengers.jpg"}
                alt={movie.title}
                sx={{ borderRadius: 1 }}
              />
            </Card>
          </Grid>

          {/* Thông tin phim */}
          <Grid item xs={12} md={9}>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#ff4c4c", mb: 1 }}
              >
                {movie.title}
              </Typography>

              <Box sx={{ lineHeight: 1.8 }}>
                <Typography variant="body2" sx={{ mb: 2, color: "#C0C0C0" }}>
                  {movie.description}
                </Typography>

                <Typography variant="body" sx={{ mb: 1, color: "#C0C0C0" }}>
                  ⏱ Thời lượng: {movie.duration} phút
                </Typography>

                <Typography variant="body2" sx={{ mb: 1, color: "#C0C0C0" }}>
                  🎟️ Số suất chiếu:{movie.showTimes?.length || 0}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "#ff4c4c",
                    "&:hover": { bgcolor: "#e04343" },
                  }}
                >
                  Xem Trailer
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Lịch chiếu */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#ff4c4c" }}
          >
            📅 Lịch chiếu
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "#333", color: "black" }} />

          <ShowTimesList movieId={id} />
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetail;
