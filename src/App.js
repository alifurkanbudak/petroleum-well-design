import "./App.css";
import * as React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  IconButton,
  Fade,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { FirstStep } from "./steps/first_step/first_step";
import { SecondStep } from "./steps/second_step/second_step";
import { useState, useEffect } from "react";
import { csvToArray } from "./functions";

const steps = ["Enter well info", "Get suggestions", "Run Simulation"];

function App() {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = React.useState([]);
  const [waterData, setWaterData] = React.useState([]);
  const [depth, setDepth] = React.useState();
  const [x, setX] = React.useState();
  const [y, setY] = React.useState();

  function prevStep() {
    setStep((s) => s - 1);
  }

  function nextStep() {
    setStep((s) => s + 1);
  }

  var inputState = {
    depth,
    x,
    y,
    setDepth: (d) => setDepth(d),
    setX: (x) => setX(x),
    setY: (y) => setY(y),
  };

  useEffect(() => {
    loadCsvData().then((res) => setCsvData(res));
    loadWaterData().then((res) => setWaterData(res));
  }, []);

  var appBar = (
    <AppBar position="static">
      <Toolbar>
        <Fade in={step > 1}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={prevStep}
          >
            <ArrowBack />
          </IconButton>
        </Fade>
        <Typography variant="h6" component="div">
          Petroleum Well Design
        </Typography>
      </Toolbar>
    </AppBar>
  );

  var body;
  if (step === 1) {
    body = (
      <FirstStep
        csvData={csvData}
        setCsvData={setCsvData}
        waterData={waterData}
        setWaterData={setWaterData}
        inputState={inputState}
        nextStep={nextStep}
      />
    );
  } else if (step === 2) {
    body = (
      <SecondStep
        csvData={csvData}
        waterData={waterData}
        inputState={inputState}
        nextStep={nextStep}
      />
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {appBar}
      <Stepper
        activeStep={step - 1}
        sx={{ width: "50%", margin: "auto", mt: 3 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          p: 4,
          flexGrow: 1,
        }}
      >
        {body}
      </Box>
    </Box>
  );
}

async function loadCsvData() {
  const res = await fetch("./data.csv");
  return csvToArray(await res.text());
}

async function loadWaterData() {
  const res = await fetch("./water.csv");
  const waterDataArray = csvToArray(await res.text());

  return waterDataArray.map((e) => e["Cw"].split("-").map((s) => parseInt(s)));
}

export default App;
