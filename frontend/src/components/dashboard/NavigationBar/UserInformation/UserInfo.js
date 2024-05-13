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

import { useState, useRef, useContext } from "react";
import {
  UserAvatar,
  UserMenu,
  UserNav,
  LanguageSwitch,
} from "@catena-x/portal-shared-components";
import UserService from "../../../services/UserService";
import "./UserInfo.scss";
import {
  getLogoutLink,
  getNegotiationLink,
} from "../../../services/EnvironmentService";
import { CompanyUserContext } from "../../../../contexts/companyuser";

export const UserInfo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { companyUser } = useContext(CompanyUserContext);

  const openCloseMenu = () => setMenuOpen((prevVal) => !prevVal);

  const onClickAway = (e) => {
    if (!wrapperRef.current || !wrapperRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  const logoutHref = getLogoutLink();

  // Dynamically construct menu items based on user roles
  let menuItems = [
    {
      href: logoutHref,
      title: "Logout",
    },
  ];

  const cleanedRoles = companyUser.roles.map((role) => role.trim());

  // Add negotiation link for users with Negotiator or Admin roles
  if (
    cleanedRoles.roles.includes("Negotiator") ||
    cleanedRoles.roles.includes("Admin") ||
    cleanedRoles.roles.includes("Company Admin")
  ) {
    menuItems = [
      {
        href: getNegotiationLink(),
        title: "Negotiation",
      },
      ...menuItems,
    ];
  }

  return (
    <div className="UserInfo">
      <div ref={wrapperRef}>
        <UserAvatar onClick={openCloseMenu} />
      </div>
      <UserMenu
        open={menuOpen}
        top={60}
        userName={UserService.getName()}
        userRole={UserService.getCompany()}
        onClickAway={onClickAway}
      >
        <UserNav divider items={menuItems} />
      </UserMenu>
    </div>
  );
};
