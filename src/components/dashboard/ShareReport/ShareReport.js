/********************************************************************************
 * Copyright (c) 2022,2023 BMW Group AG
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "./styles.scss";
import {
  MultiSelectList,
  DialogActions,
  DialogContent,
  DialogHeader,
} from "cx-portal-shared-components";
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
        <DialogHeader
        className="dialogHeader" 
        title="Share an Report"
        intro="Select here the persons which to share the reports"/>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-close"
            variant="outlined"
            onClick={closeShareReport}
          >
            Close
          </Button>
          <Button className="btn-save" onClick={shareReportAction}>
            Share
          </Button>
        </DialogActions>
      </Box>
      <Dialog
        className="share-double-check-warning"
        aria-labelledby="customized-dialog-title"
        open={openWarning}
        onClose={closeDialogs}
      >
        <div className="Teste">
          {" "}
          <DeleteUpdateComponent
            deleteUpdateData={selectedItems}
            closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
            closeDialogs={closeDialogs}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ShareReport;
