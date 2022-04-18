import { Box, Paper, Typography } from "@mui/material";

export default function InfoBox({ title, text }) {
  return (
    <Paper elevation={5} sx={{ m: 1, borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ width: "100%", height: "6px", backgroundColor: "#1976d2" }} />
      <Box sx={{ p: 1.5 }}>
        {" "}
        <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography>{text}</Typography>
      </Box>
    </Paper>
  );
}
