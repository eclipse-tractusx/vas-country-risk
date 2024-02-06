/********************************************************************************
* Copyright (c) 2022,2024 BMW Group AG
* Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
*
* See the NOTICE file(s) distributed with this work for additional
* information regarding copyright ownership.
*
* This program and the accompanying materials are made available under the
* terms of the Apache License, Version 2.0 which is available at
* https://www.apache.org/licenses/LICENSE-2.0.
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations
* under the License.
*
* SPDX-License-Identifier: Apache-2.0
********************************************************************************/
import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import UserService from "../../services/UserService";
import { getAllRanges } from "../../services/ranges-api";
import { RangesContext } from "../../../contexts/ranges";
import { Button, IconButton } from "cx-portal-shared-components";
import { sendValues } from "../../services/ranges-api";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

function valuetext(valueGreen) {
  return `${valueGreen}`;
}

const RangeSlider = () => {
  const { ranges, updateRanges } = useContext(RangesContext);

  const [severityRange, setSeverityRange] = useState("");

  const [severityMessageRange, setSeverityMessageRange] = useState("");

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const [timer, setTimer] = React.useState(0);

  //Open Error/Sucess Dialog
  const [openAlert, setOpenAlert] = React.useState(false);

  const saveRanges = () => {
    sendValues(ranges, companyUser, UserService.getToken())
      .then((code) => {
        if (code.status === 200) {
          setOpenAlert(true);
          setSeverityRange("success");
          setSeverityMessageRange("Ranges Saved!");
        }
      })
      .catch((err) => {
        if (err.response.data.status === 500) {
          setOpenAlert(true);
          setSeverityRange("error");
          setSeverityMessageRange("Error on save!");
        }
        if (err.response.data.status === 401) {
          setOpenAlert(true);
          setSeverityRange("error");
          setSeverityMessageRange("No permissions!");
        }
      });
    timerFunction();
  };

  const [minValue, setMin] = useState(37);
  const [betweenValue, setMid] = useState(60);
  const [maxValue, setMax] = useState(100);

  const { reportValuesContext } = useContext(ReportContext);

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
    setOpenAlert(false);
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
    setOpenAlert(false);

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
    setOpenAlert(false);
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
    if (event.target.value > 3 && event.target.value < 100) {
      if (parseFloat(event.target.value) - 1 <= valueYellow[0]) {
        const yelloTempVal = [
          parseFloat(event.target.value) - 2,
          parseFloat(event.target.value) - 1,
        ];
        setYellowValues(yelloTempVal);
        setSeverityRange("");
        setSeverityMessageRange("");
        setOpenAlert(false);

        if (parseFloat(event.target.value) - 2 <= valueRed[1]) {
          const redTempVal = [0, parseFloat(event.target.value) - 3];
          setRedValues(redTempVal);
          setSeverityRange("");
          setSeverityMessageRange("");
          setOpenAlert(false);
        }
      } else {
        const yelloTempVal = [
          valueYellow[0],
          parseFloat(event.target.value) - 1,
        ];
        setYellowValues(yelloTempVal);
        setSeverityRange("");
        setSeverityMessageRange("");
        setOpenAlert(false);
      }
    } else {
      setGreenValues([parseFloat(valueYellow[1] + 1), 100]);
      setOpenAlert(false);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
      setOpenAlert(true);
      timerFunction();
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
      setOpenAlert(false);
    } else {
      setYellowValues([
        parseFloat(valueRed[1] + 1),
        parseFloat(valueGreen[0] - 1),
      ]);
      setOpenAlert(false);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
      setOpenAlert(true);
      timerFunction();
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
      setOpenAlert(false);
    } else {
      setYellowValues([
        parseFloat(valueRed[1] + 1),
        parseFloat(valueGreen[0] - 1),
      ]);
      setOpenAlert(false);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
      setOpenAlert(true);
      timerFunction();
    }
  };

  //Changes Values Using User Input
  const handleChangeRedInput = (event) => {
    const tempVal = [0, event.target.value];
    setRedValues(tempVal);
  };

  //Changes Values Using User Input
  const validateRedInput = (event) => {
    if (event.target.value > 0 && event.target.value < 97) {
      if (parseFloat(event.target.value) + 1 >= valueYellow[1]) {
        const yelloTempVal = [
          parseFloat(event.target.value) + 1,
          parseFloat(event.target.value) + 2,
        ];
        setYellowValues(yelloTempVal);
        setSeverityRange("");
        setSeverityMessageRange("");
        setOpenAlert(false);

        if (parseFloat(event.target.value) + 2 >= valueGreen[0]) {
          const greenTempVal = [parseFloat(event.target.value) + 3, 100];
          setGreenValues(greenTempVal);
          setSeverityRange("");
          setSeverityMessageRange("");
          setOpenAlert(false);
        }
      } else {
        const yelloTempVal = [
          parseFloat(event.target.value) + 1,
          valueYellow[1],
        ];
        setYellowValues(yelloTempVal);
        setSeverityRange("");
        setSeverityMessageRange("");
        setOpenAlert(false);
      }
    } else {
      setRedValues([0, parseFloat(valueYellow[0] - 1)]);
      setOpenAlert(false);
      setSeverityRange("error");
      setSeverityMessageRange("Overlap Value");
      setOpenAlert(true);
      timerFunction();
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const hideAlert = () => {
    setSeverityRange("");
    setSeverityMessageRange("");
    setOpenAlert(!openAlert);
  };

  const timerFunction = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        setSeverityRange("");
        setSeverityMessageRange("");
        setOpenAlert(false);
      }, 4000)
    );
  };

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
              onKeyDown={(e) => handleKeyPress(e)}
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
              disabled={true}
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
              onKeyDown={(e) => handleKeyPress(e)}
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
              onKeyDown={(e) => handleKeyPress(e)}
              value={valueYellow[1]}
              margin="dense"
              onChange={handleChangeYellowInput}
              onBlur={validateYellowRightInput}
              inputProps={{
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
              disabled={true}
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
              onKeyDown={(e) => handleKeyPress(e)}
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
        <div className="alertDialog">
          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={hideAlert}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={severityRange}
            >
              <span>{severityMessageRange}</span>
            </Alert>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
