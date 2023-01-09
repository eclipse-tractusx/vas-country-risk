import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "./styles.scss";
import { MultiSelectList } from "cx-portal-shared-components";
import { getUserFromCompany } from "../../services/company-api";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { Button } from "cx-portal-shared-components";
import UserService from "../../services/UserService";

import { Dialog } from "cx-portal-shared-components";
import DeleteUpdateComponent from "../DeleteUpdateComponent/DeleteUpdateComponent";

const ShareReport = ({ closeDialogs, closeDialogsDeleteAndUpdate }) => {
  const { companyUser } = useContext(CompanyUserContext);

  const [emailsData, setEmailsData] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

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

  const [openWarning, setOpenWarning] = useState(false);
  const shareReportAction = () => {
    selectedItems.operation = "Share Report";
    selectedItems.doubleCheckMessage = "Do you want to share this Report?";
    setOpenWarning(true);
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
      <Dialog
        className="share-double-check-warning"
        aria-labelledby="customized-dialog-title"
        open={openWarning}
        onClose={closeDialogs}
      >
        <DeleteUpdateComponent
          deleteUpdateData={selectedItems}
          closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
          closeDialogs={closeDialogs}
        />
      </Dialog>
    </div>
  );
};

export default ShareReport;
