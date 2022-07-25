import React, { useState, useEffect } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllDates } from "../services/dateform-api";

const DatePicker = ({ passYearSelected }) => {
  //Store Dates coming from API
  const [AllDate, setAllDate] = useState();

  useEffect(() => {
    getAllDates().then((response) => setAllDate(response));
  }, []);

  //Date Currently Selected
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <FormControl className="DateForm" fullWidth>
      <InputLabel>Select a Date</InputLabel>
      <Select
        value={date}
        onChange={handleChange}
        passYearSelected={passYearSelected(date)}
      >
        {Array.isArray(AllDate)
          ? AllDate.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })
          : []}
      </Select>
    </FormControl>
  );
};

export default DatePicker;
