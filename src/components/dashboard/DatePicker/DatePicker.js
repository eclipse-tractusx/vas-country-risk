import React, { useState, useEffect } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { getAllDates } from "../../services/dateform-api";

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
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">Select a Year</InputLabel>
        <Select
          value={date}
          onChange={handleChange}
          passYearSelected={passYearSelected(date)}
          label="Year"
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
    </Box>
  );
};

export default DatePicker;
