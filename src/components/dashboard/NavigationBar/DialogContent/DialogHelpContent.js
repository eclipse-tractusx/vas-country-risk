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
  DialogContent,
  CardHorizontal,
  DialogHeader,
} from "cx-portal-shared-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DialogHelpContent = ({ openDialog }) => {
    
return (
  <div>
    <div className="closeButton">
      <IconButton variant="primary">
        <CloseIcon onClick={openDialog} />
      </IconButton>
    </div>
    <DialogHeader
      title="Country Risk Documentation"
      intro="Here it is possible to find the documentation of how to use this application"
    />
    <DialogContent>
      <ul>
        <div className="BoxHelp">
          <a
            className="Hyperlink"
            href="\helpfiles\PortalToDashboard.pdf"
            download
          >
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Portal To Dashboard"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a
            className="Hyperlink"
            href="\helpfiles\CountryRatingList.pdf"
            download
          >
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Country Rating List"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a className="Hyperlink" href="\helpfiles\WorldMap.pdf" download>
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="World Map"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a className="Hyperlink" href="\helpfiles\CompanyView.pdf" download>
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Company View"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a
            className="Hyperlink"
            href="\helpfiles\BusinessPartnerTable.pdf"
            download
          >
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Business Partner Table"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a className="Hyperlink" href="\helpfiles\Reports.pdf" download>
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Reports"
            />
          </a>
        </div>
        <div className="BoxHelp">
          <a
            className="Hyperlink"
            href="\helpfiles\RatingRangeSetter.pdf"
            download
          >
            <CardHorizontal
              borderRadius={20}
              imageAlt="App Card"
              imagePath=""
              subTitle="Service Category"
              title="Rating Ranges"
            />
          </a>
        </div>
      </ul>
    </DialogContent>
  </div>

)};

export default DialogHelpContent;
