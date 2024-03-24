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

  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getAllDates(UserService.getToken(), companyUser)
      .then((response) => {
        if (Array.isArray(response) && response.length > 0) {
          setAllDate(response.sort().reverse());
          setDate(response.sort().reverse()[0]);
        } 
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload]);

  //Date Currently Selected
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    passYearSelected(date);
  }, [date]);

  const { reportValuesContext } = useContext(ReportContext);

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
    <Box>
      <InputLabel id="demo-simple-select-label">Select a Year</InputLabel>
      <FormControl fullWidth hiddenLabel="true" variant="filled">
        <Select value={date} onChange={handleChange} label="Year">
          {AllDate && Array.isArray(AllDate)
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
