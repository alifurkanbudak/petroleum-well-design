import {
  CheckRounded,
  ErrorOutlineRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { checkStatus } from "../second_step";

export default function CheckItem({ status, text, explanation }) {
  return (
    <Box sx={{ display: "flex", verticalAlign: "middle" }}>
      <StatusIcon status={status} sx={{ marging: "auto" }} />
      <Box>
        <Typography fontWeight={500} lineHeight>
          {text}
        </Typography>{" "}
        {explanation && <Typography variant="body2">{explanation}</Typography>}
      </Box>
    </Box>
  );
}

function StatusIcon({ status }) {
  var icon = undefined;

  if (status === checkStatus.failed) {
    icon = <ErrorOutlineRounded color="error" />;
  } else if (status === checkStatus.warning) {
    icon = <WarningAmberRounded color="warning" />;
  } else if (status === checkStatus.success) {
    icon = <CheckRounded color="success" />;
  }

  return <Box sx={{ mr: 1 }}>{icon}</Box>;
}
