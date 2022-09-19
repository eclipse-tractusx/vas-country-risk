import React, { createContext, useState } from "react";

const CompanyUserContext = createContext({});

const CompanyUserProvider = ({ children, updatedCompanyUser }) => {
  const [companyUser, setCompanyUser] = useState(updatedCompanyUser || []);

  const updateCompanyUser = (companyUser) => {
    setCompanyUser(companyUser);
  };

  return (
    <CompanyUserContext.Provider value={{ companyUser, updateCompanyUser }}>
      {children}
    </CompanyUserContext.Provider>
  );
};

export { CompanyUserContext, CompanyUserProvider };