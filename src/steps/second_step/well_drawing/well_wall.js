import { Box } from "@mui/material";

export default function WellWall(props) {
  const top = (props.start / props.depth) * 100 + "%";
  const height = ((props.end - props.start) / props.depth) * 100 + "%";

  return (
    <Box
      sx={{
        display: "block",
        position: "absolute",
        width: "20px",
        top: top,
        height: height,
        backgroundColor: "gray",
        border: "solid",
        borderWidth: "1px",
        left: props.left ? 21 * props.index + "px" : null,
        right: props.right ? 21 * props.index + "px" : null,
      }}
    ></Box>
  );
}
