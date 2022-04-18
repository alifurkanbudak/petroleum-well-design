import { React, useEffect, useState } from "react";
import { Box } from "@mui/material";
import WellDrawing from "./well_drawing/well_drawing";
import { Checks } from "./checks/checks";
import CasingForm from "./casing_form/casing_form";
import { kNN } from "../../functions";

export default function SecondStep({ csvData, waterData, inputState }) {
  const [c1, setC1] = useState({ start: 0, end: 0 });
  const [c2, setC2] = useState({ start: 0, end: 0 });
  const [c3, setC3] = useState({ start: 0, end: 0 });

  const { depth, x, y } = inputState;

  const processedWaterData = waterData
    .filter((wd) => wd[0] <= depth)
    .map((wd) => [wd[0], Math.min(depth, wd[1])]);

  useEffect(() => {
    if (csvData.length !== 0) {
      let casings = kNN(csvData, depth, x, y);

      setC1(casingStrToObj(casings[0]));
      setC2(casingStrToObj(casings[1]));
      setC3(casingStrToObj(casings[2]));
    }
  }, [csvData, depth, x, y]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <WellDrawing
        depth={depth}
        c1={c1}
        c2={c2}
        c3={c3}
        waterData={processedWaterData}
      />
      <CasingForm
        c1={c1}
        c2={c2}
        c3={c3}
        setC1={setC1}
        setC2={setC2}
        setC3={setC3}
        depth={depth}
      />
      <Checks
        depth={depth}
        c1={c1}
        c2={c2}
        c3={c3}
        waterData={processedWaterData}
      />
    </Box>
  );
}

function casingStrToObj(C) {
  let c = C.split("-");
  return { start: parseInt(c[0]), end: parseInt(c[1]) };
}
