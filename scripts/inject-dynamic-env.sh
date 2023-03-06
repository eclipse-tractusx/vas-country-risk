#!/bin/bash
###############################################################
# Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
###############################################################
custom_env_vars_REACT_APP_AUTH_URL='REACT_APP_AUTH_URL:"'$REACT_APP_AUTH_URL'"'
custom_env_vars_REACT_APP_COUNTRY_RISK_API='REACT_APP_COUNTRY_RISK_API:"'$REACT_APP_COUNTRY_RISK_API'"'
custom_env_vars_REACT_APP_PORTAL_FRONTEND='REACT_APP_PORTAL_FRONTEND:"'$REACT_APP_PORTAL_FRONTEND'"'
custom_env_vars_REACT_APP_PORTAL_BACKEND='REACT_APP_PORTAL_BACKEND:"'$REACT_APP_PORTAL_BACKEND'"'

REACT_APP_AUTH_URL_anchor='REACT_APP_AUTH_URL:"http://localhost:8080/auth"'
REACT_APP_COUNTRY_RISK_API_anchor='REACT_APP_COUNTRY_RISK_API:"http://localhost:8080"'
REACT_APP_PORTAL_FRONTEND_anchor='REACT_APP_PORTAL_FRONTEND:"http://localhost:8080"'
REACT_APP_PORTAL_BACKEND_anchor='REACT_APP_PORTAL_BACKEND:"http://localhost:8080"'

index_html_reference=`cat /usr/share/nginx/html/index.html.reference`

index_html=$(sed -r 's%'$REACT_APP_AUTH_URL_anchor'%'$custom_env_vars_REACT_APP_AUTH_URL'%g' <<< "$index_html_reference")
index_html=$(sed -r 's%'$REACT_APP_COUNTRY_RISK_API_anchor'%'$custom_env_vars_REACT_APP_COUNTRY_RISK_API'%g' <<< "$index_html")
index_html=$(sed -r 's%'$REACT_APP_PORTAL_FRONTEND_anchor'%'$custom_env_vars_REACT_APP_PORTAL_FRONTEND'%g' <<< "$index_html")
index_html=$(sed -r 's%'$REACT_APP_PORTAL_BACKEND_anchor'%'$custom_env_vars_REACT_APP_PORTAL_BACKEND'%g' <<< "$index_html")

echo "$index_html"
echo "$index_html" > /usr/share/nginx/html/index.html