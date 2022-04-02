import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import CasingForm from "./casing_form";

export default function SecondStep(props) {
  const [c1, setC1] = React.useState({ start: 0, end: 0 });
  const [c2, setC2] = React.useState({ start: 0, end: 0 });
  const [c3, setC3] = React.useState({ start: 0, end: 0 });

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="body1" component="div" sx={{ mb: 1 }}>
        Start and end depth values for each casing
      </Typography>
      <CasingForm ind={1} val={c1} setVal={setC1} />
      <CasingForm ind={2} val={c2} setVal={setC2} />
      <CasingForm ind={3} val={c3} setVal={setC3} />
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIosRounded />}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "32px",
          margin: "auto",
          width: "256px",
        }}
      >
        Run Simulation
      </Button>
    </Box>
  );
}
