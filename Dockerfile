FROM node:13

WORKDIR /code

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src ./src
COPY tsconfig.json export.js next-env.d.ts next.config.js postcss.config.js ./
RUN yarn build

COPY export.js ./
ENTRYPOINT yarn export
