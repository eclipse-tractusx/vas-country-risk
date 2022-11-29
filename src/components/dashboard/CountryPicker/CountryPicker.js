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

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

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
      style={{ width: "45%", padding: 20, maxWidth: 300 }}
      fullWidth
      variant="filled"
      size="small"
      onChange={handleChange}
      options={Countries || []}
      autoHighlight
      freeSolo={true}
      value={countryS || []}
      getOptionLabel={(option) => option.country || "Select a country"}
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
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
};

export default CountryPicker;
