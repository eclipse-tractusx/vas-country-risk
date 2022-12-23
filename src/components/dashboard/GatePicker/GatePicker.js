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
  const { companyUser } = useContext(CompanyUserContext);

  const { gates, updateGate } = useContext(GatesContext);

  useEffect(() => {
    getUserBpdmGates(UserService.getToken(), companyUser).then((response) => {
      setAllGates(response);
    });
  }, []);

  //Get Current selected Gate
  const [gate, setGate] = useState("");

  const handleChange = (event) => {
    setGate(event.target.value);
    updateGate(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth variant="filled" color="primary">
        <InputLabel id="demo-simple-select-label">Select a Gate</InputLabel>
        <Select value={gate} onChange={handleChange} label="Gate">
          {AllGates && Array.isArray(AllGates)
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
