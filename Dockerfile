FROM node:16-alpine
WORKDIR /usr/local/src/app

# Yarn install with dev dependencies
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --ignore-optional

# Build the app and do a clean install with only production dependencies
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN \
  yarn build \
  && rm -rf node_modules \
  && yarn install --frozen-lockfile --production=true --ignore-optional

# Directory with build info (git commit sha, build date)
COPY buildinfo* ./buildinfo

USER node

EXPOSE 3300
CMD ["yarn","start"]
