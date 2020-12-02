FROM node:10 as builder
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
    # ng build --base-href=/app/ --prod --buildOptimizer=false --optimization=false

# base image
FROM nginx:alpine

## Copy our default nginx config
# COPY docker/prod/frontend/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]

