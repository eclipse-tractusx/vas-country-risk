import React, { createContext, useState } from "react";

const ReportContext = createContext({});

const ReportProvider = ({ children, updatedReport }) => {
  const [report, setReport] = useState("none");

  const updateReport = (report) => {
    setReport(report);
  };

  return (
    <ReportContext.Provider value={{ report, updateReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext, ReportProvider };
