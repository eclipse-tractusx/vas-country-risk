# Country Risk Helm Chart

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat)

This Helm Chart deploys the Country Risk application to a Kubernetes environment. It consists of:

* [vas-country-risk-frontend](https://github.com/eclipse-tractusx/vas-country-risk-frontend)
* [vas-country-risk-backend](https://github.com/eclipse-tractusx/vas-country-risk-backend)

## Prerequisites

* [Kubernetes Cluster](https://kubernetes.io/)
* [Helm](https://helm.sh/docs/)

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm install release_name tractusx-dev/country-risk --namespace <your_namespace>
```

This will install a new release of the Country Risk in the given namespace.
On default values this release deploys the latest image tagged as `v1.0.0` from the repository's GitHub Container Registry.
The application is run on default profile (you can run it on a dev profile or local).

Per default ingress is disabled, as well as no authentication for endpoints.
You can configure your own ingress to access the app or use something like port forward if you are running locally in you cluster
By giving your own values file you can configure the Helm deployment of the Country Risk freely:

```bash
helm install release_name ./charts/country-risk --namespace your_namespace -f ./path/to/your/values.yaml
```

In the following sections you can have a look at the most important configuration options.

## Image Tag

Per default, the Helm deployment references a certain Country Risk release version where the newest Helm release points to the newest Country Risk version.
This is a stable tag pointing to a fixed release version of the Country Risk.
For your deployment you might want to follow the latest application releases instead.

In your values file you can overwrite the default tag:

```yaml
image:
  tag: "latest"
```

## Profiles

You can also activate the env profiles in which the Country Risk should be run.


```bash
npm run start:dev
```

Each endpoint can be configured in the env file, each endpoint represents a request made to our backend that contains the information to populate our dashboard, without it we will only have the components rendered.


```yaml
REACT_APP_DASHBOARD_URL=http://localhost:8080/api/dashboard/getTableInfo?
```


## Ingress

You can specify your own ingress configuration for the Helm deployment to make the Country Risk available over Ingress.
Note that you need to have the appropriate Ingress controller installed in your cluster first.
For example, consider a Kubernetes cluster with an [Ingress-Nginx](https://kubernetes.github.io/ingress-nginx/) installed.
An Ingress configuration for the Country Risk deployment could look like this:

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/frontend-protocol: "HTTP"
  hosts:
    - host: vas-country-risk-frontend.your-domain.net
      paths:
        - path: /
          pathType: Prefix
```

## Country Risk Configuration

The Helm deployment comes with the ability to configure the Country Risk application directly over the values file.
This way you are able to overwrite any configuration property of the `.env` files.

# country-risk

![Version: 3.0.3](https://img.shields.io/badge/Version-3.0.3-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.2.1](https://img.shields.io/badge/AppVersion-1.2.1-informational?style=flat-square)

A Helm chart for deploying the Country Risk service

**Homepage:** <https://github.com/eclipse-tractusx/vas-country-risk-frontend>

## Source Code

* <https://github.com/eclipse-tractusx/vas-country-risk-frontend>
* <https://github.com/eclipse-tractusx/vas-country-risk-backend>

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://charts.bitnami.com/bitnami | postgres(postgresql) | 11.*.* |
| https://helm.runix.net | pgadmin4 | 1.x.x |

## Values

| Key | Type | Default                                                                                                                                                        | Description |
|-----|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm.labelSelector.matchExpressions[0] | object | `{"key":"app.kubernetes.io/name","operator":"DoesNotExist"}`                                                                                                   | Match Pod rules |
| affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm.topologyKey | string | `"kubernetes.io/hostname"`                                                                                                                                     | Key that is used to determine the topology of the cluster |
| affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].weight | int | `100`                                                                                                                                                          |  |
| autoscaling | object | `{"enabled":false}`                                                                                                                                            | Specifies whether autoscaling should be enabled for the pod |
| backend.appName | string | `"vas-country-risk-backend"`                                                                                                                                   | Name of the backend service |
| backend.applicationSecret | object | `{"clientId":"","clientSecret":"","enabled":true}`                                                                                                             | Defines the client secret and client ID |
| backend.applicationSecret.clientId | string | `""`                                                                                                                                                           | String value that represents the client ID |
| backend.applicationSecret.clientSecret | string | `""`                                                                                                                                                           | String value that represents the client secret |
| backend.applicationSecret.enabled | bool | `true`                                                                                                                                                         | Value that specifies whether the application secret should be used |
| backend.configmap.create | bool | `true`                                                                                                                                                         |  |
| backend.configmap.data.security_enabled | string | `"false"`                                                                                                                                                      | Security configurations for the application |
| backend.configmap.data.spring_profiles_active | string | `"dev"`                                                                                                                                                        | Which profile should be activated for the application |
| backend.image.name | string | `"vas-country-risk-backend"`                                                                                                                                   | Name of the docker image |
| backend.image.pullPolicy | string | `"Always"`                                                                                                                                                     |  |
| backend.image.registry | string | `"tractusx"`                                                                                                                                                   |  |
| backend.image.tag | string | `""`                                                                                                                                                           | Overrides the image tag whose default is the chart appVersion. |
| backend.ingress.annotations."nginx.ingress.kubernetes.io/force-ssl-redirect" | string | `"true"`                                                                                                                                                       | HTTP traffic should be redirected to HTTPS |
| backend.ingress.annotations."nginx.ingress.kubernetes.io/ssl-passthrough" | string | `"true"`                                                                                                                                                       | Ingress controller should pass SSL traffic directly to the backend pods |
| backend.ingress.className | string | `"nginx"`                                                                                                                                                      | Class name |
| backend.ingress.enabled | bool | `false`                                                                                                                                                        | Ingress enabled or not |
| certificate | object | `{"host":"localhost"}`                                                                                                                                         | ------------------------------------------------------------------------------------------------------------ |
| certificate.host | string | `"localhost"`                                                                                                                                                  | Hostname for the certificate |
| elastic.enabled | bool | `false`                                                                                                                                                        | Should elastic be enabled or not |
| elastic.security.tls | object | `{"restEncryption":false}`                                                                                                                                     | Information about the transport layer security (TLS) |
| elastic.security.tls.restEncryption | bool | `false`                                                                                                                                                        | Encryption for the REST requests made to the Elastic cluster |
| frontend.appName | string | `"vas-country-risk-frontend"`                                                                                                                                  | Name of the frontend service |
| frontend.applicationSecret | object | `{"enabled":false}`                                                                                                                                            | Defines the client secret and client ID |
| frontend.configmap.create | bool | `true`                                                                                                                                                         |  |
| frontend.image.name | string | `"vas-country-risk"`                                                                                                                                           | Name of the docker image |
| frontend.image.pullPolicy | string | `"Always"`                                                                                                                                                     |  |
| frontend.image.registry | string | `"tractusx"`                                                                                                                                                   |  |
| frontend.image.tag | string | `""`                                                                                                                                                           | Overrides the image tag whose default is the chart appVersion. |
| frontend.ingress.annotations."nginx.ingress.kubernetes.io/force-ssl-redirect" | string | `"true"`                                                                                                                                                       | HTTP traffic should be redirected to HTTPS |
| frontend.ingress.annotations."nginx.ingress.kubernetes.io/ssl-passthrough" | string | `"true"`                                                                                                                                                       | Ingress controller should pass SSL traffic directly to the backend pods |
| frontend.ingress.className | string | `"nginx"`                                                                                                                                                      | Class name |
| frontend.ingress.enabled | bool | `false`                                                                                                                                                        | Ingress enabled or not |
| imagePullSecrets | list | `[]`                                                                                                                                                           | List of secrets to be used |
| livenessProbe | object | `{"failureThreshold":3,"initialDelaySeconds":60,"path":"/management/health/liveness","periodSeconds":10,"port":8080,"successThreshold":1,"timeoutSeconds":1}`  | Determines if a pod is still alive or not |
| livenessProbe.initialDelaySeconds | int | `60`                                                                                                                                                           | Number of seconds to wait before performing the first liveness probe |
| livenessProbe.path | string | `"/management/health/liveness"`                                                                                                                                | HTTP endpoint |
| livenessProbe.periodSeconds | int | `10`                                                                                                                                                           | Number of seconds to wait between consecutive probes |
| livenessProbe.port | int | `8080`                                                                                                                                                         | Port used |
| livenessProbe.successThreshold | int | `1`                                                                                                                                                            | Number of consecutive successful probes before a pod is considered healthy |
| livenessProbe.timeoutSeconds | int | `1`                                                                                                                                                            | Number of seconds after which a liveness probe times out |
| nodeSelector | object | `{}`                                                                                                                                                           | Node placement constraints |
| pgadmin4.enabled | bool | `false`                                                                                                                                                        | Should pgadmin4 be enabled or not |
| pgadmin4.env.email | string | `"vas@catena-x.net"`                                                                                                                                           | Email used on the Env environment |
| pgadmin4.ingress.annotations."cert-manager.io/cluster-issuer" | string | `"letsencrypt-prod"`                                                                                                                                           | Cluster issuer used for the ingress |
| pgadmin4.ingress.annotations."kubernetes.io/ingress.class" | string | `"nginx"`                                                                                                                                                      | Class for the pgadmin4 deployment |
| pgadmin4.ingress.enabled | bool | `true`                                                                                                                                                         | Ingress enabled or not |
| pgadmin4.secret.path | string | `"value-added-service/data/country-risk/dev/pgadmin4"`                                                                                                         | Path where the information related to the secret |
| podAnnotations | object | `{}`                                                                                                                                                           | Annotations to be added to the running pod |
| podSecurityContext | object | `{"fsGroup":2000}`                                                                                                                                             | Configuration for security-related options of the running pod |
| podSecurityContext.fsGroup | int | `2000`                                                                                                                                                         | Set the file system group ID for all containers in the pod |
| postgres.appName | string | `"vas-country-risk-postgres"`                                                                                                                                  | Database application name |
| postgres.auth | object | `{"database":"vas","username":"vas"}`                                                                                                                          | Configuration values for the Database |
| postgres.enabled | bool | `true`                                                                                                                                                         | Should postgres DB be enabled or not |
| postgres.environment | string | `"dev"`                                                                                                                                                        | Type of environment the database is running |
| postgres.ingress.className | string | `"nginx"`                                                                                                                                                      |  |
| postgres.ingress.enabled | bool | `true`                                                                                                                                                         | Ingress enabled or not |
| postgres.service.port | int | `5432`                                                                                                                                                         | Port to be used on this service |
| postgres.service.type | string | `"ClusterIP"`                                                                                                                                                  | Type of service to be used |
| readinessProbe | object | `{"failureThreshold":3,"initialDelaySeconds":60,"path":"/management/health/readiness","periodSeconds":10,"port":8080,"successThreshold":1,"timeoutSeconds":1}` | Determine when a pod is ready to start accepting requests |
| replicaCount | int | `1`                                                                                                                                                            | Number of replicas of a Kubernetes deployment |
| resources.limits | object | `{"cpu":"800m","memory":"2Gi"}`                                                                                                                                | Maximum amount of resources that the deployment should be able to consume |
| resources.requests | object | `{"cpu":"300m","memory":"1Gi"}`                                                                                                                                | Minimum amount of resources that the deployment should be guaranteed to receive |
| securityContext.allowPrivilegeEscalation | bool | `false`                                                                                                                                                        | Specifies if processes running inside the container can gain more privileges than its initial user |
| securityContext.capabilities | object | `{"drop":["ALL"]}`                                                                                                                                             | Capabilities that the process inside the container should have |
| securityContext.runAsGroup | int | `3000`                                                                                                                                                         | Specifies the group ID that the process inside the container should run |
| securityContext.runAsNonRoot | bool | `true`                                                                                                                                                         | Specifies whether the process inside the container should run as a non-root user |
| securityContext.runAsUser | int | `101`                                                                                                                                                          | Specifies the user ID that the process inside the container should run |
| service | object | `{"port":8080,"type":"ClusterIP"}`                                                                                                                             | Service that should be created for the pod |
| service.port | int | `8080`                                                                                                                                                         | Service port |
| service.type | string | `"ClusterIP"`                                                                                                                                                  | Type of service to be used |
| springProfiles[0] | string | `"dev"`                                                                                                                                                        |  |
| tolerations | list | `[]`                                                                                                                                                           | Pod toleration constraints |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.11.0](https://github.com/norwoodj/helm-docs/releases/v1.11.0)
