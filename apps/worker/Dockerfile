###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

RUN pnpm install 

COPY --chown=node:node . .

RUN pnpm nx run worker:build      

ENV NODE_ENV production

RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist/apps/worker ./dist

CMD [ "node", "dist/src/main.js" ]
