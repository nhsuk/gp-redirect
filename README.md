# GP redirect

A very simple app to recieve requests on a single URL and forward those onto
the appropriate page in the [profiles app](https://github.com/nhsuk/profiles).

It is intended to work with requests from the NHS Choices site on the GP pages,
using the id of the GP surgery from the referrering page.

## Application development

The application runs in docker containers. To start the application ready for development (where changes made on the local host will be auto-reloaded into the running container) run `docker-compose up --build --force-recreate redirect`.
Tests can be run inside a container via `docker-compose -f docker-compose-tests.yml up tests`.
When a container has been finished with it should be taken down via `docker-compose down -v`. It is important to remove the volumes via `-v` so as to avoid issues with the contents being cached on the docker VM.

## Environment variables

Environment variables are managed by the environment in which
the application is run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

The defaults given below are for when the application is run for development via docker-compose, as described above.

| Variable | Description | Default |
|:---|:---|:---|
| `NODE_ENV` | node environment | development |
| `LOG_LEVEL` | [bunyan log level](https://github.com/trentm/node-bunyan#levels) | `INFO` |
| `PORT` | server port | 3000 |
