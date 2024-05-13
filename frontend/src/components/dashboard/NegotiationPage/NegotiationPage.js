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
import React, { useContext, useState, useEffect } from "react";

import { CompanyUserContext } from "../../../contexts/companyuser";
import "./NegotiationPage.scss"; // Assuming you'll have specific styles
import { Table } from "@catena-x/portal-shared-components";
import { ErrorPage } from "@catena-x/portal-shared-components";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import {
  fetchCatalogItems,
  triggerNegotiation,
} from "../../services/negotiation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const NegotiationPage = () => {
  const { companyUser, setCompanyUser } = useContext(CompanyUserContext);
  const navigate = useNavigate();
  const [catalogItems, setCatalogItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cleanedRoles, setCleanedRoles] = useState([]);

  useEffect(() => {
    // Clean up roles by trimming whitespace
    if (companyUser && companyUser.roles) {
      const cleanedRoles = companyUser.roles.map((role) => role.trim());
      setCleanedRoles(cleanedRoles);
    }
  }, [companyUser]);

  useEffect(() => {
    // Fetch catalog items from the API
    const loadCatalogItems = async () => {
      try {
        const items = await fetchCatalogItems(UserService.getToken());
        setCatalogItems(items);
      } catch (error) {
        console.error("Error fetching catalog items:", error);
      }
    };

    loadCatalogItems();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 2.2,
    },
    {
      field: "provider",
      headerName: "Provider",
      flex: 1,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 2,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        switch (params.value) {
          case "Error":
            return <CancelIcon style={{ color: "red" }} />;
          case "Success":
            return <CheckCircleIcon style={{ color: "green" }} />;
          case "Pending":
            // Optionally, return a spinner or a transparent placeholder
            return null; // For now, do nothing for pending state
          default:
            return null; // For initial state or any unrecognized status
        }
      },
    },
  ];

  const handleInitiateNegotiation = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to negotiate.");
      return;
    }

    // Reset the status of selected items to "Pending" before negotiation
    const resetItems = catalogItems.map((item) => {
      if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
        return { ...item, status: "Pending" }; // Assuming "Pending" means no icon displayed
      }
      return item;
    });
    setCatalogItems(resetItems); // Update state to reflect the reset statuses

    const negotiationRequest = selectedItems.map((item) => ({
      id: item.id,
      offerId: item.offerId,
      usagePurpose: item.usagePurpose,
    }));

    try {
      const response = await triggerNegotiation(
        negotiationRequest,
        UserService.getToken()
      );
      // Update the status of catalog items based on negotiation response
      updateItemStatuses(response);
    } catch (error) {
      console.error("Error initiating negotiation:", error);
      alert("Failed to initiate negotiation.");
    }
  };

  // Utility function to update the status of catalog items based on negotiation response
  const updateItemStatuses = (negotiationResults) => {
    const updatedItems = catalogItems.map((item) => {
      const negotiationResult = negotiationResults.find(
        (result) => result.id === item.id
      );
      if (negotiationResult) {
        return {
          ...item,
          status: negotiationResult.status === "Success" ? "Success" : "Error",
        };
      }
      return item; // Return item unchanged if no negotiation result is found
    });

    setCatalogItems(updatedItems); // Update state with the new items including their statuses
  };

  // Check if the user has permission to initiate negotiations
  const userCanNegotiate =
    cleanedRoles.includes("Negotiator") ||
    cleanedRoles.includes("Admin") ||
    cleanedRoles.includes("Company Admin"); // Adjust the role check as necessary

  return (
    <div className="negotiation-page">
      {userCanNegotiate ? (
        <>
          <h1>Catalog Items Available for Negotiation</h1>
          <div className="table-style">
            <Table
              className="table"
              columns={columns}
              rows={catalogItems}
              rowsCount={catalogItems.length}
              pageSize={catalogItems.length >= 5 ? 5 : catalogItems.length}
              autoHeight={true}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableColumnMenu={true}
              columnHeadersBackgroundColor="rgb(233, 233, 233)"
              onRowSelectionModelChange={(ids) => {
                // Assuming ids are the indexes in the catalogItems array
                const selectedIDs = new Set(ids); // If ids are directly the item IDs, you may not need mapping
                const selectedCatalogItems = catalogItems.filter(
                  (item) => selectedIDs.has(item.id.toString()) // Ensure the comparison works by matching types
                );
                setSelectedItems(selectedCatalogItems);
              }}
              title="Available Items"
              toolbarVariant="basic"
              buttonLabel="Start Negotiation"
              onButtonClick={handleInitiateNegotiation}
              experimentalFeatures={{ newEditingApi: true }}
              hideFooter={catalogItems.length <= 5}
            />
          </div>
        </>
      ) : (
        <ErrorPage
          additionalDescription="Please contact your admin."
          color="gray"
          description="The server encountered an internal error or you are now allowed to see this page."
          header="401 (Unauthorized)"
          homeButtonTitle="Homepage"
          hasNavigation={false}
          onHomeClick={() => {
            window.location.href = navigate("/");
          }}
          onReloadClick={() => {
            navigate("/");
          }}
          reloadButtonTitle="Reload Page"
          title="Oops, Something went wrong."
        />
      )}
    </div>
  );
};

export default NegotiationPage;
