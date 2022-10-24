import React, { createContext, useEffect, useState } from "react";
import { getReportValuesByReport } from "../../components/services/reports-api";
import UserService from "../../components/services/UserService";
const ReportContext = createContext({});

const ReportProvider = ({ children, updatedReport }) => {
  const [reportValuesContext, setReportValuesContext] = useState(
    updatedReport || []
  );

  const [report, setReport] = useState("");

  useEffect(() => {
    getReportValuesByReport(UserService.getToken(), report).then((response) => {
      setReportValuesContext(response);
    });
  }, [report]);

  const updateReport = (report) => {
    setReport(report);
  };

  return (
    <ReportContext.Provider value={{ reportValuesContext, updateReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export { ReportContext, ReportProvider };
