import { TextField, Typography, Box } from "@mui/material";
import { clamp } from "../../../functions";

export default function SingleCasingForm({ ind, val, setVal, depth }) {
  return (
    <Box
      sx={{
        width: "256px",
        margin: "auto",
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "left", mb: 1 }}>
        Casing {ind}
      </Typography>
      <TextField
        disabled={ind === 1}
        label="Start"
        variant="filled"
        type="number"
        sx={{ mr: 2, width: "120px" }}
        inputProps={{
          min: 0,
          max: 99999,
        }}
        value={val.start}
        onChange={(e) =>
          setVal({
            start: clamp(parseInt(e.target.value), 0, depth),
            end: val.end,
          })
        }
      />
      <TextField
        label="End"
        variant="filled"
        type="number"
        inputProps={{
          min: 0,
          max: 99999,
        }}
        sx={{ width: "120px" }}
        value={val.end}
        onChange={(e) =>
          setVal({
            end: clamp(parseInt(e.target.value), 0, depth),
            start: val.start,
          })
        }
      />
    </Box>
  );
}
