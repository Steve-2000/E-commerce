import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';

function valuetext(value) {
  return `${value}rs`;
}

export default function DiscreteSliderSteps({ price, setPrice }) {
  const [value, setValue] = useState(price);

  // Sync local state if parent price changes (e.g. reset filters)
  useEffect(() => {
    setValue(price);
  }, [price]);

  // Updates the slider visually while dragging
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Updates the parent state (and triggers search) only when dragging stops
  const handleCommit = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="mb-2">
        Price: {value[0]}rs - {value[1]}rs
      </div>
      <Slider
        aria-label="Small steps"
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        step={10}
        marks
        min={1}
        max={1000}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}