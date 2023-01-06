import React, { useContext } from "react";
import "./styles.scss";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { Button } from "cx-portal-shared-components";
import { updateReports, deleteReport } from "../../services/reports-api";
import { deleteRating } from "../../services/ratingstable-api";
import UserService from "../../services/UserService";

const DeleteUpdateComponent = ({ deleteUpdateData, closeDialogsDeleteAndUpdate, closeDialogs }) => {
    
  const { companyUser } = useContext(CompanyUserContext);

  const decideAction = () => {
    if (deleteUpdateData.operation === "Save Changes") {
      closeDialogsAndSave();
    } else if (deleteUpdateData.operation === "Delete Report") {
      closeDialogsAndDelete();
    }
  };

  //Close Dialog and Update Report
  const closeDialogsAndSave = () => {
    updateReports(UserService.getToken(), companyUser, deleteUpdateData.newReport)
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
      <Button
        className="btn-no"
        variant="outlined"
        onClick={closeDialog}
      >
        No
      </Button>
      <Button
        onClick={decideAction}
      >
        Yes
      </Button>
    </div>
  </div>
  );
};

export default DeleteUpdateComponent;
