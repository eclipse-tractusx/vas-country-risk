import React, { createContext, useState } from "react";

const GatesContext = createContext({});

const GatesProvider = ({ children, updatedGate }) => {
  const [gates, setGates] = useState(updatedGate || "");

  const updateGate = (gate) => {
    setGates(gate);
  };

  return (
    <GatesContext.Provider value={{ gates, updateGate }}>
      {children}
    </GatesContext.Provider>
  );
};

export { GatesContext, GatesProvider };
