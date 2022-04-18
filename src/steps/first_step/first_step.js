import { Box } from "@mui/material";
import React, { useState } from "react";
import InfoBoxes from "./info_boxes/info_boxes";
import InputForm from "./input_form/input_form";

function FirstStep({ inputState, nextStep }) {
  const [focus, setFocus] = useState(-1);

  var { depth, x, y, setDepth, setX, setY } = inputState;

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: "33%" }} />
      <InputForm
        depth={depth}
        x={x}
        y={y}
        setDepth={setDepth}
        setX={setX}
        setY={setY}
        nextStep={nextStep}
        setFocus={setFocus}
      />
      <InfoBoxes focus={focus} />
    </Box>
  );
}

const focusState = {
  depth: 0,
  coordinates: 1,
};

export { FirstStep, focusState };
