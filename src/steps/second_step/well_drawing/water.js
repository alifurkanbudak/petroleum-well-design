import { Box } from "@mui/material";

export default function Water(props) {
  const top = (props.start / props.depth) * 100 + "%";
  const height = ((props.end - props.start) / props.depth) * 100 + "%";

  return (
    <Box
      sx={{
        display: "block",
        position: "absolute",
        top: top,
        height: height,
        backgroundColor: "#9cd3db",
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    ></Box>
  );
}
