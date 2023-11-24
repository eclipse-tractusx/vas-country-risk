# Country Risk Helm Chart

This Helm Chart deploys the Country Risk Frontend service to a Kubernetes environment.

## Prerequisites

* [Kubernetes Cluster](https://kubernetes.io/)
* [Helm](https://helm.sh/docs/)

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
helm install release_name tractusx-dev/country-risk-frontend --namespace <your_namespace>
```

This will install a new release of the Country Risk in the given namespace.
On default values this release deploys the latest image tagged as `v1.0.0` from the repository's GitHub Container Registry.
The application is run on default profile (you can run it on a dev profile or local).

Per default ingress is disabled, as well as no authentication for endpoints.
You can configure your own ingress to access the app or use something like port forward if you are running locally in you cluster
By giving your own values file you can configure the Helm deployment of the Country Risk freely:

```bash
helm install release_name tractusx-dev/country-risk-frontend --namespace <your_namespace> -f ./path/to/your/values.yaml
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


## Values.Yaml Chart explanation 

# country-risk-frontend

![Version: 3.0.3](https://img.shields.io/badge/Version-3.0.3-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.2.1](https://img.shields.io/badge/AppVersion-1.2.1-informational?style=flat-square)

A Helm chart for deploying the Country Risk service

## Values

| Key | Type | Default                                               | Description |
|-----|------|-------------------------------------------------------|-------------|
| affinity..podAffinityTerm.labelSelector.matchExpressions[0] | object | `{"key":"app.kubernetes.io/name","operator":"DoesNotExist"}` | Match Pod rules |
| affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].podAffinityTerm.topologyKey | string | `"kubernetes.io/hostname"`                            | Key that is used to determine the topology of the cluster |
| affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution[0].weight | int | `100`                                                 |  |
| appName | string | `"vas-country-risk-frontend"`                         | Name of the backend service |
| applicationSecret | object | `{"enabled":false}`                                   | Defines the client secret and client ID |
| autoscaling | object | `{"enabled":false}`                                   | Specifies whether autoscaling should be enabled for the pod |
| certificate.host | string | `"localhost"`                                         | Hostname for the certificate |
| configmap.create | bool | `true`                                                |  |
| elastic.enabled | bool | `false`                                               | Should elastic be enabled or not |
| elastic.security.tls | object | `{"restEncryption":false}`                            | Information about the transport layer security (TLS) |
| elastic.security.tls.restEncryption | bool | `false`                                               | Encryption for the REST requests made to the Elastic cluster |
| image.name | string | `"vas-country-risk"`                  | Name of the docker image |
| image.pullPolicy | string | `"Always"`                                            |  |
| image.registry | string | `"tractusx"`                                           |  |
| image.tag | string | `""`                                                  | Overrides the image tag whose default is the chart appVersion. |
| imagePullSecrets | list | `[]`                                                  | List of secrets to be used |
| ingress.annotations."nginx.ingress.kubernetes.io/force-ssl-redirect" | string | `"true"`                                              | HTTP traffic should be redirected to HTTPS |
| ingress.annotations."nginx.ingress.kubernetes.io/ssl-passthrough" | string | `"true"`                                              | Ingress controller should pass SSL traffic directly to the backend pods |
| ingress.className | string | `"nginx"`                                             | Class name |
| ingress.enabled | bool | `false`                                               | Ingress enabled or not |
| livenessProbe | object | `{"failureThreshold":3,"initialDelaySeconds":10,...}` | Determines if a pod is still alive or not |
| livenessProbe.initialDelaySeconds | int | `10`                                                  | Number of seconds to wait before performing the first liveness probe |
| livenessProbe.periodSeconds | int | `1000`                                                | Number of seconds to wait between consecutive probes |
| livenessProbe.successThreshold | int | `1`                                                   | Number of consecutive successful probes before a pod is considered healthy |
| livenessProbe.timeoutSeconds | int | `1000`                                                | Number of seconds after which a liveness probe times out |
| nodeSelector | object | `{}`                                                  | Node placement constraints |
| podAnnotations | object | `{}`                                                  | Annotations to be added to the running pod |
| podSecurityContext | object | `{"fsGroup":2000}`                                    | Configuration for security-related options of the running pod |
| podSecurityContext.fsGroup | int | `2000`                                                | Set the file system group ID for all containers in the pod |
| readinessProbe | object | `{"failureThreshold":3,"initialDelaySeconds":10,...}` | Determine when a pod is ready to start accepting requests |
| replicaCount | int | `1`                                                   | Number of replicas of a Kubernetes deployment |
| resources.limits | object | `{"cpu":"800m","memory":"2Gi"}`                       | Maximum amount of resources that the deployment should be able to consume |
| resources.requests | object | `{"cpu":"300m","memory":"1Gi"}`                       | Minimum amount of resources that the deployment should be guaranteed to receive |
| securityContext.allowPrivilegeEscalation | bool | `false`                                               | Specifies if processes running inside the container can gain more privileges than its initial user |
| securityContext.capabilities | object | `{"drop":["ALL"]}`                                    | Capabilities that the process inside the container should have |
| securityContext.runAsGroup | int | `3000`                                                | Specifies the group ID that the process inside the container should run |
| securityContext.runAsNonRoot | bool | `true`                                                | Specifies whether the process inside the container should run as a non-root user |
| securityContext.runAsUser | int | `10001`                                               | Specifies the user ID that the process inside the container should run |
| service | object | `{"port":8080,"type":"ClusterIP"}`                    | Service that should be created for the pod |
| service.port | int | `8080`                                                | Service port |
| service.type | string | `"ClusterIP"`                                         | Type of service to be used |
| springProfiles[0] | string | `"dev"`                                               |  |
| tolerations | list | `[]`                                                  | Pod toleration constraints |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.11.0](https://github.com/norwoodj/helm-docs/releases/v1.11.0)

