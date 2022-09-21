import React, { useState, useEffect } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getCountryByUser } from "../../../services/countries-api";
import UserService from "../../../services/UserService";

const CountryPicker = () => {

  const [Countries, setCountries] = useState();
  const [country, setcountry] = useState("");

  useEffect(() => {
    getCountryByUser(UserService.getToken()).then((response) => {
      setCountries(response);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setcountry(newValue.country);
    console.log(newValue.country)
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <Autocomplete
      fullWidth variant="filled"
      sx={{ width: 300 }}
      onChange={handleChange}
      options={Countries}
      autoHighlight
      getOptionLabel={(option) => option.country}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-pass', 
          }}
        />
      )}
    />
    </Box>
  );
};

export default CountryPicker;
