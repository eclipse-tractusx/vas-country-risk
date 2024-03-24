/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
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
import React, { useState, useContext, useEffect, useRef } from "react";
import "./styles.scss";

import {
  Table,
  Button,
  IconButton,
  DialogHeader,
  DialogContent,
  DialogActions,
  Dialog,
  PageSnackbar,
} from "@catena-x/portal-shared-components";

import Alert from "@mui/material/Alert";
import { RatesContext } from "../../../contexts/rates";
import {
  getRatingsByYear,
  deleteRating,
} from "../../services/ratingstable-api";
import { columnsUser } from "./ratingUserColumns";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { ReloadContext } from "../../../contexts/refresh";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

const Ratings = ({
  passAutomaticWeightChange,
  passValuesFromComponent,
  years,
}) => {
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);
  const [automatic, setAutomatic] = useState(true);

  //Upload Button Handlers
  const [open, setOpen] = useState(false);

  const [tableRatings, setTableRatings] = useState([]);

  const [rates, setRatings] = useState([]);

  const { reload, updateReload } = useContext(ReloadContext);

  const [sumTotalEffect, setSumTotalEffect] = useState(-1);

  const [severity, setSeverity] = useState("");
  const [setSeverityMessage] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarMessageTitle, setSnackBarMessageTitle] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  //Delete Warning
  const [severityDelete, setSeverityDelete] = useState("");
  const [severityMessageDelete, setSeverityMessageDelete] = useState("");

  let sumTotal = 0;

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const { reportValuesContext } = useContext(ReportContext);

  //Warning Dialog
  const [openWarning, setOpenWarning] = useState(false);

  //Delete Boolean
  const [deleteID, setDeleteID] = useState(0);

  //Open Error/Success Dialog
  const [openAlert, setOpenAlert] = React.useState(false);

  //Gets Current Roles for the User
  const role = companyUser.roles;

  const [timer, setTimer] = React.useState(0);

  useEffect(() => {
    const reportRates = Array.isArray(reportValuesContext)
      ? reportValuesContext.filter((r) => r.name === "Ratings")
      : [];
    updatePrefixIds(reportRates.length ? reportRates[0].objectValue : []);
    setRatings(reportRates.length ? reportRates[0].objectValue : []);
  }, [reportValuesContext]);

  const openDialog = () => {
    setOpen(!open);
    if (openAlert === true) {
      setOpenAlert(!open);
      hideAlert();
    }
  };

  const openWarn = () => {
    setOpenWarning(!openWarning);
  };

  const ExpandTable = () => {
    openDialog();
    prefixIds.open = !prefixIds.open;
  };

  const fetchData = () => {
    getRatingsByYear("", UserService.getToken(), companyUser).then((response) =>
      setTableRatings(response)
    );
  };

  useEffect(() => {
    getRatingsByYear(years, UserService.getToken(), companyUser).then(
      (response) => setTableRatings(response)
    );
  }, [years, reload]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (automatic) {
      let totalWeight = rates.length > 0 ? 100 / rates.length : 0;
      totalWeight = Number(totalWeight.toFixed(2));
      if (Array.isArray(rates)) {
        rates.forEach((each) => {
          each.weight = totalWeight;
        });
      }
    }
  }, [updatePrefixIds]);

  const onEditCellPropsChange = (params) => {
    setSeverity("");
    setSeverityMessage("");
    setSumTotalEffect(0);
    rates.forEach((eachRating) => {
      if (eachRating.id === params.id) {
        eachRating.weight = params.props.value;
      }
    });
    setAutomatic(false);
  };

  const validateInput = (params) => {
    sumTotal = 0;
    if (params.value <= 100 && params.value >= 0 && !isNaN(params.value)) {
      rates.forEach((eachRating) => {
        sumTotal = Number(sumTotal) + Number(eachRating.weight);
      });
      if (sumTotal === 100) {
        setSumTotalEffect(sumTotal);
      } else {
        setSeverity("error");
        setSeverityMessage("Total weight must be 100");
      }
    } else {
      setSeverity("error");
      setSeverityMessage("Value must be between 0-100");
    }
  };

  const handleEdit = (params) => {
    return rates.find((each) => each.id === params.id);
  };

  useEffect(() => {
    if (rates.length === 0) {
      setAutomatic(true);
      setSumTotalEffect(-1);
    }
  }, [rates]);

  useEffect(() => {
    passValuesFromComponent(rates);
  }, [rates]);

  useEffect(() => {
    passAutomaticWeightChange(sumTotalEffect);
  }, [sumTotalEffect]);

  const closeDialogsAndDelete = () => {
    deleteRating(UserService.getToken(), companyUser, deleteID)
      .then((code) => {
        setOpenSnackBar(true);
        updateReload(!reload);
        if (code.status === 204) {
          setSnackBarMessageTitle("Success");
          setSnackBarMessage("Rating delete sucessfully!");
          setSeverity("success");
        }
      })
      .catch((err) => {
        setOpenSnackBar(true);
        if (err.response.data.status === 401) {
          setSnackBarMessageTitle("Error");
          setSnackBarMessage(
            "You do not have the permission to deleted this rating!"
          );
          setSeverity("error");
        }
        if (err.response.data.status === 500) {
          setSnackBarMessageTitle("Error");
          setSnackBarMessage("Wrong Request Type!");
          setSeverity("error");
        }
      });
    setOpenSnackBar(false);
    setOpenWarning(!openWarning);
  };

  const hideAlert = () => {
    setSeverityDelete("");
    setSeverityMessageDelete("");
    setOpenAlert(!openAlert);
  };

  const onClickDelete = (id) => () => {
    setDeleteID(id);
    setOpenWarning(true);
  };

  const timerFunction = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        setSeverityDelete("");
        setSeverityMessageDelete("");
        setOpenAlert(false);
      }, 4000)
    );
  };

  return (
    <div className="rating-table">
      <div className="alertDialog">
        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={hideAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={severityDelete}
          >
            <span>{severityMessageDelete}</span>
          </Alert>
        </Collapse>
      </div>
      <Table
        onButtonClick={ExpandTable}
        className="rating-table-content"
        columns={columnsUser(rates, onClickDelete)}
        rows={tableRatings}
        rowsCount={tableRatings.length}
        checkboxSelection
        columnHeadersBackgroundColor="rgb(233, 233, 233)"
        pagination={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        rowHeight={50}
        headerHeight={40}
        onRowSelectionModelChange={(ids) => {
          // Updated selection model change handler
          const selectedIds = new Set(ids);
          const selectedRows = tableRatings.filter((row) =>
            selectedIds.has(row.id)
          );

          selectedRows.open = prefixIds.open;
          setRatings(selectedRows);
          updatePrefixIds(selectedRows);
        }}
        buttonLabel="Show More Ratings"
        title="Ratings"
        toolbarVariant="basic"
        experimentalFeatures={{ newEditingApi: true }}
        isCellEditable={handleEdit}
        onEditCellPropsChange={onEditCellPropsChange}
        onCellEditCommit={validateInput}
        hideFooter={tableRatings.length <= 5}
      />

      <Dialog
        className="warning"
        aria-labelledby="customized-dialog-title"
        open={openWarning}
        onClose={openWarn}
        maxWidth="md"
      >
        <div className="Dialog-Expand-Div">
          <DialogHeader
            title="Delete Rating"
            intro="Do you want to delete this Rating?"
          />
          <DialogActions>
            <Button
              variant="outlined"
              data-testid="btnNoRating"
              className="btn-no"
              onClick={openWarn}
            >
              No
            </Button>
            <Button
              data-testid="btnYesRating"
              onClick={closeDialogsAndDelete}
              //disabled={validateSave}
            >
              Yes
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        className="dialog-table-expand-style"
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
        maxWidth="md"
      >
        <div className="closeButton">
          <IconButton variant="primary">
            <CloseIcon onClick={ExpandTable} />
          </IconButton>
        </div>
        <div className="header">
          <DialogHeader
            title="Ratings table"
            intro="In this it is possible to see the ratings. They can be selected one
          at a time or all at the same time."
          />
        </div>
        <div className="rating-div-table-expand-style">
          <Table
            className="table-expand-style"
            columns={columnsUser(rates, onClickDelete)}
            rows={tableRatings}
            rowsCount={tableRatings.length}
            pageSize={tableRatings.length >= 10 ? 10 : tableRatings.length}
            rowHeight={50}
            headerHeight={40}
            autoHeight={true}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableColumnMenu={true}
            columnHeadersBackgroundColor="rgb(233, 233, 233)"
            onRowSelectionModelChange={(ids) => {
              // Updated to the latest selection model event handler name
              const selectedIds = new Set(ids);
              const selectedRows = tableRatings.filter((row) =>
                selectedIds.has(row.id)
              );
              selectedRows.open = prefixIds.open;
              setRatings(selectedRows);
              updatePrefixIds(selectedRows);
            }}
            title="Ratings"
            toolbarVariant="basic"
            experimentalFeatures={{ newEditingApi: true }}
            isCellEditable={handleEdit}
            onEditCellPropsChange={onEditCellPropsChange}
            hideFooter={tableRatings.length <= 5}
          />

          <DialogActions>
            <Button
              variant="outlined"
              className="btn-close-dialog"
              data-testid="closeDialog"
              onClick={ExpandTable}
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <PageSnackbar
        autoClose={true}
        open={openSnackBar}
        severity={severity}
        title={snackBarMessageTitle}
        description={snackBarMessage}
        showIcon={true}
      ></PageSnackbar>
    </div>
  );
};

export default Ratings;
