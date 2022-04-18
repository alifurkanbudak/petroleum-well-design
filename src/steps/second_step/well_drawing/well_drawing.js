import { Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import Water from "./water";
import WellWall from "./well_wall";

export default function WellDrawing(props) {
  return (
    <Box
      sx={{
        width: "33%",
      }}
    >
      <Typography variant="h6" align="center">
        Well Visualization
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          position: "relative",
          height: "calc(100% - 24px)",
        }}
      >
        {props.waterData.map((wd) => (
          <Water start={wd[0]} end={wd[1]} depth={props.depth} />
        ))}

        <Box
          sx={{
            width: "300px",
            height: "100%",
            position: "relative",
            margin: "auto",
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

        <Typography
          variant="body2"
          sx={{
            bottom: 1,
            zIndex: 3,
            position: "absolute",
            textAlign: "center",
            width: "100%",
            color: "brown",
          }}
        >
          {props.depth + " meters"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "brown",
            bottom: 0,
            zIndex: 3,
            position: "absolute",
          }}
        />
      </Box>
    </Box>
  );
}
