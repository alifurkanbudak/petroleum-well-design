import { Box, Divider, Typography } from "@mui/material";
import CheckItem from "./check_item";

export default function Checks({ casing, sliderParams, plotData }) {
  const checkStatus = {
    failed: 0,
    warning: 1,
    success: 2,
  };

  function casingsThicknessCheck() {
    let status = checkStatus.success;
    let explanation = "Check casing thickness";
    let text = "Outer casings should be thicker than inner casings";
    if (!(sliderParams['th1']['th'] > sliderParams['th2']['th']
         && sliderParams['th2']['th'] > sliderParams['th3']['th']))  {
      status = checkStatus.warning;
    }
    // return { status, explanation, text };
    return (
      <CheckItem
        status={status}
        text={text}
        explanation={explanation}
      />
    );
  }

  // function casingsChecks(bool) {
  //   let fracFlag = false;
  //   let resFlag = false;
  //   for (let i of plotData['depths']) {
  //     if (bool && (plotData['Fracture Pressure'][i] < plotData['Mud Pressure'][i])) {
  //       fracFlag = true;
  //     }
  //     if (bool && (plotData['Reservoir Pressure'][i] > plotData['Mud Pressure'][i])) {
  //       resFlag = true;
  //     }
  //   }
  //   return {fracFlag, resFlag};
  // }

  function checkStatusItem(fracFlag, resFlag, casingNum, start, end) {
    let status = checkStatus.success;
    let explanation = `Mud pressure should lie between reservoir and fracture pressures`
                        + ` for ${start} and ${end} depths`;
    let text;
    if (fracFlag) {
      status = checkStatus.failed;
      text = "Casing " + casingNum + " should be increased";
    } else if (resFlag) {
      status = checkStatus.failed;
      text = "Casing " + casingNum + " should be decreased";
    }
    // return { status, explanation, text };
    return (
      <CheckItem
        status={status}
        text={text}
        explanation={explanation}
      />
    );
  }

  function casing1Check() {
    let fracFlag = false;
    let resFlag = false;
    for (let x of plotData) {
      let i = x['depths']
      if ((i >= casing['c1'].start) && (i <= casing['c2'].start)
       && (x['Fracture Pressure'] < x['Mud Pressure'])) {
        fracFlag = true;
      }
      if ((i >= casing['c1'].start) && (i <= casing['c2'].start)
       && (x['Reservoir Pressure'] > x['Mud Pressure'])) {
        resFlag = true;
      }
    }
    return checkStatusItem(fracFlag, resFlag, '1', casing['c1'].start, casing['c2'].start);
  }
  function casing2Check() {
    let fracFlag = false;
    let resFlag = false;
    for (let x of plotData) {
      let i = x['depths']
      if ((i > casing['c2'].start) && (i <= casing['c3'].start)
       && (x['Fracture Pressure'] < x['Mud Pressure'])) {
        fracFlag = true;
      }
      if ((i > casing['c2'].start) && (i <= casing['c3'].start)
       && (x['Reservoir Pressure'] > x['Mud Pressure'])) {
        resFlag = true;
      }
    }
    return checkStatusItem(fracFlag, resFlag, '2', casing['c2'].start, casing['c3'].start);
  }
  function casing3Check() {
    let fracFlag = false;
    let resFlag = false;
    for (let x of plotData) {
      let i = x['depths']
      if ((i > casing['c3'].start) && (i <= casing['c3'].end)
       && (x['Fracture Pressure'] < x['Mud Pressure'])) {
        fracFlag = true;
      }
      if ((i > casing['c3'].start) && (i <= casing['c3'].end)
       && (x['Reservoir Pressure'] > x['Mud Pressure'])) {
        resFlag = true;
      }
    }
    return checkStatusItem(fracFlag, resFlag, '3', casing['c3'].start, casing['c3'].end);
  }

  return (
    <Box sx={{ width: "33%" }}>
      <Typography variant="h6" align="center">
        Casing Thickness Checks
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {casingsThicknessCheck()}
      <Box sx={{ m: 4 }} />
      {casing1Check()}
      <Box sx={{ m: 4 }} />
      {casing2Check()}
      <Box sx={{ m: 4 }} />
      {casing3Check()}
    </Box>
  );
}
