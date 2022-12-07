import React, { createContext, useState } from "react";
import UserService from "../../components/services/UserService";
import { CompanyUser } from "../../components/model/CompanyUser";

const CompanyUserContext = createContext({});

const CompanyUserProvider = ({ children, updatedCompanyUser }) => {
  const [companyUser, setCompanyUser] = useState(
    new CompanyUser(
      UserService.getName(),
      UserService.getEmail(),
      UserService.getCompany(),
      UserService.getRoles() || ["User"],
    ) || []
  );

  const updateCompanyUser = (companyUser) => {
    setCompanyUser(companyUser);
  };

  return (
    <CompanyUserContext.Provider value={{ companyUser, updatedCompanyUser }}>
      {children}
    </CompanyUserContext.Provider>
  );
};

export { CompanyUserContext, CompanyUserProvider };
