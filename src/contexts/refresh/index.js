import React, { createContext, useState } from "react";

const ReloadContext = createContext({});

const ReloadProvider = ({ children }) => {
  const [reload, setReload] = useState(false);

  const updateReload = (newValue) => {
    setReload(newValue);
  };

  return (
    <ReloadContext.Provider value={{ reload, updateReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export { ReloadContext, ReloadProvider };
