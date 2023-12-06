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

import { Breadcrumb, Typography } from "@catena-x/portal-shared-components";
import { Link } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./styles.scss";

function isParamsEmpty(params) {
  for (const param in params) {
    if (param) return false;
  }
  return true;
}

export const PageBreadcrumb = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    const pathNames = location.pathname.split("/");
    pathNames.forEach((value, index) => {
      if (value === "") {
        pathNames.splice(index, 1);
      }
    });

    // no need to add params to breadcrumbs:
    if (!isParamsEmpty(params)) {
      pathNames.splice(pathNames.length - 1, 1);
    }
    setCrumbs(pathNames);
  }, [location, params]);

  const getCrumbTitle = (crumb) => {
    return "About";
  };

  const breadcrumbs = () => {
    return crumbs.map((item, index) => {
      const count = crumbs.length - 1;
      const navigatePage = count - index;
      if (index === count) {
        // last item in breadcrumb has no navigation
        return (
          <Typography key={index} sx={{ fontSize: "14px" }}>
            {getCrumbTitle(item)}
          </Typography>
        );
      } else {
        // other items in breadcrumbs have navigation
        return (
          <Link
            underline="hover"
            key={index}
            color="inherit"
            sx={{
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: index === 0 ? "bold" : "",
            }}
            onClick={() => {
              navigate(-navigatePage);
            }}
          >
            <p style={{ marginTop: "3px !important" }}>{getCrumbTitle(item)}</p>
          </Link>
        );
      }
    });
  };

  return (
    <Breadcrumb
      backButtonLabel={"Back"}
      backButtonVariant="outlined"
      onBackButtonClick={() => {
        navigate(-1);
      }}
      breadcrumbs={breadcrumbs()}
      className="CustomBreadcrumb"
    />
  );
};
