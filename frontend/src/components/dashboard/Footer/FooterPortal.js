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

import { useEffect, useState } from "react";
import { Navigation, IconButton } from "@catena-x/portal-shared-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import footerHeadImage from "./orange-background-head.svg";

export const FooterPortal = () => {
  const { t } = useTranslation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    setShowScrollToTop(window.pageYOffset > 350);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility); // Clean up the event listener
  }, []);

  // Define your navigation items here
  const navItems = [
    { to: "/", content: t("navigation.help"), title: "Help" },
    { to: "/contact", content: t("navigation.contact"), title: "Contact" },
    { to: "/imprint", content: t("navigation.imprint"), title: "Imprint" },
    { to: "/privacy", content: t("navigation.privacy"), title: "Privacy" },
    { to: "/terms", content: t("navigation.terms"), title: "Terms of Service" },
    { to: "/cookies", content: t("navigation.cookies"), title: "Cookies" },
    { to: "/about", content: t("navigation.about"), title: "About" },
  ];

  return (
    <footer>
      {showScrollToTop && (
        <IconButton
          color="secondary"
          onClick={scrollToTop}
          sx={{ position: "absolute", right: "40px", top: "2px" }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
      <img
        src={footerHeadImage}
        alt="orange background"
        className="footer-head"
      />
      <div className="footer-content">
        <Navigation unstyled items={navItems} component={NavLink} />
        <div></div>
        <span className="copyright">
          Copyright © Catena-X Automotive Network
        </span>
      </div>
    </footer>
  );
};
