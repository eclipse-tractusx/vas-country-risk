import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";

import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

function valuetext(valueGreen) {
    return `${valueGreen}`;
  }

const RangeSlider = () => {

    //Default slider values
    const GreenDefaultMin = 60;
    const GreenDefaultMax = 100;
    const YellowDefaultMin = 37;
    const YellowDefaultMax = 60;
    const RedDefaultMin = 0;
    const RedDefaultMax = 37;

    //Error message value initialization
    const [checked, setChecked] = React.useState(false);

    const minDistance = 5; //Yellow Slider Spacing

    //Slide Initialization
    const [valueGreen, setValue] = React.useState([GreenDefaultMin, GreenDefaultMax]); //Green Slider (Fixed MAX-100 value)
    const [valueYellow, setValueYellow] = React.useState([YellowDefaultMin, YellowDefaultMax]); //Yellow Slider
    const [valueRed, setValueRed] = React.useState([RedDefaultMin, RedDefaultMax]); //Red Slider (Fixed MIN-0 value)

    //Green Slider Handler
    const handleChangeGreen = (event, newValue) => {
        setValue(newValue);

        if(valueGreen[0] <= valueYellow[1]){
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    
    };

    //Yellow Slider Handler
    const handleChangeYellow = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValueYellow([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValueYellow([clamped - minDistance, clamped]);
            }
        } else {
            setValueYellow(newValue);
        }

        if(valueYellow[1] >= valueGreen[0] || valueYellow[0] <= valueRed[1]){
            setChecked(true);
        }
        else{
            setChecked(false);
        }

    };

    //Red Slider Handler
    const handleChangeRed = (event, newValueThird) => {
        setValueRed(newValueThird);

        if(valueRed[1] >= valueYellow[0]){
            setChecked(true);
        }
        else{
            setChecked(false);
        }
    };

    return (
        <div>
        <div className="sliderone">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Input
                  value={valueGreen[0]}
                  margin="dense"
                  //onChange={handleChangeGreenInput}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  className="sliderGreen"
                  value={valueGreen}
                  onChange={handleChangeGreen}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  value={100}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="slidertwo">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Input
                  value={valueYellow[0]}
                  margin="dense"
                  //onChange={handleInputChange}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={valueYellow}
                  onChange={handleChangeYellow}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  value={valueYellow[1]}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="sliderthree">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Input
                  value={0}
                  margin="dense"
                  //onChange={handleInputChange}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  className="sliderthree"
                  value={valueRed}
                  onChange={handleChangeRed}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  value={valueRed[1]}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </div>
        <div>
            <Fade in={checked}>
                <Alert severity="warning">You have overlaping ranges! Please select another ranges</Alert>
            </Fade>
        </div>
        </div>
    );
};

export default RangeSlider;