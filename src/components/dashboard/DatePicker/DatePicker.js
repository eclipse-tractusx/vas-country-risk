import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { getAllDates } from "../../services/dateform-api";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { ReloadContext } from "../../../contexts/refresh";

const DatePicker = ({ passYearSelected }) => {
  //Store Dates coming from API
  const [AllDate, setAllDate] = useState();
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const { reload, updateReload } = useContext(ReloadContext);

  useEffect(() => {
    getAllDates(UserService.getToken(), companyUser).then((response) => {
      setAllDate(response.sort().reverse());
      setDate(response.sort().reverse()[0]);
    });
  }, [reload]);

  //Date Currently Selected
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const { reportValuesContext, updateReport } = useContext(ReportContext);

  useEffect(() => {
    const reportRates = reportValuesContext.filter((r) => r.name === "Ratings");

    setDate(
      reportRates.length
        ? reportRates[0].objectValue[0]
          ? reportRates[0].objectValue[0].yearPublished
          : date
        : date
    );
  }, [reportValuesContext]);

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
