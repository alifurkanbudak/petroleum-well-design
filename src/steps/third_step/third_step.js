import { Box } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import AdjustParams from "./adjust_params/adjust_params";
import PressurePlot from "./pressure_plot/pressure_plot";
import Checks from "./checks/checks";

function ThirdStep({ inputState }) {
    const [th1, setTh1] = useState(10);
    const [th2, setTh2] = useState(10);
    const [th3, setTh3] = useState(10);
    const [plotData, setPlotData] = useState([]);

    var { depth, x, y, c1, c2, c3 } = inputState;
    var casing = useMemo(() => {return { c1, c2, c3 }}, [c1, c2, c3]);// { c1, c2, c3 };
    
    var sliderParams = useMemo(() => {return {
        'th1': {
            'th': th1, 'setTh': setTh1, 'name': 'Thickness 1'
        },
        'th2': {
            'th': th2, 'setTh': setTh2, 'name': 'Thickness 2'
        },
        'th3': {
            'th': th3, 'setTh': setTh3, 'name': 'Thickness 3'
        }
    }}, [th1, th2, th3]);

    useEffect(() => {
        let nUnit = Math.floor(casing['c3'].end/10);
        let totalPoints = Math.ceil(casing['c3'].end/nUnit);
        let plotData = []
        for(let i=0; i<=totalPoints*nUnit; i=i+nUnit) {
            let b1 = (i >= casing['c1'].start) && (i <= casing['c2'].start);
            let b2 = (i > casing['c2'].start) && (i <= casing['c3'].start);
            // let b3 = i > casing['c3'].start && i <= casing['c3'].end;
            let th = b1 ? sliderParams['th1']['th'] : (b2 ? sliderParams['th2']['th'] : sliderParams['th3']['th']);
            plotData.push({
                'ths': th,
                'depths': i,
                'Reservoir Pressure': ((i*0.4 + 300*Math.random()) * 0.7),
                'Fracture Pressure': ((i*0.7 + 1000*Math.random()) + 500),
                'Mud Pressure': (i*0.5 + (1/th)*i*4 + 200)
            });
        }
        setPlotData(plotData);
    },[casing, sliderParams])

  return (
    <Box
        sx={{
        display: "flex",
        height: "100%",
        }}
    >
        <AdjustParams sliderParams={sliderParams} />
        <PressurePlot
            casing={casing}
            sliderParams={sliderParams}
            plotData={plotData}
            setPlotData={setPlotData}
        />
        <Checks casing={casing} sliderParams={sliderParams} plotData={plotData} />
    </Box>
  );
}

export { ThirdStep };
