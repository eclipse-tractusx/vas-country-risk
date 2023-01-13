import React, { useState, useContext, useEffect, useRef } from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import { Table, Button, IconButton } from "cx-portal-shared-components";
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
  const [severityMessage, setSeverityMessage] = useState("");

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
        updateReload(!reload);
        if (code.status === 204) {
          setOpenAlert(true);
          setSeverityDelete("success");
          setSeverityMessageDelete("Rating delete sucessfully!");
        }
      })
      .catch((err) => {
        if (err.response.data.status === 401) {
          setOpenAlert(true);
          setSeverityDelete("error");
          setSeverityMessageDelete(
            "You do not have the permission to deleted this rating!"
          );
        }
        if (err.response.data.status === 500) {
          setOpenAlert(true);
          setSeverityDelete("error");
          setSeverityMessageDelete("Wrong Request Type!");
        }
      });
    setOpenWarning(!openWarning);
    timerFunction();
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
        className="rating-table-content"
        columns={columnsUser(rates, onClickDelete)}
        rows={tableRatings}
        rowsCount={tableRatings.length}
        pageSize={5}
        rowHeight={50}
        headerHeight={40}
        autoHeight={true}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu={true}
        selectionModel={prefixIds.map((r) => r.id)}
        experimentalFeatures={{ newEditingApi: true }}
        isCellEditable={handleEdit} // this works
        onEditCellPropsChange={onEditCellPropsChange} // this works
        onCellEditCommit={validateInput}
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const selectedRows = tableRatings.filter((row) =>
            selectedIds.has(row.id)
          );
          //pass ratings selected to top component
          selectedRows.open = prefixIds.open;
          setRatings(selectedRows);
          updatePrefixIds(selectedRows);
        }}
        toolbar={{
          buttonLabel: "Show Ratings",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        hideFooter={tableRatings.length > 5 ? false : true}
      ></Table>
      <Alert severity={severity}>
        <span>{severityMessage}</span>
      </Alert>

      <Dialog
        className="warning"
        aria-labelledby="customized-dialog-title"
        open={openWarning}
        onClose={openWarn}
      >
        <div className="Dialog-Expand-Div">
          <div>
            <h2>Do you want to delete this Rating?</h2>
          </div>
          <div className="warning-header">
            <Button variant="outlined" className="btn-no" onClick={openWarn}>
              No
            </Button>
            <Button
              onClick={closeDialogsAndDelete}
              //disabled={validateSave}
            >
              Yes
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        className="dialog-table-expand-style"
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <div className="closeButton">
          <IconButton variant="primary">
            <CloseIcon onClick={ExpandTable} />
          </IconButton>
        </div>
        <div className="header">
          <h2>Ratings table</h2>
          <p>
            In this it is possible to see the ratings. They can be selected one
            at a time or all at the same time.
          </p>
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
            checkboxSelection
            disableColumnMenu={true}
            selectionModel={prefixIds.map((r) => r.id)}
            experimentalFeatures={{ newEditingApi: true }}
            isCellEditable={handleEdit} // this works
            onEditCellPropsChange={onEditCellPropsChange} // this works
            onSelectionModelChange={(ids) => {
              const selectedIds = new Set(ids);
              const selectedRows = tableRatings.filter((row) =>
                selectedIds.has(row.id)
              );
              //pass ratings selected to top component
              selectedRows.open = prefixIds.open;
              setRatings(selectedRows);
              updatePrefixIds(selectedRows);
            }}
            toolbar={{
              title: "Ratings",
            }}
            hideFooter={tableRatings.length > 5 ? false : true}
          ></Table>
          <div className="closeBtnDialog">
            <Button className="btn-close-dialog" onClick={ExpandTable}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Ratings;
