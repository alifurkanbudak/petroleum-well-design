import React from "react";
import { Box } from "@mui/material";
import WellDrawing from "./well_drawing/well_drawing";
import Checks from "./checks/checks";
import CasingForm from "./casing_form/casing_form";

export default function SecondStep() {
  const [c1, setC1] = React.useState({ start: 0, end: 0 });
  const [c2, setC2] = React.useState({ start: 0, end: 0 });
  const [c3, setC3] = React.useState({ start: 0, end: 0 });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <WellDrawing depth={10000} c1={c1} c2={c2} c3={c3} />
      <CasingForm
        c1={c1}
        c2={c2}
        c3={c3}
        setC1={setC1}
        setC2={setC2}
        setC3={setC3}
      />
      <Checks />
    </Box>
  );
}
