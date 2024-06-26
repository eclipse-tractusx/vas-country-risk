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
package org.eclipse.tractusx.valueaddedservice.service.logic;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.tractusx.valueaddedservice.config.EdcProperties;
import org.eclipse.tractusx.valueaddedservice.dto.edc.CatalogItemDTO;
import org.eclipse.tractusx.valueaddedservice.dto.edc.NegotiationResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
@Slf4j
public class EdcLogicService {

    @Autowired
    private InvokeService invokeService;

    @Value("${application.bpdm.consumerManagementUrl}")
    private String consumerManagementUrl;

    @Value("${application.bpdm.gateProviderProtocolUrl}")
    private String gateProviderProtocolUrl;

    @Value("${application.bpdm.apiKey}")
    private String apiKey;

    @Value("${application.bpdm.gateProviderId}")
    private String gateProviderId;

    @Autowired
    private EdcProperties edcProperties;

    @Autowired
    ObjectMapper objectMapper;


    public Mono<String> sendFinalRequest(NegotiationResponseDTO edrResponse, Object body,String path) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", edrResponse.getAuthCode());
        return executePostRequest(edrResponse.getEndpoint()+path, body, headers, response -> response);
    }


    public List<CatalogItemDTO> queryCatalog() {
        HttpHeaders headers = createHttpHeaders();
        Map<String, Object> requestBody = createCatalogRequestBody();
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);

        log.debug("Sending POST request to URL: " + consumerManagementUrl + "/v2/catalog/request/");
        log.debug("Request Headers: " + headers);
        log.debug("Request Body: " + requestBody);


        return invokeService.executeRequest("default", consumerManagementUrl + "/v2/catalog/request/", HttpMethod.POST, httpEntity, this::mapResponseFromQueryCatalog).block();
    }

    // Helper methods
    private <T> Mono<T> executePostRequest(String url, Object body, HttpHeaders headers, Function<String, T> responseMapper) {
        HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
        return invokeService.executeRequest("default", url, HttpMethod.POST, httpEntity, responseMapper);
    }

    private HttpHeaders createHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Api-Key", apiKey);
        return headers;
    }

    private Map<String, Object> createCatalogRequestBody() {
        Map<String, Object> requestBody = new HashMap<>();

        // Definindo @context
        Map<String, String> context = new HashMap<>();
        context.put("@vocab", "https://w3id.org/edc/v0.0.1/ns/");
        requestBody.put("@context", context);

        // Adicionando @type
        requestBody.put("@type", "CatalogRequest");

        // Adicionando counterPartyAddress e counterPartyId
        requestBody.put("counterPartyAddress", gateProviderProtocolUrl);  // Use a variável correta para o URL
        requestBody.put("counterPartyId", gateProviderId);  // Adicione uma variável ou valor fixo para o ID

        // Protocolo
        requestBody.put("protocol", "dataspace-protocol-http");

        // querySpec conforme definido no JSON
        Map<String, Object> querySpec = new HashMap<>();
        querySpec.put("offset", 0);
        querySpec.put("limit", 50); // ajuste conforme necessário
        querySpec.put("sortOrder", "DESC");
        querySpec.put("sortField", "fieldName");
        querySpec.put("filterExpression", new ArrayList<>()); // Lista vazia como no JSON original

        requestBody.put("querySpec", querySpec);

        return requestBody;
    }


    private List<CatalogItemDTO> mapResponseFromQueryCatalog(String response) {
        List<CatalogItemDTO> catalogItems = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode responseJson = objectMapper.readTree(response);
            JsonNode datasets = responseJson.path("dcat:dataset");

            if (datasets.isArray()) {
                for (JsonNode dataset : datasets) {
                    String fullType = dataset.path("https://purl.org/dc/terms/type").asText();
                    String type = fullType.replace("cx-taxo:", "");
                    if (edcProperties.getProviders().contains(type)) {
                        catalogItems.add(processDatasetAndCreateDTO(dataset, type));
                    }
                }
            }
        } catch (IOException e) {
            log.error("Error parsing response JSON: " + e.getMessage());
        }

        return catalogItems;
    }

    private CatalogItemDTO processDatasetAndCreateDTO(JsonNode dataset, String provider) {
        String id = dataset.get("@id").asText();
        String offerId = dataset.path("odrl:hasPolicy").get("@id").asText();
        String subject = dataset.path("https://purl.org/dc/terms/subject").asText();
        String description = dataset.path("https://purl.org/dc/terms/description").asText();

        // Buscar dinamicamente a restrição de "UsagePurpose"
        JsonNode constraints = dataset.path("odrl:hasPolicy")
                .path("odrl:permission")
                .path("odrl:constraint")
                .path("odrl:and");
        String usagePurpose = "";

        if (constraints.isArray()) {
            for (JsonNode constraint : constraints) {
                String leftOperand = constraint.path("odrl:leftOperand").asText();
                if ("https://w3id.org/catenax/policy/UsagePurpose".equals(leftOperand)) {
                    usagePurpose = constraint.path("odrl:rightOperand").asText();
                    break;
                }
            }
        }

        return new CatalogItemDTO(id, offerId, provider, subject, description, usagePurpose);
    }



}
