/********************************************************************************
* Copyright (c) 2022,2023 BMW Group AG 
* Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
import { getUserBpdmGates } from "../../services/gate-api";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
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
        <Select value={gate} onChange={handleChange} label="Gate" data-testid="selectGate">
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
