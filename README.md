# FFC Grants Desirability Scoring

FFC Grants desirability scoring microservice - service will get message for scroing and calculated the score for application. After successfull cacluation, score will be available to poll from frontend service.

## Prerequisites

- Access to an instance of an
[Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/)(ASB).
- Docker
- Docker Compose

Optional:

- Kubernetes
- Helm

### Azure Service Bus

This service depends on a valid Azure Service Bus connection string for
asynchronous communication.  The following environment variables need to be set
in any non-production (`!config.isProd`) environment before the Docker
container is started. When deployed into an appropriately configured AKS
cluster (where [AAD Pod Identity](https://github.com/Azure/aad-pod-identity) is
configured) the micro-service will use AAD Pod Identity through the manifests
for
[azure-identity](./helm/ffc-grants-claim-service/templates/azure-identity.yaml)
and
[azure-identity-binding](./helm/ffc-grants-claim-service/templates/azure-identity-binding.yaml).

| Name                   | Description                                                                                |
| ----                   | -----------                                                                                |
| SERVICE_BUS_HOST       | Azure Service Bus hostname, e.g. `myservicebus.servicebus.windows.net`                     |
| SERVICE_BUS_PASSWORD   | Azure Service Bus SAS policy key                                                           |
| SERVICE_BUS_USER       | Azure Service Bus SAS policy name, e.g. `RootManageSharedAccessKey`                        |

## Environment variables

The following environment variables are required by the application container.
Values for development are set in the Docker Compose configuration. Default
values for production-like deployments are set in the Helm chart and may be
overridden by build and release pipelines.

| Name                                      | Description                               | Required  | Default            | Valid                       | Notes                                                                             |
| ----                                      | -----------                               | :-------: | -------            | -----                       | -----                                                                             |
| APPINSIGHTS_CLOUDROLE                     | Role used for filtering metrics           | no        |                    |                             | Set to `ffc-grants-desirability-scroing` in docker compose files                               |
| APPINSIGHTS_INSTRUMENTATIONKEY            | Key for application insight               | no        |                    |                             | App insights only enabled if key is present. Note: Silently fails for invalid key |
| NODE_ENV                                  | Node environment                          | no        | development        | development,test,production |                                                                                   |
| PORT                                      | Port number                               | no        | 3000               |                             |                                                                                   |
| REDIS_HOSTNAME                            | Redis host                                | no        | localhost          |                             |                                                                                   |
| REDIS_PORT                                | Redis port                                | no        | 6379               |                             |                                                                                   |
| SESSION_CACHE_TTL                         | Redis session timeout                     | no        | 30                 |                             |                                                                                   |
| REDIS_PASSWORD                            | Redis password                            | no        | password           |                            |                                                                                   |
| REDIS_PARTITION                           | Redis partion                             | no        | password           |                            |                                                                                   |
| PROTECTIVE_MONITORING_URL                 | protective monitoring url                 | no        | url                |                             |                                                                                   |
| POSTGRES_DB                               | postress db name                          | no        | ffc_grants_desirability_scoring                   |                             |                                                                                   |
| POSTGRES_HOST                             | postress db host name                     | no        |ffc-grants-desirability-scoring-postgres                   |                             |                                                                                   |
| POSTGRES_PASSWORD                         | postress db password                      | yes       |                    |                             |                                                                                   |
| POSTGRES_PORT                             | postress db port                          | no        | 5432                    |                             |                                                                                   |
| POSTGRES_LOGGING                          | postress db  logging                      | no        | false                   |                             |                                                                                   |
| POSTGRES_SCHEMA_NAME                      | postress db schema name                   | no        | public                   |                             |                                                                                    |
| POSTGRES_USER                             | postress db user                          | yes       |                    |                             |                                                                                   |

Running the integration tests locally requires access to ASB, this can be
achieved by setting the following environment variables:
`SERVICE_BUS_HOST`, `SERVICE_BUS_USER`, `SERVICE_BUS_PASSWORD`.
`COST_REQUEST_QUEUE_ADDRESS`, `COST_RESPONSE_QUEUE_ADDRESS`, `SCORE_REQUEST_QUEUE_ADDRESS`, `SCORE_RESPONSE_QUEUE_ADDRESS`, `DESIRABILITY_SCORE_TOPIC_ADDRESS` must be set to a valid, developer specific queue that is
available on ASB e.g. `ffc-grants-desirability-scroing-<initials>` where `<initials>` are the
initials of the developer.

## Test structure

The tests have been structured into subfolders of ./test as per the
[Microservice test approach and repository structure](https://eaflood.atlassian.net/wiki/spaces/FPS/pages/1845396477/Microservice+test+approach+and+repository+structure)

## How to run tests

A convenience script is provided to run automated tests in a containerised
environment. This will rebuild images before running tests via docker-compose,
using a combination of `docker-compose.yaml` and `docker-compose.test.yaml`.
The command given to `docker-compose run` may be customised by passing
arguments to the test script.

Examples:

```bash
# Run all tests
scripts/test

# Run tests with file watch
scripts/test -w
```

## Running the application

The application is designed to run in containerised environments, using Docker
Compose in development and Kubernetes in production.

- A Helm chart is provided for production deployments to Kubernetes.

### Build container image

Container images are built using Docker Compose, with the same images used to
run the service with either Docker Compose or Kubernetes.

When using the Docker Compose files in development the local `app` folder will
be mounted on top of the `app` folder within the Docker container, hiding the
CSS files that were generated during the Docker build.  For the site to render
correctly locally `npm run build` must be run on the host system.

By default, the start script will build (or rebuild) images so there will
rarely be a need to build images manually. However, this can be achieved
through the Docker Compose
[build](https://docs.docker.com/compose/reference/build/) command:

```bash
# Build container images
docker-compose build
```

### Start and stop the service

Use Docker Compose to run service locally.

`docker-compose up`

Additional Docker Compose files are provided for scenarios such as linking to
other running services.

Link to other services:

```bash
docker-compose -f docker-compose.yaml -f docker-compose.override.yaml -f docker-compose.link.yaml up
```

#### Accessing the pod

The service is exposed via a Kubernetes ingress, which requires an ingress
controller to be running on the cluster. For example, the NGINX Ingress
Controller may be installed via Helm.  

Alternatively, a local port may be forwarded to the pod:

```bash
# Forward local port to the Kubernetes deployment
kubectl port-forward --namespace=ffc-grants deployment/ffc-grants-desirability-scroing 3000:3000
```

Once the port is forwarded or an ingress controller is installed, the service
can be accessed and tested in the same way as described in the
[Test the service](#test-the-service) section above.

#### Probes

The service has both an Http readiness probe and an Http liveness probe
configured to receive at the below end points.

Readiness: `/healthy`
Liveness: `/healthz`

## CI pipeline

This service uses the [FFC CI pipeline](https://github.com/DEFRA/ffc-jenkins-pipeline-library)

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
