import React, { useState, useEffect, Component, useContext } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import UserService from "../../services/UserService";
import { getAllRanges } from "../../services/ranges-api";
import { RangesContext } from "../../../contexts/ranges";
import { Alert, Button } from "cx-portal-shared-components";
import { sendValues } from "../../services/ranges-api";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";

function valuetext(valueGreen) {
  return `${valueGreen}`;
}

const RangeSlider = () => {
  const { ranges, updateRanges } = useContext(RangesContext);
  const [severityRange, setSeverityRange] = useState("");
  const [severityMessageRange, setSeverityMessageRange] = useState("");
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const saveRanges = () => {
    sendValues(ranges, companyUser);
  };

  const [minValue, setMin] = useState(37);
  const [betweenValue, setMid] = useState(60);
  const [maxValue, setMax] = useState(100);

  const { reportValuesContext, updateReport } = useContext(ReportContext);

  const getRanges = () => {
    getAllRanges(UserService.getToken(), companyUser).then((response) => {
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
  };

  useEffect(() => {
    getRanges();
  }, [betweenValue, maxValue, minValue]);

  //Slide Initialization
  const [valueGreen, setGreenValues] = useState([betweenValue + 1, maxValue]);

  const [valueYellow, setYellowValues] = useState([minValue + 1, betweenValue]);
  const [valueRed, setRedValues] = useState([0, minValue]);

  //Green Slider Handler
  const handleChangeGreen = (event, newValue) => {
    setSeverityRange("");
    setSeverityMessageRange("");
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
    setSeverityRange("");
    setSeverityMessageRange("");

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
    setSeverityRange("");
    setSeverityMessageRange("");
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
    setGreenValues([event.target.value, 100]);
  };

  //Changes Values Using User Input
  const validateGreenInput = (event) => {
    if (
      event.target.value > parseFloat(valueYellow[0]) + 1 &&
      event.target.value < 100
    ) {
      const yelloTempVal = [valueYellow[0], parseFloat(event.target.value) - 1];
      setYellowValues(yelloTempVal);
      setSeverityRange("");
      setSeverityMessageRange("");
    } else {
      setGreenValues([parseFloat(valueYellow[1] + 1), 100]);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
    }
  };

  //Changes Values Using User Input
  const handleChangeYellowInput = (event) => {
    if (event.target.step === "0") {
      const tempValY = [event.target.value, valueYellow[1]];
      setYellowValues(tempValY);
    } else {
      const tempValY = [valueYellow[0], event.target.value];
      setYellowValues(tempValY);
    }
  };

  //Changes Values Using User Input
  const validateYellowLeftInput = (event) => {
    if (
      event.target.value < parseFloat(valueYellow[1]) &&
      event.target.value > parseFloat(valueRed[0] + 1)
    ) {
      const redTempVal = [0, parseFloat(event.target.value) - 1];
      setRedValues(redTempVal);
      setSeverityRange("");
      setSeverityMessageRange("");
    } else {
      setYellowValues([
        parseFloat(valueRed[1] + 1),
        parseFloat(valueGreen[0] - 1),
      ]);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
    }
  };

  //Changes Values Using User Input
  const validateYellowRightInput = (event) => {
    if (
      event.target.value > parseFloat(valueYellow[0]) &&
      event.target.value < parseFloat(valueGreen[1] - 1)
    ) {
      const greenTempVal = [parseFloat(event.target.value) + 1, 100];
      setGreenValues(greenTempVal);
      setSeverityRange("");
      setSeverityMessageRange("");
    } else {
      setYellowValues([
        parseFloat(valueRed[1] + 1),
        parseFloat(valueGreen[0] - 1),
      ]);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
    }
  };

  //Changes Values Using User Input
  const handleChangeRedInput = (event) => {
    const tempVal = [0, event.target.value];
    setRedValues(tempVal);
  };

  //Changes Values Using User Input
  const validateRedInput = (event) => {
    if (
      event.target.value > 0 &&
      event.target.value < parseFloat(valueYellow[1] - 1)
    ) {
      const yelloTempVal = [parseFloat(event.target.value) + 1, valueYellow[1]];
      setYellowValues(yelloTempVal);
      setSeverityRange("");
      setSeverityMessageRange("");
    } else {
      setRedValues([0, parseFloat(valueYellow[0] - 1)]);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
    }
  };

  useEffect(() => {
    updateRanges([valueRed, valueYellow, valueGreen]);
  }, [valueGreen, valueRed, valueYellow]);

  useEffect(() => {
    const reportRange = reportValuesContext.filter((r) => r.name === "Range");

    if (reportRange.length) {
      setRedValues(reportRange[0].objectValue[0]);
      setYellowValues(reportRange[0].objectValue[1]);
      setGreenValues(reportRange[0].objectValue[2]);
    } else {
      getRanges();
    }
  }, [reportValuesContext]);

  return (
    <>
      <div className="slider-header">
        <Button className="saveRanges" size="small" onClick={saveRanges}>
          Save Ranges
        </Button>
      </div>
      <Alert severity={severityRange}>
        <span>{severityMessageRange}</span>
      </Alert>
      <div className="sliderone">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Input
              value={valueGreen[0]}
              onChange={handleChangeGreenInput}
              onBlur={validateGreenInput}
              inputProps={{
                step: 0,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider-greenSlider",
                "data-testid": "input-slider-greenSlider",
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
              data-testid="slider-green"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              value={100}
              readOnly={true}
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
              onBlur={validateYellowLeftInput}
              inputProps={{
                step: 0,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
                "data-testid": "input-slider-yellow-left",
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
              data-testid="slider-yellow"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              value={valueYellow[1]}
              margin="dense"
              onChange={handleChangeYellowInput}
              onBlur={validateYellowRightInput}
              inputProps={{
                //readOnly: true,
                step: 1,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
                "data-testid": "input-slider-yellow-right",
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
              data-testid="slider-red"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              value={valueRed[1]}
              onChange={handleChangeRedInput}
              onBlur={validateRedInput}
              margin="dense"
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
                "data-testid": "input-slider-red-right",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default RangeSlider;
