import React, { createContext, useEffect, useState, useContext } from "react";
import { CompanyUserContext } from "../companyuser";
import { getReportValuesByReport } from "../../components/services/reports-api";
import UserService from "../../components/services/UserService";

const ReportContext = createContext({});

const ReportProvider = ({ children, updatedReport }) => {
  const [reportValuesContext, setReportValuesContext] = useState(
    updatedReport || []
  );

  const { companyUser } = useContext(CompanyUserContext);

  const [report, setReport] = useState("");

  useEffect(() => {
    getReportValuesByReport(UserService.getToken(), report, companyUser).then(
      (response) => {
        setReportValuesContext(response);
      }
    );
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
