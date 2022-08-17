import React, { createContext, useState } from "react";

const RangesContext = createContext({});

const RangesProvider = ({ children, updatedRanges }) => {
  const [ranges, setRanges] = useState(updatedRanges || [0, 3]);

  const updateRanges = (ranges) => {
    setRanges(ranges);
  };
  return (
    <RangesContext.Provider value={{ ranges, updateRanges }}>
      {children}
    </RangesContext.Provider>
  );
};

export { RangesContext, RangesProvider };
