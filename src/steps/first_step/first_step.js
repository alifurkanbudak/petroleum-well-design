import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import AppContext from "../../AppContext";
import { useContext } from "react";
import { csvToArray } from "../../functions";

function FirstStep({csvData, updateCsvData, waterData, updateWaterData, inputState}) {
  const context = useContext(AppContext);

  var {depth, x, y, setDepth, setX, setY} = inputState;

  useEffect(() => loadCSVs())

  function loadCSVs() {
    let input;
    if (csvData.length === 0) {
      input = './data.csv';
      fetch(input)
        .then( response => response.text() )
        .then( responseText => {
          updateCsvData(csvToArray(responseText));
        });
    }
    if (waterData.length === 0) {
      input = './water.csv';
      fetch(input)
        .then( response => response.text() )
        .then( responseText => {
          updateWaterData(csvToArray(responseText));
        });
    }
  }

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
      <Typography variant="body1" component="div" sx={{ mt: 6, mb: 1 }}>
        Enter the coordinates. <br />
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
          onChange={(e) => setX(e.target.value)}
        />
        <TextField
          label="Y"
          variant="filled"
          type="number"
          inputProps={{ max: 1000, min: 0 }}
          value={y || ""}
          onChange={(e) => setY(e.target.value)}
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
        onClick={() => context.nextStep()}
      >
        Get Suggestions
      </Button>
    </Box>
  );
}

export default FirstStep;
