import { Box, Divider, Typography } from "@mui/material";
import CheckItem from "./check_item";

export default function Checks({
  casingLengthCheck,
  casingGapCheck,
  waterLevelCheck,
}) {
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
