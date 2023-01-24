import React, { useContext } from "react";
import "./styles.scss";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { Button } from "cx-portal-shared-components";
import { updateReports, deleteReport } from "../../services/reports-api";
import UserService from "../../services/UserService";
import { Report } from "../../model/Report";
import { ReportContext } from "../../../contexts/reports";
import { shareReports } from "../../services/reports-api";


const DeleteUpdateComponent = ({
  deleteUpdateData,
  closeDialogsDeleteAndUpdate,
  closeDialogs,
}) => {
  const { companyUser } = useContext(CompanyUserContext);

  const { report, reportValuesContext } = useContext(ReportContext);

  const decideAction = () => {
    if (deleteUpdateData.operation === "Save Changes") {
      closeDialogsAndSave();
    } else if (deleteUpdateData.operation === "Delete Report") {
      closeDialogsAndDelete();
    } else if (deleteUpdateData.operation === "Share Report") {
      closeDialogsAndShare();
    }
  };

  const closeDialogsAndShare = () => {

    deleteUpdateData.forEach((eachPerson) => {
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
          closeDialogsDeleteAndUpdate(
            res,
            "Report Shared sucessfully!",
            "You do not have the permission to share this report!"
          );
        })
        .catch((err) => {
          closeDialogsDeleteAndUpdate(
            err.response.data.status,
            "Report Shared sucessfully!",
            "You do not have the permission to share this report!"
          );
        });
    });
  };

  //Close Dialog and Update Report
  const closeDialogsAndSave = () => {
    updateReports(
      UserService.getToken(),
      companyUser,
      deleteUpdateData.newReport
    )
      .then((res) => {
        closeDialogsDeleteAndUpdate(
          res,
          "Report changed sucessfully!",
          "You do not have the permission to change this report!"
        );
      })
      .catch((err) => {
        closeDialogsDeleteAndUpdate(
          err.response.data.status,
          "Report changed sucessfully!",
          "You do not have the permission to change this report!"
        );
      });
  };

  //Function to call the DELETE Report API
  const closeDialogsAndDelete = () => {
    deleteReport(UserService.getToken(), companyUser, deleteUpdateData.id)
      .then((code) => {
        closeDialogsDeleteAndUpdate(
          code,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      })
      .catch((err) => {
        closeDialogsDeleteAndUpdate(
          err.response.data.status,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      });
  };

  const closeDialog = () => {
    closeDialogs();
  };

  return (
    <div className="Dialog-Expand-Div">
      <h2>{deleteUpdateData.operation}</h2>
      <div>
        <h3>{deleteUpdateData.doubleCheckMessage}</h3>
      </div>
      <div className="warning-header">
        <Button className="btn-no" variant="outlined" onClick={closeDialog}>
          No
        </Button>
        <Button data-testid="btnYes" onClick={decideAction}>Yes</Button>
      </div>
    </div>
  );
};

export default DeleteUpdateComponent;
