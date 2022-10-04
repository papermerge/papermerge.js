FROM node:18 as build

LABEL author="Eugen Ciur <eugen@papermerge.com>"

WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH

COPY app ./app
COPY config ./config
COPY public ./public
COPY .ember-cli ./
COPY ember-cli-build.js ./
COPY package-lock.json ./
COPY package.json ./

RUN npm install
RUN ember build --environment production

FROM nginx:1.21.1-alpine

COPY --from=build /src/dist/ /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
