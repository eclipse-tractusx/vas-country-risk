

graph TD
%% Scenario 1: Data Provision
subgraph S1["Scenario 1: Data Provision"]
OtherEDCSystems[("Other EDC Systems")]:::otherStyle -->|consumes data from| EDCProviderCR[("Country Risk EDC Provider")]:::providerStyle
EDCProviderCR -->|requests data from| CRApp[("Country Risk Application")]:::appStyle
end

    %% Scenario 2: Data Consumption
    subgraph S2["Scenario 2: Data Consumption"]
    CRApp2[("Country Risk Application")]:::appStyle -->|consumes data from| EDCC[("Country Risk EDC Consumer")]:::consumerStyle
    EDCC -->|requests data from| EDCGateProvider[("EDC Gate Provider")]:::gateStyle
    EDCGateProvider -->|requests data from| BPDM[("BPDM Application")]:::bpdmStyle
    end

    classDef appStyle fill:#ffcccc,stroke:#333,stroke-width:4px;
    classDef providerStyle fill:#ccffcc,stroke:#333,stroke-width:4px;
    classDef consumerStyle fill:#ccccff,stroke:#333,stroke-width:4px;
    classDef otherStyle fill:#fff0b3,stroke:#333,stroke-width:4px;
    classDef gateStyle fill:#f0b3ff,stroke:#333,stroke-width:4px;
    classDef bpdmStyle fill:#ffffb3,stroke:#333,stroke-width:4px;
