import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { getUserBpdmGates } from "../../services/gate-api";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { ReloadContext } from "../../../contexts/refresh";
import { GatesContext } from "../../../contexts/gates";

const GatePicker = () => {
  const [AllGates, setAllGates] = useState();
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const { reload, updateReload } = useContext(ReloadContext);

  const { gates, updateGate } = useContext(GatesContext);

  useEffect(() => {
    getUserBpdmGates(UserService.getToken(), companyUser).then((response) => {
      setAllGates(response.sort().reverse());
      //setGate(response.sort().reverse()[0]); //Value on Page Start
    });
  }, [reload]);

  //Get Current selected Gate
  const [gate, setGate] = useState("");

  console.log(companyUser)

  const handleChange = (event) => {
    setGate(event.target.value);
    updateGate(event.target.value);
  };

  /*const { reportValuesContext, updateReport } = useContext(ReportContext);

  //Set Reports Data
  useEffect(() => {
    const reportRates = reportValuesContext.filter((r) => r.name === "Ratings");

    setGate(
      reportRates.length
        ? reportRates[0].objectValue[0]
          ? reportRates[0].objectValue[0].yearPublished //Mudar
          : gate
        : gate
    );
  }, [reportValuesContext]);*/

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="filled" color="primary">
        <InputLabel id="demo-simple-select-label">Select a Gate</InputLabel>
        <Select value={gate} onChange={handleChange} label="Gate">
          {Array.isArray(AllGates)
            ? AllGates.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item.gateName}
                  </MenuItem>
                );
              })
            : []}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GatePicker;
