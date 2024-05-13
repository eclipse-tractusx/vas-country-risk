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

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringEscapeUtils;
import org.eclipse.tractusx.valueaddedservice.dto.edc.EDRResponseDTO;
import org.eclipse.tractusx.valueaddedservice.dto.edc.NegotiationRequestDTO;
import org.eclipse.tractusx.valueaddedservice.dto.edc.NegotiationResponseDTO;
import org.eclipse.tractusx.valueaddedservice.utils.EdcEndpointsMappingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

@Service
@Slf4j
public class NegotiationServiceLogic {


    @Autowired
    private InvokeService invokeService;

    @Value("${application.bpdm.gateProviderProtocolUrl}")
    private String gateProviderProtocolUrl;

    @Value("${application.bpdm.consumerManagementUrl}")
    private String consumerManagementUrl;

    @Value("${application.bpdm.policyBpn}")
    private String policyBpn;

    @Value("${application.bpdm.apiKey}")
    private String apiKey;

    @Value("${application.bpdm.gateProviderId}")
    private String gateProviderId;

    private final ConcurrentHashMap<String, NegotiationResponseDTO> negotiationCache = new ConcurrentHashMap<>();


    @Cacheable(value = "vas-bpdm-negotiation", key = "{#root.methodName, #negotiationItems}", unless = "#result == null or #result.isEmpty()")
    public List<NegotiationResponseDTO> triggerNegotiation(List<NegotiationRequestDTO> negotiationItems) {
        String sanitizedItems = StringEscapeUtils.escapeJava(negotiationItems.toString());
        log.info("Triggering negotiation for items: " + sanitizedItems);

        List<NegotiationResponseDTO> responses = Flux.fromIterable(negotiationItems)
                .flatMap(dto ->
                        executeSequentialNegotiationRequests(dto)
                                .map(response -> new NegotiationResponseDTO(dto.getId(), dto.getOfferId(), gateProviderProtocolUrl, "Success", response.getAuthCode(), response.getEndpoint()))
                                .onErrorResume(e -> Mono.just(new NegotiationResponseDTO(dto.getId(), dto.getOfferId(), gateProviderProtocolUrl, "Error", null, null)))
                ).collectList().block();

        responses.stream().forEach(dto -> negotiationCache.put(dto.getId(), dto));

        return responses;

    }

    public ConcurrentHashMap<String, NegotiationResponseDTO> getStoredNegotiation() {
        return negotiationCache;
    }

    public Mono<EDRResponseDTO> executeSequentialNegotiationRequests(NegotiationRequestDTO negotiationRequestDTO) {

        if (negotiationRequestDTO.getOfferId() == null) {
            log.error("Offer ID is missing");
            return Mono.error(new RuntimeException("Asset ID or Offer ID is missing"));
        }


        return sendNegotiationInitiateRequest(negotiationRequestDTO)
                .delayElement(Duration.ofSeconds(6))
                .flatMap(this::executeGetRequestForNegotiationDetails)
                .delayElement(Duration.ofSeconds(4))
                .flatMap(this::executeTransferProcessRequestWithAgreementId)
                .delayElement(Duration.ofSeconds(4))
                .flatMap(this::getAuthCodeAndEndpoint);


    }


    public Mono<String> sendNegotiationInitiateRequest(NegotiationRequestDTO negotiationItem) {
        HttpHeaders headers = createHttpHeaders();
        Map<String, Object> requestBody = createNegotiationRequestBody(negotiationItem);
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);

        String url = consumerManagementUrl + "/v2/edrs";
        log.debug("Sending POST request to URL: " + url);
        log.debug("Request Headers: " + headers.toString());
        log.debug("Request Body: " + requestBody.toString());

        return invokeService.executeRequest("default", url, HttpMethod.POST, httpEntity, EdcEndpointsMappingUtils::extractNegotiationIdFromInitialRequest);
    }

    public Mono<EDRResponseDTO> getAuthCodeAndEndpoint(String transferProcessId) {
        return executeGetRequest(consumerManagementUrl + "/v2/edrs/" + transferProcessId + "/dataaddress?auto_refresh=true", EdcEndpointsMappingUtils::extractAuthenticationDetails);
    }

    @CacheEvict(value = "vas-bpdm-negotiation", allEntries = true)
    public void invalidateAllCache() {
        negotiationCache.clear();
        log.debug("invalidateAllCache|vas-bpdm-negotiation -  invalidated cache - allEntries");
    }

    public Mono<String> executeGetRequestForNegotiationDetails(String negotiationId) {
        String url = consumerManagementUrl + "/v2/contractnegotiations/" + negotiationId;
        HttpHeaders headers = createHttpHeaders();
        Map<String, Object> requestBody = new HashMap<>();
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);

        return invokeService.executeRequest("default", url, HttpMethod.GET, httpEntity, EdcEndpointsMappingUtils::extractContractAgreementId)
                .doOnError(error -> log.error("Failed to retrieve contract negotiation details", error));
    }

    public Mono<String> executeTransferProcessRequestWithAgreementId(String contractAgreementId) {
        String url = consumerManagementUrl + "/v2/edrs/request";
        HttpHeaders headers = createHttpHeaders();

        Map<String, Object> filter = new HashMap<>();
        filter.put("operandLeft", "agreementId");
        filter.put("operator", "=");
        filter.put("operandRight", contractAgreementId);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("@context", Map.of("@vocab", "https://w3id.org/edc/v0.0.1/ns/"));
        requestBody.put("@type", "QuerySpec");
        requestBody.put("offset", 0);
        requestBody.put("limit", 1);
        requestBody.put("filterExpression", List.of(filter));

        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);

        return invokeService.executeRequest("default", url, HttpMethod.POST, httpEntity, EdcEndpointsMappingUtils::extractTransferProcessId)
                .doOnError(error -> log.error("Failed to make request with agreement ID: {}", contractAgreementId, error));
    }


    public Map<String, Object> createNegotiationRequestBody(NegotiationRequestDTO negotiationItem) {
        Map<String, Object> body = new HashMap<>();
        List<Object> context = List.of(
                "https://w3id.org/tractusx/policy/v1.0.0",
                "http://www.w3.org/ns/odrl.jsonld",
                Collections.singletonMap("edc", "https://w3id.org/edc/v0.0.1/ns/")
        );

        body.put("@context", context);
        body.put("@type", "ContractRequest");
        body.put("edc:counterPartyAddress", gateProviderProtocolUrl);
        body.put("edc:protocol", "dataspace-protocol-http");
        body.put("edc:counterPartyId", gateProviderId);

        Map<String, Object> policy = new HashMap<>();
        policy.put("@id", negotiationItem.getOfferId());
        policy.put("@type", "Offer");

        Map<String, Object> permission = new HashMap<>();
        permission.put("action", "use");

        Map<String, Object> constraintAnd = new HashMap<>();
        Map<String, Object> leftConstraint = new HashMap<>();
        leftConstraint.put("leftOperand", "FrameworkAgreement");
        leftConstraint.put("operator", "eq");
        leftConstraint.put("rightOperand", "businessPartner:1.0");

        Map<String, Object> rightConstraint = new HashMap<>();
        rightConstraint.put("leftOperand", "UsagePurpose");
        rightConstraint.put("operator", "eq");
        rightConstraint.put("rightOperand", negotiationItem.getUsagePurpose());

        constraintAnd.put("and", List.of(leftConstraint, rightConstraint));
        permission.put("constraint", constraintAnd);
        policy.put("permission", Collections.singletonList(permission));
        policy.put("target", negotiationItem.getId());
        policy.put("assigner", gateProviderId);

        body.put("edc:policy", policy);

        return body;
    }

    public Mono<String> retrieveEDRsData(String assetId) {

        return executeGetRequest(consumerManagementUrl + "/edrs?assetId=" + assetId, EdcEndpointsMappingUtils::extractLastNegotiatedTransferProcessId);
    }


    private <T> Mono<T> executeGetRequest(String url, Function<String, T> responseMapper) {
        HttpHeaders headers = createHttpHeaders();
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(new HashMap<>(), headers);

        return invokeService.executeRequest("default", url, HttpMethod.GET, httpEntity, responseMapper);
    }

    private HttpHeaders createHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Api-Key", apiKey);
        return headers;
    }


}
