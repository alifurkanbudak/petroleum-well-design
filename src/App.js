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
import FirstStep from "./steps/first_step/first_step";
import SecondStep from "./steps/second_step/second_step";
import AppContext from "./AppContext";
import { useState } from "react";

const steps = ["Enter well info", "Get suggestions", "Run Simulation"];

function App() {
  const [step, setStep] = useState(1);

  function prevStep() {
    setStep((s) => s - 1);
  }

  function nextStep() {
    setStep((s) => s + 1);
  }

  const globalState = {
    step: step,
    nextStep: nextStep,
    prevStep: prevStep,
  };

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
    body = <FirstStep />;
  } else if (step === 2) {
    body = <SecondStep />;
  }

  return (
    <AppContext.Provider value={globalState}>
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
    </AppContext.Provider>
  );
}

export default App;
