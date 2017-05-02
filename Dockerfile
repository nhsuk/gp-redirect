FROM node:7.9-alpine
RUN apk add --no-cache git

ENV USERNAME nodeuser
ENV PORT 3000

RUN adduser -D "$USERNAME" && \
    mkdir /code && \
    chown "$USERNAME":"$USERNAME" /code

USER $USERNAME
WORKDIR /code

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY yarn.lock package.json /code/
RUN if [ "$NODE_ENV" == "production" ]; then yarn install --production --ignore-optional; else yarn install --ignore-optional; fi

EXPOSE $PORT

COPY . /code

USER root
RUN find /code -user 0 -print0 | xargs -0 chown "$USERNAME":"$USERNAME"
USER $USERNAME

CMD [ "yarn", "start" ]
