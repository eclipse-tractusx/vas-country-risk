import React, { useState, useContext, useEffect, useCallback } from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import { Table, Alert, Button, IconButton } from "cx-portal-shared-components";
import { RatesContext } from "../../../contexts/rates";
import {
  getRatingsByYear,
  deleteRating,
} from "../../services/ratingstable-api";
import { columns } from "./ratingColumns";
import { columnsUser } from "./ratingUserColumns";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { ReloadContext } from "../../../contexts/refresh";
import CloseIcon from "@mui/icons-material/Close";

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

  let sumTotal = 0;

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const { reportValuesContext, updateReport } = useContext(ReportContext);

  //Gets Current Roles for the User
  const role = companyUser.roles;

  useEffect(() => {
    const reportRates = Array.isArray(reportValuesContext)
      ? reportValuesContext.filter((r) => r.name === "Ratings")
      : [];
    updatePrefixIds(reportRates.length ? reportRates[0].objectValue : []);
    setRatings(reportRates.length ? reportRates[0].objectValue : []);
  }, [reportValuesContext]);

  const openDialog = () => {
    setOpen(!open);
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

  //Change Edit/Delete Buttons based on Role
  const onRoleChangeButtons = (rates) => {
    return role.includes("Company Admin")
      ? columnsUser(rates)
      : columnsUser(rates);
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

  const onClickDelete = (id) => () => {
    console.log(id, "delete");
    deleteRating(UserService.getToken(), companyUser, id)
      .then((status) => updateReload(!reload))
      .catch((err) => console.log(err.response.data.error));
  };

  return (
    <div className="rating-table">
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
          buttonLabel: open ? "Close Ratings" : "Show Ratings",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        hideFooter={tableRatings.length > 5 ? false : true}
      ></Table>
      <Alert severity={severity}>
        <span>{severityMessage}</span>
      </Alert>

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
            <Button style={{ margin: "1%" }} onClick={ExpandTable}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Ratings;
