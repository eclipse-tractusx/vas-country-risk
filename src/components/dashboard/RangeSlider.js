import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";

function valuetext(valueGreen) {
    return `${valueGreen}`;
  }

const RangeSlider = () => {

    const minDistance = 5; //Yellow Slider Spacing

    //Slide Initialization
    const [valueGreen, setValue] = React.useState([60, 100]); //Green Slider (Fixed MAX-100 value)
    const [valueYellow, setValueYellow] = React.useState([20, 37]); //Yellow Slider
    const [valueRed, setValueRed] = React.useState([0, 37]); //Red Slider (Fixed MIN-0 value)

    //Green Slider Handler
    const handleChangeGreen = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
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
    };

    //Red Slider Handler
    const handleChangeRed = (event, newValueThird) => {
        setValueRed(newValueThird);
    };

    return (
        <div>
        <div className="sliderone">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Input
                  value={valueGreen[0]}
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
          </div>
    );
};

export default RangeSlider;