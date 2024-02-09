# Security Assessment Country Risk (incl. Frontend, Backend Services)

| Contact                  | Details                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| Contact for product       | [@fabiodmota](https://github.com/fabiodmota) |
| Security responsible      | [@SSIRKC](https://github.com/SSIRKC) <br> [@szymonkowalczykzf](https://github.com/szymonkowalczykzf) |
| Version number of product | 24.03                                                                                         |
| Dates of assessment       | 2024-01-31: Re-Assessment                                                                      |
| Status of assessment      | RE-ASSESSMENT DONE                                                                            |

## Product Description
Country risk refers to the risk of investing or lending money in a country, arising from possible changes in the business environment that may adversely affect operating profits or the value of assets in the country. 
For example, financial factors such as currency controls, devaluation or regulatory changes, or stability factors such as mass riots, civil war and other potential events contribute to companies' operational risks. 
This term is also sometimes referred to as political risk - however, country risk is a more general term that generally refers only to risks affecting all companies operating within or involved with a particular country.

Political risk analysis providers and credit rating agencies use different methodologies to assess and rate countries' comparative risk exposure. 
Credit rating agencies tend to use quantitative econometric models and focus on financial analysis, whereas political risk providers tend to use qualitative methods, focusing on political analysis. 
However, there is no consensus on methodology in assessing credit and political risks.

## Kick-Off, Basic Information, Scope
* Main Components: Country Risk Frontend, Backend and database
* Technology Stack: Frontend (React: JS, CSS), Backend (Spring Boot: Java), Database (Postgres)
* In Scope: Frontend, Backend incl. connection to BPDM and data validation, user rights & roles (provided by keycloak)
* Out of Scope: Cleaning/filtering company data (e.g. BPN, address, etc.)/BPDM, Keycloak

## Data Flow Diagram
![image](https://github.com/eclipse-tractusx/vas-country-risk/assets/115729451/a7432ef2-6949-41d3-818c-bcf309a9aae4)

## Data Flow Diagram - Prepared with Mermaid
```mermaid
flowchart LR

A1(External Applications)
A2(Standard User)
A3(Admin User)

B1(Login-Country Risk)
B2(Filter Ratings \n Change Ranges)
B3(Upload Own Rating \n CSV)
B4(Save Reports)
B5(Delete Ratings, Reports)

B6[Keycloak]

A2-->B1
A2-.->|Out of Scope|B2
A2-.->|Out of Scope|B3
A2-.->|Out of Scope|B4
A2-.->|Out of Scope|B5

A3-->B1
A3-->B2
A3-->B3

C1(Provide Dashboard Overview)
C2(Forward CSV \n Depending on Token provided by User, \n Admin can choose to upload company-wide country ratings)
C3(Save Reports)
C4(Forward Delete-Call)

B1-->C1
B2-->C1
B3-->|Filled-out CSV template \n Country names and ratings|C2
B4-->|Ranges, Country Risks, \n Selected Countries|C3
B5-->C4

C5(HashiCorp Vault \n Secrets for access to DB and KeyCloak)

D1(Process GET requests to API)
D2(Fetch BP-information)
D3(Validate&Store data \n Process POST requests)
D4(Delete data \n Process DELETE requests)
D5(Verify Token and User Role \n for each requests)

A1-->|Token \n API request|D1
A1-->|Token \n API request \n not planned, but possible|D4
C1-->|Keycloak token \n GET request|D1
D1-->|BP-data as needed \n Country Scores|C1
C1-->|Token, applied filters, \n Custom ranges \n POST request|D3
C2-->|Country ratings - CSV \n POST request|D3
C3-->D3
C4-->D4

C5-.->D1
C5-.->D3
C5-.->D4
D5<-->B6

D1-->|Keycloack Token|D2
D2-->|BPN, Legal Name, \n Address, etc.|D1
D3<-->D5
D4<-->D5

E1[(Postgres DB \n \n Country Ratings, User Reports, \n Gate Endpoints, User Information \n All Data in one database, no \n further separation of tenants)]
E2(Logs)
E3(Enter Gate Endpoints per \n Company manually \n -no automatic validation-)
E4(Country Ratings Ops \n -By Human-)

E5(BPDM)
E6(BPN, Legal Name, Address, \n Other not used information, etc.)

F1(EDC - Consumer \n https, URI based, EDC Auth support)
F2(EDC - Provider)

E4-->E3
E3-->E1

D1-.->E2
D3-.->E2
D4-.->E2

D4-->E1
D3-->|Country ratings - company & user \n Ranges - company & user|E1
E1-->|Country ratings - company wide & user specific \n Ranges - company wide & user specific \n CSV Template|D1
E1-->|One or multiple gate endpoints - URL|D2

D2<-->|Keycloack Token \n Request for BP-information|E5
D2-->F1
D2-->F2
F1-->F2
F2-->|EDC Data Exchange + Contract Handling \n + Negotiating + Standard Vault Auth|F1

 C5
 E4
    subgraph Users - All calls via HTTPS
    A1
    A2
    A3
    B1
    B2
    B3
    B4
    B5
    B6
    end

    subgraph FrontEnd - Trust Boundary
    C1
    C2
    C3
    C4
    
    end

    subgraph BackEnd Service - Same Keycloack Token between FrontEnd and BackEnd calls - Trust Boundary
    D1
    D2
    D3
    D4
    D5
    end

    subgraph Database Layer
    E1
    E2
    E3
        subgraph Managed by other Teams - BAckend Services and Rest  APIs used for communication with DBs - Trust Boundary
        E5
        E6
        end
    end

    subgraph EDC Interface - Managed by other Teams - Trust Boundary
    F1
    subgraph Internet Boundary
    F2
    end
    end
```

## Vulnerabilities & Threats
| V001 | 	Risks from Logging: Repudiation, Compromised Audit Capabilities |
| ------------------------- | ------------------------- |
| Element | API Post & Delete Requests |
| Before Mitigation | Impact: Medium, Likelihood: High, Risk: Medium |
| After Mitigation | Impact: Low, Likelihood: Low, Risk: Low |
| Mitigation | Recommendation to also log who did an action. Log readers can come under attack via log files. Consider ways to canonicalize data in all logs. Implement a single reader for the logs, if possible, in order to reduce attack surface area. Be sure to understand and document log file elements which come from untrusted sources. |

| V002 | 	Cross Site Request Forgery (CSRF) |
| ------------------------- | ------------------------- |
| Element | Frontend |
| Before Mitigation | Impact: Medium, Likelihood: Medium, Risk: Medium |
| After Mitigation | Impact: Medium, Likelihood: Low, Risk: Low |
| Mitigation | Implement a CSFR Token which is only know to the backend service and the client to avoid valid requests from outsiders. |

| V003 | 	Potential Crash of Backend-Services |
| ------------------------- | ------------------------- |
| Element | 	API Backend Processes |
| Before Mitigation | Impact: Medium, Likelihood: High, Risk: Medium |
| After Mitigation | Impact: Medium, Likelihood: Low, Risk: Low |
| Mitigation | Request limiting and horizontal scaling in Kubernetes → not a task for BPDM team |

| V004 | Single data store for all companies |
| ------------------------- | ------------------------- |
| Element | Postgres Database |
| Before Mitigation | Impact: Low, Likelihood: Low, Risk: Low |
| After Mitigation | Impact: Low, Likelihood: Low, Risk: Low |
| Mitigation | No highly sensitive data (like BP-information) stored in database. Only ratings stored in database. Consider using a multi-tenant architecture for the data store. |

| V004 | Unnecessary retrieval of BPDM parameters |
| ------------------------- | ------------------------- |
| Element | BPDM connection |
| Before Mitigation | Impact: Medium, Likelihood: Low, Risk: Low |
| After Mitigation | Impact: Low, Likelihood: Low, Risk: Low |
| Mitigation | Only request data which is necessary for the business process of the application. If no other endpoint/parameter filtering is possible in the request, inform the endpoint responsibles. |
