FROM node:8.11.3

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production

EXPOSE 4112

RUN mkdir -p /app
COPY app/package.json /app/
WORKDIR /app
RUN npm install --only-prod --ignore-scripts

COPY app /app

RUN chown -R node:node /app

USER node

CMD node server
