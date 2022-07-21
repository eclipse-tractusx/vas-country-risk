import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllDates } from "../services/dateform-api";

const DatePicker = () => {

    //Temporary Array
    let arraytemp = [];

    //Store Dates coming from API
    const [AllDate, setAllDate] = useState();

    if(AllDate == undefined){
        arraytemp = [];
    }
    else {
        arraytemp = AllDate;
    }

    useEffect(() => {
        getAllDates().then((response) =>
        setAllDate(response));
    }, []);
    
    //Date Currently Selected
    const [date, setDate] = React.useState("");

    console.log("Current select date is:" + arraytemp[date]);

    //Get Current Year
    var currentTime = new Date();
    var year = currentTime.getFullYear()

    const handleChange = (event) => {
        setDate(event.target.value);
        //console.log(event.target.value);
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
                {arraytemp.map((arraytemp, index) => { 
                return (
                <MenuItem value={index}>{arraytemp}</MenuItem>
                )})}
            </Select>
        </FormControl>
    );

};

export default DatePicker;