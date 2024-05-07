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
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getCountryByUser } from "../../services/country-api";
import UserService from "../../services/UserService";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";

const CountryPicker = () => {
  //Const with Countries relative to the user and BP
  const [Countries, setCountries] = useState("");

  //Context to save the current selected country
  const { countryS, updateCountry } = useContext(CountryContext);

  const { companyUser } = useContext(CompanyUserContext);

  //Call to get all the Countries relative to a User and BP
  useEffect(() => {
    getCountryByUser(UserService.getToken(), companyUser).then((response) => {
      setCountries(response);
    });
  }, []);

  //Handler to get current selected value on Autocomplete component
  const handleChange = (event, newValue) => {
    if (newValue === null) {
      updateCountry("none");
    } else {
      updateCountry(newValue);
    }
  };

  return (
    <Autocomplete
      className="autocomplete"
      fullWidth
      variant="filled"
      size="small"
      noOptionsText={"No country found"}
      onChange={handleChange}
      options={Countries || []}
      autoHighlight
      freeSolo={false}
      value={countryS || []}
      getOptionLabel={(option) => option.country || ""}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 }, fontSize: 13 }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
          />
          {option.country} ({option.iso2})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a country"
          InputProps={{
            ...params.InputProps,
          }}
          sx={{
            background: "white",
            borderRadius: "10px",
          }}
        />
      )}
    />
  );
};

export default CountryPicker;
