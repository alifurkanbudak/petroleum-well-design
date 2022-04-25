import { Button, Typography, Box, Divider } from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import SingleCasingForm from "./single_casing_form";

export default function CasingForm({
  c1,
  c2,
  c3,
  setC1,
  setC2,
  setC3,
  depth,
  canProceed,
  nextStep
}) {
  return (
    <Box
      sx={{
        ml: 2,
        mr: 2,
        width: "34%",
      }}
    >
      <Typography variant="h6" align="center">
        Casing Values
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" component="div" sx={{ mb: 2 }}>
        Start and end depth values for each casing. Initial values are suggested
        by our algorithm as a starting point.
      </Typography>
      <SingleCasingForm ind={1} val={c1} setVal={setC1} depth={depth} />
      <SingleCasingForm ind={2} val={c2} setVal={setC2} depth={depth} />
      <SingleCasingForm ind={3} val={c3} setVal={setC3} depth={depth} />
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
        disabled={!canProceed}
        onClick={()=>nextStep()}
      >
        Run Simulation
      </Button>
    </Box>
  );
}
