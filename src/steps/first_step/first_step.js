import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { clamp } from "../../functions";

function FirstStep({ inputState, nextStep }) {
  var { depth, x, y, setDepth, setX, setY } = inputState;
  const canProceed = x <= 1000 && x >= 0 && y <= 1000 && y >= 0 && depth > 0;

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="body1" component="div" sx={{ mb: 1 }}>
        Enter the total depth of the well in meters.
      </Typography>
      <TextField
        label="Depth"
        variant="filled"
        type="number"
        inputProps={{
          min: 0,
          max: 99999,
        }}
        value={depth || ""}
        onChange={(e) => setDepth(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="start">m</InputAdornment>,
        }}
        sx={{ width: "256px" }}
      />
      <Typography variant="body1" component="div" sx={{ mt: 6 }}>
        Enter the coordinates.
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Each coordinate must be in between 0 and 1000
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="X"
          variant="filled"
          type="number"
          sx={{ mr: 2, width: "120px" }}
          inputProps={{ max: 1000, min: 0 }}
          value={x || ""}
          onChange={(e) => setX(clamp(parseInt(e.target.value), 0, 1000))}
        />
        <TextField
          label="Y"
          variant="filled"
          type="number"
          inputProps={{ max: 1000, min: 0 }}
          value={y || ""}
          onChange={(e) => setY(clamp(parseInt(e.target.value), 0, 1000))}
          sx={{ width: "120px" }}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForwardIosRounded />}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "32px",
          margin: "auto",
          width: "256px",
        }}
        onClick={() => nextStep()}
        disabled={!canProceed}
      >
        Get Suggestions
      </Button>
    </Box>
  );
}

export default FirstStep;
