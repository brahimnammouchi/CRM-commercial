#**************Dockerfile pour le Frontend************
# Stage 1 - The build process
FROM node:14.16.1-alpine

COPY package*.json /app/react-todolist/react-todolist/
WORKDIR /app/react-todolist/react-todolist/

RUN npm install

COPY . /app/react-todolist/react-todolist/

EXPOSE 3000















# FROM node:14-alpine3.13 as build-deps

# # install dependencies & set working directory
# COPY ./package.json /app/
# WORKDIR /app
# RUN ["yarn"]

# # Copy project
# COPY . /app/

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# ENV NODE_ENV production

# # build the project
# RUN ["yarn", "run" ,"build"]

# # Stage 2 - The production environment
# FROM nginx:1.17-alpine

# LABEL MAINTAINER="Infinity Management <rami.safari@infinitymgt.fr>"

# # replace with custom one
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html

# # copy the build from stage 1
# COPY --from=build-deps /app/build .

# # Create a group and user
# RUN addgroup -S www-nginx && adduser -S www-nginx -G www-data

# ## add permissions for nginx user
# RUN chmod -R 755 . && \
#   touch /var/run/nginx.pid && \
#   chown -R www-nginx:www-nginx . /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# # Tell docker that all future commands should run as the appuser user
# USER www-nginx

# EXPOSE 8080

# # update the environment variable & start the nginx server
# CMD nginx -g 'daemon off;'
# CMD [ "npm start" ]
