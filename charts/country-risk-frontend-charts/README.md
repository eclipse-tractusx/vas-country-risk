# Country Risk Helm Chart

This Helm Chart deploys the Country Risk Frontend service to a Kubernetes environment.

## Prerequisites

* [Kubernetes Cluster](https://kubernetes.io/)
* [Helm](https://helm.sh/docs/)

In an existing Kubernetes cluster the application can be deployed with the following command:

```bash
helm install release_name ./charts/country-risk-frontend-charts --namespace your_namespace
```

This will install a new release of the Country Risk in the given namespace.
On default values this release deploys the latest image tagged as `v1.0.0` from the repository's GitHub Container Registry.
The application is run on default profile (you can run it on a dev profile or local).

Per default ingress is disabled, as well as no authentication for endpoints.
You can configure your own ingress to access the app or use something like port forward if you are running locally in you cluster
By giving your own values file you can configure the Helm deployment of the Country Risk freely:

```bash
helm install release_name ./charts/country-risk-frontend-charts --namespace your_namespace -f ./path/to/your/values.yaml
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

### country-risk-frontend
