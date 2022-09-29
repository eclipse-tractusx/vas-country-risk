import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getCountryByUser } from "../../../services/countries-api";
import UserService from "../../../services/UserService";
import { CountryContext } from "../../../../contexts/country";
import { CompanyUserContext } from "../../../../contexts/companyuser";

const CountryPicker = () => {

  const [Countries, setCountries] = useState();

  const { countryS, updateCountry } = useContext(CountryContext);

  const [def, setDef] = useState(null);

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  useEffect(() => {
    getCountryByUser(UserService.getToken(), companyUser).then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if(countryS == "none"){
      setDef(null);
    } else {
      setDef(countryS);
    }
  }, [countryS]);

  const handleChange = (event, newValue) => {
    if(newValue == null){
      updateCountry("none")
    } else {
      updateCountry(newValue)
    }
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <Autocomplete
      fullWidth variant="filled"
      sx={{ width: 300 }}
      onChange={handleChange}
      options={Countries}
      autoHighlight
      value={def}
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

        />
      )}
    />


    </Box>
  );
};

export default CountryPicker;
