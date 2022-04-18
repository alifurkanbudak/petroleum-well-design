import { Box, Divider, Typography } from "@mui/material";
import CheckItem from "./check_item";

function Checks({ depth, c1, c2, c3, waterData }) {
  const casingLengthCheck = CasingLengthCheck(depth, c1, c2, c3);
  const casingGapCheck = CasingGapCheck(c1, c2, c3);
  const waterLevelCheck = WaterLevelCheck(c1, c2, c3, waterData, depth);

  return (
    <Box sx={{ width: "33%" }}>
      <Typography variant="h6" align="center">
        Casing Checks
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <CheckItem
        status={casingLengthCheck.status}
        text={casingLengthCheck.text}
        explanation={casingLengthCheck.explanation}
      />
      <Box sx={{ m: 4 }} />
      <CheckItem
        status={casingGapCheck.status}
        text={casingGapCheck.text}
        explanation={casingGapCheck.explanation}
      />
      <Box sx={{ m: 4 }} />
      <CheckItem
        status={waterLevelCheck.status}
        text={waterLevelCheck.text}
        explanation={waterLevelCheck.explanation}
      />
    </Box>
  );
}

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

export { Checks, checkStatus };
