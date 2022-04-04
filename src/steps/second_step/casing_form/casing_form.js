import { Button, Typography, Box, Divider } from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import SingleCasingForm from "./single_casing_form";

export default function CasingForm(props) {
  return (
    <Box
      sx={{
        ml: 2,
        mr: 2,
        width: "34%",
      }}
    >
      <Typography
        variant="h6"
        align='center'
      >
        Casing Values
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" component="div" sx={{ mb: 1 }}>
        Start and end depth values for each casing
      </Typography>
      <SingleCasingForm ind={1} val={props.c1} setVal={props.setC1} />
      <SingleCasingForm ind={2} val={props.c2} setVal={props.setC2} />
      <SingleCasingForm ind={3} val={props.c3} setVal={props.setC3} />
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
