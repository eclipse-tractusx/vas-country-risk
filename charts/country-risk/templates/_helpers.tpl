{{/*
********************************************************************************
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
*******************************************************************************
*/}}


{/*
Expand the name of the chart.
*/}}
{{- define "vas.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name with '-frontend' suffix.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name, it will be used as a full name, with '-frontend' appended.
*/}}
{{- define "vas.frontend.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- printf "%s-frontend" .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- $fullName := "" }}
{{- if contains $name .Release.Name }}
    {{- $fullName = printf "%s-frontend" .Release.Name }}
{{- else }}
    {{- $fullName = printf "%s-%s-frontend" .Release.Name $name }}
{{- end }}
{{- $fullName | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}


{{/*
Create a default fully qualified app name with '-backend' suffix.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name, it will be used as a full name, with '-frontend' appended.
*/}}
{{- define "vas.backend.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- printf "%s-backend" .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- $fullName := "" }}
{{- if contains $name .Release.Name }}
    {{- $fullName = printf "%s-backend" .Release.Name }}
{{- else }}
    {{- $fullName = printf "%s-%s-backend" .Release.Name $name }}
{{- end }}
{{- $fullName | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}



{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "vas.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "vas.backend.labels" -}}
helm.sh/chart: {{ include "vas.chart" . }}
{{ include "vas.backend.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "vas.frontend.labels" -}}
helm.sh/chart: {{ include "vas.chart" . }}
{{ include "vas.frontend.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "vas.frontend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "vas.frontend.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "vas.backend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "vas.backend.fullname" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create name of application secret
*/}}
{{- define "vas.applicationSecret.name" -}}
{{- printf "%s-application" (include "vas.backend.fullname" .) }}
{{- end }}


{{- define "vas.postgres.name" -}}
{{- printf "%s-postgres" .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}



{{/*
Invoke include on given definition with elastic dependency context
Usage: include "includeWithElasticContext" (list root "your_include_function_here")
*/}}
{{- define "includeWithElasticContext" -}}
{{- $ := index . 0 }}
{{- $function := index . 1 }}
{{- include $function (dict "Values" $.Values.elastic "Chart" (dict "Name" "elastic") "Release" $.Release) }}
{{- end }}





