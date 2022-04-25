import { Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import Water from "./water";
import WellWall from "./well_wall";

export default function WellDrawing({ c1, c2, c3, depth, waterData }) {
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
        {waterData.map((wd,i) => (
          <Water key={i} start={wd[0]} end={wd[1]} depth={depth} />
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
            start={c1.start}
            end={c1.end}
            depth={depth}
            index={0}
            left
          />
          <WellWall
            start={c2.start}
            end={c2.end}
            depth={depth}
            index={1}
            left
          />
          <WellWall
            start={c3.start}
            end={c3.end}
            depth={depth}
            index={2}
            left
          />
          <WellWall
            start={c3.start}
            end={c3.end}
            depth={depth}
            index={2}
            right
          />
          <WellWall
            start={c2.start}
            end={c2.end}
            depth={depth}
            index={1}
            right
          />
          <WellWall
            start={c1.start}
            end={c1.end}
            depth={depth}
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
          {depth + " meters"}
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
