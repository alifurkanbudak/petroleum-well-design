import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function PressurePlot({ casing, sliderParams }) {
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        let nUnit = 1000;
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
                'resP': ((i*0.4 + 300*Math.random()) * 0.7),
                'fracP': ((i*0.7 + 1000*Math.random()) + 500),
                'mudP': (i*0.5 + (1/th)*i*4 + 200)
            });
        }
        setPlotData(plotData);
    },[casing, sliderParams])
    
    return (
        <Box sx={{ ml: 2, mr: 2, width: '34%' }}>
            <Typography variant="h6" align="center">
                Pressure Plot
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <LineChart width={475} height={400} data={plotData}>
                <Line type="monotone" dataKey="resP" stroke="#BE2A2C" />
                <Line type="monotone" dataKey="mudP" stroke="#060606" />
                <Line type="monotone" dataKey="fracP" stroke="#9DCA44" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis />
                <YAxis dataKey="depths" />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
            </LineChart>
        </Box>
    );
}
