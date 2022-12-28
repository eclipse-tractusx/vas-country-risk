import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "./styles.scss";
import { MultiSelectList } from "cx-portal-shared-components";
import { getUserFromCompany } from "../../services/company-api";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { Button } from "cx-portal-shared-components";
import UserService from "../../services/UserService";
import { shareReports } from "../../services/reports-api";
import { ReportContext } from "../../../contexts/reports";
import { Report } from "../../model/Report";

const ShareReport = ({ closeDialogs }) => {
  const { companyUser } = useContext(CompanyUserContext);

  const [emailsData, setEmailsData] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const { report, reportValuesContext } = useContext(ReportContext);

  const saveReportForEachPerson = () => {
    selectedItems.forEach((eachPerson) => {
      const newReport = new Report(
        null,
        report.reportName,
        eachPerson.name,
        eachPerson.companyName,
        eachPerson.email,
        "Custom",
        reportValuesContext
      );
      shareReports(UserService.getToken(), companyUser, newReport)
        .then((res) => {
          console.log("success", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    });
    closeDialogs();
  };

  //Get Reports By user
  useEffect(() => {
    getUserFromCompany(UserService.getToken(), companyUser).then((response) => {
      const filterEmailData = response.filter((eachEmail) => {
        if (
          eachEmail.name !== companyUser.name &&
          eachEmail.email !== companyUser.email
        ) {
          eachEmail.title = eachEmail.email;
          eachEmail.id = Date.now();
          return eachEmail;
        }
      });

      setEmailsData(filterEmailData);
    });
  }, []);

  const onItemChange = (item) => {
    setSelectedItems(item);
  };

  const shareReportAction = () => {
    saveReportForEachPerson();
  };

  const closeShareReport = () => {
    closeDialogs();
  };

  return (
    <div className="shareReportComponent">
      <Box className="box-select">
        <MultiSelectList
          className="multibox-select"
          clearText="clear"
          filterOptionsArgs={{}}
          helperText="Helper"
          keyTitle="email"
          items={emailsData}
          label="Share Report"
          margin="dense"
          noOptionsText="No Options"
          notItemsText="not items selected"
          onAddItem={onItemChange}
          placeholder="Enter Person email (type min 2 character)"
          tagSize="medium"
          variant="filled"
          popperHeight={0}
        />

        <div className="btn-div">
          <Button className="btn-close" onClick={closeShareReport}>
            Close
          </Button>
          <Button className="btn-save" onClick={shareReportAction}>
            Share
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ShareReport;
