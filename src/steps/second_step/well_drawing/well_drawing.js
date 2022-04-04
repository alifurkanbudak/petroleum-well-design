import { Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import WellWall from "./well_wall";

export default function WellDrawing(props) {
  return (
    <Box
      sx={{
        width: "33%",
      }}
    >
      <Typography
        variant="h6"
        align='center'
      >
        Well Visualization
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          width: "300px",
          position: "relative",
          margin: "auto",
          height: "100%",
        }}
      >
        <WellWall
          start={props.c1.start}
          end={props.c1.end}
          depth={props.depth}
          index={0}
          left
        />
        <WellWall
          start={props.c2.start}
          end={props.c2.end}
          depth={props.depth}
          index={1}
          left
        />
        <WellWall
          start={props.c3.start}
          end={props.c3.end}
          depth={props.depth}
          index={2}
          left
        />
        <WellWall
          start={props.c3.start}
          end={props.c3.end}
          depth={props.depth}
          index={2}
          right
        />
        <WellWall
          start={props.c2.start}
          end={props.c2.end}
          depth={props.depth}
          index={1}
          right
        />
        <WellWall
          start={props.c1.start}
          end={props.c1.end}
          depth={props.depth}
          index={0}
          right
        />
      </Box>
    </Box>
  );
}
