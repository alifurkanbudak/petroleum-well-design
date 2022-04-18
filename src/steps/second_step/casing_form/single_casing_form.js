import { TextField, Typography, Box } from "@mui/material";

export default function SingleCasingForm(props) {
  return (
    <Box
      sx={{
        width: "256px",
        margin: "auto",
        mb: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "left", mb: 1 }}>
        Casing {props.ind}
      </Typography>
      <TextField
        disabled={props.ind === 1}
        label="Start"
        variant="filled"
        type="number"
        sx={{ mr: 2, width: "120px" }}
        inputProps={{
          min: 0,
          max: 99999,
        }}
        value={props.val.start}
        onChange={(e) =>
          props.setVal({
            start: parseInt(e.target.value),
            end: props.val.end,
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
        value={props.val.end}
        onChange={(e) =>
          props.setVal({
            end: parseInt(e.target.value),
            start: props.val.start,
          })
        }
      />
    </Box>
  );
}
