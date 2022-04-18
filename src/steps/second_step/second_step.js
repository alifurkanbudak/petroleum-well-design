import { React, useEffect, useState } from "react";
import { Box } from "@mui/material";
import WellDrawing from "./well_drawing/well_drawing";
import Checks from "./checks/checks";
import CasingForm from "./casing_form/casing_form";
import { kNN } from "../../functions";

function SecondStep({ csvData, waterData, inputState }) {
  const [c1, setC1] = useState({ start: 0, end: 0 });
  const [c2, setC2] = useState({ start: 0, end: 0 });
  const [c3, setC3] = useState({ start: 0, end: 0 });

  const { depth, x, y } = inputState;

  const processedWaterData = waterData
    .filter((wd) => wd[0] <= depth)
    .map((wd) => [wd[0], Math.min(depth, wd[1])]);

  const casingLengthCheck = CasingLengthCheck(depth, c1, c2, c3);
  const casingGapCheck = CasingGapCheck(c1, c2, c3);
  const waterLevelCheck = WaterLevelCheck(
    c1,
    c2,
    c3,
    processedWaterData,
    depth
  );

  useEffect(() => {
    if (csvData.length !== 0) {
      let casings = kNN(csvData, depth, x, y);

      setC1(casingStrToObj(casings[0]));
      setC2(casingStrToObj(casings[1]));
      setC3(casingStrToObj(casings[2]));
    }
  }, [csvData, depth, x, y]);

  const canProceed =
    casingLengthCheck.status !== checkStatus.failed &&
    casingGapCheck.status !== checkStatus.failed &&
    waterLevelCheck.status !== checkStatus.failed;

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
        canProceed={canProceed}
      />
      <Checks
        casingLengthCheck={casingLengthCheck}
        casingGapCheck={casingGapCheck}
        waterLevelCheck={waterLevelCheck}
      />
    </Box>
  );
}

function casingStrToObj(C) {
  let c = C.split("-");
  return { start: parseInt(c[0]), end: parseInt(c[1]) };
}

// Casing Check Functions
function CasingLengthCheck(depth, c1, c2, c3) {
  const casingLength =
    c1.end - c1.start + c2.end - c2.start + c3.end - c3.start;
  const explanation = `Your plan uses ${casingLength}m casing for a depth of ${depth}m`;
  const text = "Total length of casings should be optimized";
  var status = undefined;

  const ratio = casingLength / depth;

  if (ratio < 1.25) {
    status = checkStatus.success;
  } else if (ratio < 1.75) {
    status = checkStatus.warning;
  } else {
    status = checkStatus.failed;
  }

  return { status, explanation, text };
}

function CasingGapCheck(c1, c2, c3) {
  const text = "There shouldn't be vertical gaps between casings";

  const c1c2Gap = c1.end < c2.start;
  const c2c3Gap = c2.end < c3.start;

  const status = c1c2Gap || c2c3Gap ? checkStatus.failed : checkStatus.success;

  var explanation = undefined;
  if (c1c2Gap) {
    explanation = "There is a gap between Casing 1 and Casing 2";
  } else if (c2c3Gap) {
    explanation = "There is a gap between Casing 2 and Casing 3";
  }

  return { status, explanation, text };
}

function WaterLevelCheck(c1, c2, c3, waterData, depth) {
  const text = "Well casings should cover the areas where there is water";
  var explanation = undefined;

  var status = checkStatus.success;

  if (c1.end < c2.start && IsWater(c1.end, c2.end, waterData)) {
    status = checkStatus.failed;
    explanation = "Water can enter from the gap between Casing 1 and Casing 2";
  } else if (c2.end < c3.start && IsWater(c2.end, c3.end, waterData)) {
    status = checkStatus.failed;
    explanation = "Water can enter from the gap between Casing 2 and Casing 3";
  } else if (IsWater(c3.end, depth, waterData)) {
    status = checkStatus.failed;
    explanation =
      "Water can enter from the gap between Casing 3 and the bottom of the well";
  }

  return { status, explanation, text };
}

function IsWater(start, end, waterData) {
  for (let i = 0; i < waterData.length; i++) {
    const wd = waterData[i];

    if (wd[0] < end && wd[1] > start) return true;
  }

  return false;
}

const checkStatus = {
  failed: 0,
  warning: 1,
  success: 2,
};

export { SecondStep, checkStatus };
