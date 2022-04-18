import { Box } from "@mui/material";
import { focusState } from "../first_step";
import InfoBox from "./info_box";

export default function InfoBoxes({ focus }) {
  var infoBox = undefined;

  if (focus === focusState.depth) {
    infoBox = (
      <InfoBox
        title="How the depth is used?"
        text="We are using depth for suggestions by selecting other oil wells with similar depths."
      />
    );
  } else if (focus === focusState.coordinates) {
    infoBox = (
      <InfoBox
        title="How the coordinates are used?"
        text="We are using coordinates for suggestions by selecting oil wells near the entered point."
      />
    );
  }

  return (
    <Box
      sx={{
        width: "33%",
      }}
    >
      {infoBox}
    </Box>
  );
}
