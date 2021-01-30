## ---------------------------------------------------------------------------------------------------------------------
## NODE ENVIRONMENT
FROM debian AS node-env

RUN apt-get update -yqq && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
    apt-get install -y  nodejs

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app