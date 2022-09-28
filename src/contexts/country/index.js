
import React, { createContext, useState } from "react";
import { Country } from "../../components/model/Country";

const CountryContext = createContext({});

const CountryProvider = ({ children, updatedCountry }) => {
  const [countryS, setCountry] = useState("none" || []
  );

  const updateCountry = (country) => {
    setCountry(country);
  };

  return (
    <CountryContext.Provider value={{ countryS, updateCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };