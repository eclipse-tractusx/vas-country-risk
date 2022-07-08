import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DatePicker = () => {
    const [date, setDate] = React.useState("");

    const handleChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <FormControl className="DateForm" variant="filled">
            <InputLabel id="demo-simple-select-filled-label">
                Select a Date
            </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={date}
                onChange={handleChange}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
            </Select>
        </FormControl>
    );

};

export default DatePicker;