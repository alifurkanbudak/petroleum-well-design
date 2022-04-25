import { Box } from "@mui/material";
import React, { useState } from "react";
import AdjustParams from "./adjust_params/adjust_params";
import PressurePlot from "./pressure_plot/pressure_plot";

function ThirdStep({ inputState }) {
    const [th1, setTh1] = useState(10);
    const [th2, setTh2] = useState(10);
    const [th3, setTh3] = useState(10);

    var { depth, x, y, c1, c2, c3 } = inputState;
    var casing = { c1, c2, c3 };
    
    var sliderParams = {
        'th1': {
            'th': th1, 'setTh': setTh1, 'name': 'Thickness 1'
        },
        'th2': {
            'th': th2, 'setTh': setTh2, 'name': 'Thickness 2'
        },
        'th3': {
            'th': th3, 'setTh': setTh3, 'name': 'Thickness 3'
        }
    };

  return (
    <Box
        sx={{
        display: "flex",
        height: "100%",
        }}
    >
        <AdjustParams sliderParams={sliderParams} />
        <PressurePlot casing={casing} sliderParams={sliderParams} />
    </Box>
  );
}

export { ThirdStep };
