ARG NODE_VERSION=current
FROM node:$NODE_VERSION-alpine AS base

RUN npm install -g npm@latest

FROM base AS checker
WORKDIR /usr/src/app
COPY . .
RUN npm install --ignore-scripts typescript
RUN npm run typecheck

FROM base AS runner
WORKDIR /app
COPY . .
RUN apk add --no-cache tini
RUN npm ci --omit=dev
COPY --from=checker /usr/src/app/package.json ./package.json

USER node
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "run", "start:prod"]