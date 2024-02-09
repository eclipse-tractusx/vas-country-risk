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
import {
  MainNavigation,
  Logo,
  DialogHeader,
  DialogContent,
  DialogActions,
  CardHorizontal,
} from "cx-portal-shared-components";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoSVG from "../../../resources/cxlogo.svg";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { getPortalLink } from "../../services/EnvironmentService";
import Dialog from "@mui/material/Dialog";
import "./styles.scss";
import CloseIcon from "@mui/icons-material/Close";
import { UserInfo } from "./UserInformation/UserInfo";
import DialogHelpContent from "./DialogContent/DialogHelpContent";

const NavigationBar = () => {
  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Dialog
        className="Dialog-Help"
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <DialogHelpContent openDialog={openDialog} />
      </Dialog>

      <MainNavigation
        items={[
          {
            title: "Country Risk Dashboard",
            href: "/",
          },
        ]}
      >
        <a className="Hyperlink" href={getPortalLink()}>
          <Box className="logosvg" component="img" src={LogoSVG} />
        </a>
        <div className="user-btn">
          <div className="btnHelp">
            <Button
              color="secondary"
              size="small"
              onClick={openDialog}
              variant="contained"
            >
              Help
            </Button>
          </div>
          <UserInfo />
        </div>
      </MainNavigation>
    </div>
  );
};

export default NavigationBar;
