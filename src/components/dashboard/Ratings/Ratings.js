import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import { Table, Alert } from "cx-portal-shared-components";
import { RatesContext } from "../../../contexts/rates";
import { getRatingsByYear } from "../../services/ratingstable-api";
import { columns } from "./ratingColumns";

const Ratings = ({ passValuesFromComponent, years }) => {
  const [automatic, setAutomatic] = useState(true);

  //Upload Button Handlers
  const [open, setOpen] = useState(false);

  const [tableRatings, setTableRatings] = useState([]);

  const [rates, setRatings] = useState([]);

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const openDialog = () => {
    setOpen(!open);
  };

  const ExpandTable = () => {
    openDialog(false);
    prefixIds.open = !prefixIds.open;
  };

  const fetchData = () => {
    getRatingsByYear().then((response) => setTableRatings(response));
  };

  useEffect(() => {
    getRatingsByYear(years).then((response) => setTableRatings(response));
  }, [years]);

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
      //console.log(rates);
    }
  }, [updatePrefixIds]);

  const onEditCellPropsChange = (params) => {
    rates.forEach((eachRating) => {
      if (eachRating.id === params.id) {
        eachRating.weight = params.props.value;
        params.props.value = 0;
      }
    });
    setAutomatic(false);
  };

  const handleEdit = (params) => {
    return rates.find((each) => each.id === params.id);
  };

  useEffect(() => {
    if (rates.length === 0) {
      setAutomatic(true);
    }
  }, [rates]);

  useEffect(() => {
    passValuesFromComponent(rates);
  }, [rates]);

  return (
    <div className="rating-table">
      <Table
        className="rating-table-content"
        //setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
        columns={columns(rates)}
        rows={tableRatings}
        rowsCount={tableRatings.length}
        pageSize={5}
        rowHeight={50}
        headerHeight={40}
        autoHeight={true}
        checkboxSelection
        disableSelectionOnClick
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
          buttonLabel: open ? "Close Ratings" : "Show Ratings",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        hideFooter={tableRatings.length > 5 ? false : true}
      ></Table>
      {/* <Alert severity={"info"}>
        <span>asdasd</span>
      </Alert> */}

      <Dialog
        className="dialog-table-expand-style"
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <div className="rating-div-table-expand-style">
          <Table
            className="table-expand-style"
            setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
            columns={columns(tableRatings)}
            rows={tableRatings}
            rowsCount={tableRatings.length}
            pageSize={tableRatings.length >= 10 ? 10 : tableRatings.length}
            rowHeight={50}
            headerHeight={40}
            autoHeight={true}
            checkboxSelection
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
              buttonLabel: open ? "Close Ratings" : "Show Ratings",
              onButtonClick: ExpandTable,
              title: "Ratings",
            }}
            hideFooter={tableRatings.length > 5 ? false : true}
          ></Table>
        </div>
      </Dialog>
    </div>
  );
};

export default Ratings;
