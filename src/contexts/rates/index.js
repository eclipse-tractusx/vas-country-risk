import React, { createContext, useState } from "react";

const RatesContext = createContext({});

const RatesProvider = ({ children, updatedRates }) => {
  const [prefixIds, setPrefixIds] = useState(updatedRates || []);

  const updatePrefixIds = (prefixIds) => {
    setPrefixIds(prefixIds);
  };

  return (
    <RatesContext.Provider value={{ prefixIds, updatePrefixIds }}>
      {children}
    </RatesContext.Provider>
  );
};

export { RatesContext, RatesProvider };
