
import React, { createContext, useState } from "react";

const CountryContext = createContext({});

const CountryProvider = ({ children, updatedCountry }) => {
  const [countryS, setCountry] = useState("none");

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