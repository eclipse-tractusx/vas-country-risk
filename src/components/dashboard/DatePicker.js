import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllDates } from "../services/dateform-api";

const DatePicker = ({ getValueFromDatePicker }) => {

  //Get Current Year
  var currentTime = new Date();
  var year = currentTime.getFullYear();

  //Temporary Array
  let arraytemp = [];
  arraytemp.push(year); //Inserts current year in array

  //Store Dates coming from API
  const [AllDate, setAllDate] = useState();

  if (AllDate === undefined) {
    arraytemp = [];
  } else {
    AllDate.forEach(function (item) {
      arraytemp.push(item);
    });
  }

  useEffect(() => {
    getAllDates(date).then((response) => setAllDate(response));
  }, []);

  //Date Currently Selected
  const [date, setDate] = React.useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <FormControl className="DateForm" fullWidth>
      <InputLabel>Select a Date</InputLabel>
      <Select defaultValue={year} value={date || ""} onChange={handleChange} setRatingsToParent={getValueFromDatePicker(date)}>
        {arraytemp.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default DatePicker;
