import { Box, Divider, Typography } from "@mui/material";

export default function Checks(props) {
  return (
    <Box sx={{ width: "33%" }}>
      <Typography
        variant="h6"
        align='center'
      >
        Casing Checks
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}
