import {
  ArrowForwardIosRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { clamp } from "../../../functions";
import { focusState } from "../first_step";

export default function InputForm({
  depth,
  x,
  y,
  setDepth,
  setFocus,
  setX,
  setY,
  nextStep,
}) {
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    text: "",
  });
  const canProceed = x <= 1000 && x >= 0 && y <= 1000 && y >= 0 && depth > 0;

  const handleClick = () => {
    if (!canProceed) {
      var errorSnackText = undefined;
      if (!canProceed) {
        if (depth === undefined || depth <= 0) {
          errorSnackText = "Depth must be greater than 0";
        } else if (x === undefined || x > 1000 || x < 0) {
          errorSnackText = "X must be between 0 and 1000";
        } else if (y === undefined || y > 1000 || y < 0) {
          errorSnackText = "Y must be between 0 and 1000";
        }
      }

      setSnackbarState({ isOpen: true, text: errorSnackText });
    } else {
      nextStep();
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "34%",
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
        onChange={(e) => setDepth(clamp(parseInt(e.target.value), 0, 99999))}
        InputProps={{
          endAdornment: <InputAdornment position="start">m</InputAdornment>,
        }}
        sx={{ width: "256px" }}
        onFocus={(e) => setFocus(focusState.depth)}
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
          onFocus={(e) => setFocus(focusState.coordinates)}
        />
        <TextField
          label="Y"
          variant="filled"
          type="number"
          inputProps={{ max: 1000, min: 0 }}
          value={y || ""}
          onChange={(e) => setY(clamp(parseInt(e.target.value), 0, 1000))}
          onFocus={(e) => setFocus(focusState.coordinates)}
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
        onClick={handleClick}
      >
        Get Suggestions
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarState.isOpen}
        onClose={() => setSnackbarState({ isOpen: false, text: "" })}
        key="s"
      >
        <Paper
          elevation={5}
          sx={{
            backgroundColor: "red",
            color: "white",
            p: 1.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ErrorOutlineRounded sx={{ mr: 1 }} />
          <Typography variant="body1" fontWeight={600}>
            {snackbarState.text}
          </Typography>
        </Paper>
      </Snackbar>
    </Box>
  );
}
