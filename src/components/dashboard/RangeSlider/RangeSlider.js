import React, { useState, useEffect, Component, useContext } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { getAllRanges } from "../../services/ranges-api";
import { RangesContext } from "../../../contexts/ranges";
import { Button } from "cx-portal-shared-components";
import { sendValues } from "../../services/ranges-api";
function valuetext(valueGreen) {
  return `${valueGreen}`;
}

const RangeSlider = () => {
  const { ranges, updateRanges } = useContext(RangesContext);

  const saveRanges = () => {
    sendValues(ranges);
  };

  const [minValue, setMin] = useState(37);
  const [betweenValue, setMid] = useState(60);
  const [maxValue, setMax] = useState(100);

  useEffect(() => {
    getAllRanges().then((response) => {
      if (Array.isArray(response)) {
        response.forEach((eachArray) => {
          if (eachArray.range === "Min") {
            setRedValues([0, eachArray.value]);
            setMin(eachArray.value);
          } else if (eachArray.range === "Between") {
            setYellowValues([minValue + 1, eachArray.value]);
            setMid(eachArray.value);
          } else if (eachArray.range === "Max") {
            setGreenValues([betweenValue + 1, eachArray.value]);
            setMax(eachArray.value);
          }
        });
      }
    });
  }, [betweenValue, maxValue, minValue]);

  //Slide Initialization
  const [valueGreen, setGreenValues] = useState([betweenValue + 1, maxValue]);

  const [valueYellow, setYellowValues] = useState([minValue + 1, betweenValue]);
  const [valueRed, setRedValues] = useState([0, minValue]);

  //Green Slider Handler
  const handleChangeGreen = (event, newValue) => {
    newValue[1] = 100;
    newValue[0] =
      newValue[1] === newValue[0]
        ? (newValue[0] = newValue[0] - 1)
        : newValue[0];
    const tempVal = [valueYellow[0], newValue[0] - 1];
    if (!(newValue[0] <= parseFloat(valueRed[1]) + 2)) {
      setGreenValues(newValue);
      setYellowValues(tempVal);
    }
  };

  const handleChangeYellow = (event, newValue) => {
    if (!(newValue[0] === newValue[1])) {
      const tempValG = [newValue[1] + 1, valueGreen[1]];
      const tempValR = [valueRed[0], newValue[0] - 1];
      if (newValue[1] < 99 && newValue[0] > 1) {
        setYellowValues(newValue);
        setGreenValues(tempValG);
        setRedValues(tempValR);
      }
    }
  };

  const handleChangeRed = (event, newValue) => {
    newValue[0] = 0;
    newValue[1] =
      newValue[1] === newValue[0]
        ? (newValue[1] = newValue[1] - 1)
        : newValue[1];

    const tempValY = [newValue[1] + 1, valueYellow[1]];

    if (!(newValue[1] >= valueGreen[0] - 2)) {
      setYellowValues(tempValY);
      setRedValues(newValue);
    }
  };

  //Changes Values Using User Input
  const handleChangeGreenInput = (event) => {
    const tempVal = [event.target.value, 100];
    const yelloTempVal = [valueYellow[0], event.target.value - 1];

    if (
      !(event.target.value <= parseFloat(valueRed[1]) + 2) &&
      event.target.value < 100
    ) {
      setGreenValues(tempVal);
      setYellowValues(yelloTempVal);
    }
  };

  //Changes Values Using User Input
  const handleChangeYellowInput = (event) => {
    if (event.target.value > valueYellow[1] && event.target.value < 99) {
      const tempValY = [valueYellow[0], event.target.value];
      setYellowValues(tempValY);
      const tempValG = [parseFloat(event.target.value) + 1, valueGreen[1]];
      setGreenValues(tempValG);
    } else if (
      event.target.value < valueYellow[1] &&
      event.target.value > valueYellow[0] &&
      event.target.step === "1"
    ) {
      const tempValY = [valueYellow[0], event.target.value];
      setYellowValues(tempValY);
      const tempValG = [parseFloat(event.target.value) + 1, valueGreen[1]];
      setGreenValues(tempValG);
    } else if (
      event.target.value < valueYellow[1] &&
      event.target.value > valueYellow[0] &&
      event.target.step === "0"
    ) {
      const tempValY = [event.target.value, valueYellow[1]];
      const tempValR = [valueRed[0], event.target.value - 1];
      setYellowValues(tempValY);
      setRedValues(tempValR);
    } else if (event.target.value < valueYellow[0] && event.target.value > 1) {
      const tempValY = [event.target.value, valueYellow[1]];
      const tempValR = [valueRed[0], event.target.value - 1];
      setYellowValues(tempValY);
      setRedValues(tempValR);
    }
  };

  //Changes Values Using User Input
  const handleChangeRedInput = (event) => {
    const tempVal = [valueRed[0], event.target.value];
    const yelloTempVal = [parseFloat(event.target.value) + 1, valueYellow[1]];

    if (!(event.target.value >= valueGreen[0] - 2) && event.target.value > 0) {
      setRedValues(tempVal);
      setYellowValues(yelloTempVal);
    }
  };

  useEffect(() => {
    updateRanges([valueRed, valueYellow, valueGreen]);
  }, [valueGreen, valueRed, valueYellow]);

  return (
    <>
      <div className="slider-header">
        <Button className="saveRanges" size="small" onClick={saveRanges}>
          Save Ranges
        </Button>
      </div>
      <div className="sliderone">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Input
              value={valueGreen[0]}
              onChange={handleChangeGreenInput}
              margin="dense"
              //onBlur={handleBlur}
              inputProps={{
                //readOnly: true,
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
              value={valueGreen}
              onChange={handleChangeGreen}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              disableSwap
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
              onChange={handleChangeYellowInput}
              //onBlur={handleBlur}
              inputProps={{
                step: 0,
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
              onChange={handleChangeYellowInput}
              inputProps={{
                //readOnly: true,
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
              value={valueRed[0]}
              margin="dense"
              inputProps={{
                readOnly: true,
                step: 0,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
          <Grid item xs>
            <Slider
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
              onChange={handleChangeRedInput}
              margin="dense"
              inputProps={{
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
    </>
  );
};

export default RangeSlider;
