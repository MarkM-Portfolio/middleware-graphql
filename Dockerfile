FROM connections-docker.artifactory.cwp.pnp-hcl.com/base/node:16-alpine
MAINTAINER Connections

ENV NPM_CONFIG_LOGLEVEL=info SERVICE_USER=ibm
ENV DB_HOST DB_PORT DB_NAME DB_USER DB_PASSSWORD
ENV APP_DIR=/home/$SERVICE_USER/app/

COPY lib/src $APP_DIR/lib
COPY scripts/run.sh $APP_DIR/scripts/run.sh
COPY package-lock.json $APP_DIR
COPY package.json $APP_DIR

RUN chown -R ${SERVICE_USER}.${SERVICE_USER} /home/${SERVICE_USER}/app

WORKDIR $APP_DIR
RUN npm ci --production --registry https://artifactory.cwp.pnp-hcl.com/artifactory/api/npm/v-ess-npm-dev

USER $SERVICE_USER

# Expose the default ports
EXPOSE 3000
EXPOSE 9229

CMD ["./scripts/run.sh"]
