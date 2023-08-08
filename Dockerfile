# Building app
FROM node:16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Using the build
FROM nginx:1.17.2-alpine

# adding bash to alpine
RUN apk update
RUN apk upgrade
RUN apk add bash

# setting log files
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

# Modify timezone to Recife
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/America/Recife /etc/localtime
RUN echo "America/Recife" > /etc/timezone

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY --from=build /app/build /usr/share/nginx/html
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
