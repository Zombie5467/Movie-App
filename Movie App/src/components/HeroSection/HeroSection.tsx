import { Box, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      style={{
        height: "400px",
        backgroundImage:
          'url("https://blog.orange.es/wp-content/uploads/sites/4/2024/12/SST-ES-November-Wallpaper-1920x1080-1-960x480.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        color="white"
        sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.0)" }}
      >
        Featured Movie/Series
      </Typography>
    </Box>
  );
};

export default HeroSection;
