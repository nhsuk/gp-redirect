# **DEPRECATED** - no longer actively maintained

---

# GP redirect

[![GitHub Release](https://img.shields.io/github/release/nhsuk/gp-redirect.svg)](https://github.com/nhsuk/gp-redirect/releases/latest/)
[![Greenkeeper badge](https://badges.greenkeeper.io/nhsuk/gp-redirect.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/nhsuk/gp-redirect.svg?branch=master)](https://travis-ci.org/nhsuk/gp-redirect)
[![Coverage Status](https://coveralls.io/repos/github/nhsuk/gp-redirect/badge.svg?branch=master)](https://coveralls.io/github/nhsuk/gp-redirect?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/nhsuk/gp-redirect/badge.svg)](https://snyk.io/test/github/nhsuk/gp-redirect)

A very simple app to receive requests on a single URL and forward those onto
the appropriate page in the [profiles app](https://github.com/nhsuk/profiles).

It is intended to work with requests from the NHS Choices site on the GP pages,
using the id of the GP surgery from the referring page.

## Application development

The application runs in docker containers. To start the application ready for
development (where changes made on the local host will be auto-reloaded into
the running container) run `docker-compose up --build --force-recreate
gp-redirect`.  Tests can be run inside a container via `docker-compose -f
docker-compose-tests.yml up tests`.  When a container has been finished with it
should be taken down via `docker-compose down -v`. It is important to remove
the volumes via `-v` so as to avoid issues with the contents being cached on
the docker VM.

## Environment variables

Environment variables are managed by the environment in which the application
is run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

The defaults given below are for when the application is run for development
via docker-compose, as described above.

| Variable    | Description                                                       | Default     |
| :---        | :---                                                              | :---        |
| `NODE_ENV`  | Node environment                                                  | development |
| `LOG_LEVEL` | Numeric [log level](https://github.com/trentm/node-bunyan#levels) | `INFO`      |
| `PORT`      | Server port                                                       | 2999        |

## Architecture Decision Records

This repo uses
[Architecture Decision Records](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
to record architectural decisions for this project.
They are stored in [doc/adr](doc/adr).
