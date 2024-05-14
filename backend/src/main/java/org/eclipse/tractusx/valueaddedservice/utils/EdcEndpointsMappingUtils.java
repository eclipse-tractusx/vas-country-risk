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
package org.eclipse.tractusx.valueaddedservice.utils;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.tractusx.valueaddedservice.dto.edc.EDRResponseDTO;

import java.io.IOException;

@Slf4j
public class EdcEndpointsMappingUtils {

    public EdcEndpointsMappingUtils() {
    }

    private static final ObjectMapper objectMapper = createObjectMapper();

    private static ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }

    public static String extractLastNegotiatedTransferProcessId(String jsonResponse) {
        String lastNegotiatedTransferProcessId = "";
        long latestExpirationDate = 0;

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            if (rootNode.isArray()) {
                for (JsonNode node : rootNode) {
                    if ("NEGOTIATED".equals(node.path("tx:edrState").asText()) && node.has("tx:expirationDate")) {
                        long currentExpirationDate = node.path("tx:expirationDate").asLong();
                        // Check if this entry is more recent based on expirationDate
                        if (currentExpirationDate > latestExpirationDate) {
                            latestExpirationDate = currentExpirationDate;
                            if (node.has("transferProcessId")) {
                                lastNegotiatedTransferProcessId = node.path("transferProcessId").asText();
                            }
                        }
                    }
                }
            } else {
                log.info("Expected an array response for EDRs data but got a non-array response.");
            }
        } catch (IOException e) {
            log.error("Error parsing JSON for the last negotiated transfer process ID: {}", e.getMessage());
        }

        if (lastNegotiatedTransferProcessId.isEmpty()) {
            log.info("No negotiated transfer process ID found in the latest entry.");
        }
        return lastNegotiatedTransferProcessId;
    }

    public static String extractNegotiationIdFromInitialRequest(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        String negotiationId = "";
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            negotiationId = rootNode.get("@id").asText();
        } catch (IOException e) {
            log.error("Error parsing negotiation ID from JSON: {}", e.getMessage());
            throw new RuntimeException("Error extracting negotiation ID");
        }
        isEmpty(negotiationId,"extractNegotiationIdFromInitialRequest",jsonResponse);
        return negotiationId;
    }

    public static String extractContractAgreementId(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        String contractAgreementId = "";
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            contractAgreementId = rootNode.path("contractAgreementId").asText("");
        } catch (IOException e) {
            log.error("Error parsing contract agreement ID from JSON: {}", e.getMessage());
            throw new RuntimeException("Error extracting contract agreement ID");
        }
        isEmpty(contractAgreementId,"extractContractAgreementId",jsonResponse);
        return contractAgreementId;
    }

    public static String extractTransferProcessId(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        String transferProcessId = "";

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            // Handle both array and single object JSON responses
            if (rootNode.isArray()) {
                // Check for non-empty array
                for (JsonNode item : rootNode) {
                    if (item.has("transferProcessId")) {
                        transferProcessId = item.get("transferProcessId").asText("");
                        break; // Break after finding the first valid transferProcessId
                    }
                }
            } else if (rootNode.has("transferProcessId")) {
                // Handle single object JSON
                transferProcessId = rootNode.get("transferProcessId").asText("");
            }
        } catch (IOException e) {
            log.error("Error parsing JSON response: {}", e.getMessage());
            throw new RuntimeException("Error extracting transfer process ID from JSON", e);
        }

        // Check if the transferProcessId was found
        if (transferProcessId.isEmpty()) {
            log.error("No transferProcessId found in JSON response");
            throw new IllegalStateException("No transferProcessId found in JSON response");
        }

        return transferProcessId;
    }


    public static EDRResponseDTO extractAuthenticationDetails(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        EDRResponseDTO response = new EDRResponseDTO();

        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);

            // Check if the root node is the object and extract data directly
            if (rootNode.has("authorization")) {
                response.setAuthCode(rootNode.get("authorization").asText());
            }
            if (rootNode.has("endpoint")) {
                response.setEndpoint(rootNode.get("endpoint").asText());
            }
        } catch (IOException e) {
            log.error("Error parsing JSON for authentication details: {}", e.getMessage());
            throw new RuntimeException("Error extracting authentication details from JSON", e);
        }

        return response;
    }

    private static void isEmpty(String extractMessage, String operation, String json){
        if(extractMessage.isEmpty()){
            log.error("Error Extracting from Operation: {}", operation);
            log.error("Error Extracting from JSON: {}", json);
            throw new RuntimeException(String.format("Error in operation: %s", operation));
        }
        log.info("Found {} for Operation {}",extractMessage,operation);
    }

}

