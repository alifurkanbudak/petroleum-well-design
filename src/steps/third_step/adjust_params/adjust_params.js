import React from "react";
import { Box,
     Stack,
     Slider,
     Typography,
     Divider } from "@mui/material";

export default function AdjustParams({ sliderParams }) {
    
  return (
    <Box sx={{ width: '33%' }}>
        <Typography variant="h6" align="center">
            Parameters
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {
            Object.keys(sliderParams).map( (x,i) => (
                <Stack key={i} spacing={2} direction="column" sx={{ mb: 10, mt: 1 }} alignItems="center">
                    <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                        {sliderParams[x].name}
                    </Typography>
                    <Slider 
                        size='medium'
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        min={10}
                        max={110}
                        step={5}
                        onChange={(e) => sliderParams[x].setTh(e.target.value)}
                    />
                </Stack>
            ))
        }
    </Box>
  );
}
