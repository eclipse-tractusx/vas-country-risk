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

import { AboutCard, PageHeader } from "@catena-x/portal-shared-components";
import legalJson from "../../../legal-notice.json";
import { Link } from "@mui/icons-material";
import { Breadcrumb, Typography } from "@catena-x/portal-shared-components";
import { PageBreadcrumb } from "../PageBreadCrumb/PageBreadcrumb";
import "./error.scss";
import { ErrorPage } from "@catena-x/portal-shared-components";
import { FooterPortal } from "../Footer/FooterPortal";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import { getPortalLink } from "../../services/EnvironmentService";
const ErrorPageCR = () => {
  const navigate = useNavigate();

  return (
    <div className="Error">
      <NavigationBar />
      <PageHeader title="Error" topPage={false} headerHeight={200}>

      </PageHeader>
      <ErrorPage
        additionalDescription="Please contact your admin."
        color="gray"
        description="The server encountered an internal error or misconfiguration and was unable to complete your request."
        header="401 (Unauthorized)"
        homeButtonTitle="Homepage"
        hasNavigation={false}
        onHomeClick={() => {
          window.location.href = getPortalLink() + "/appmarketplace";
        }}
        onReloadClick={() => {
          navigate("/");
        }}
        reloadButtonTitle="Reload Page"
        title="Oops, Something went wrong, subscribe to Country Risk App not found."
      />
      <FooterPortal></FooterPortal>
    </div>
  );
};

export default ErrorPageCR;
