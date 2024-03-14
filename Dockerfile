# Use an official Node.js runtime as a parent image
FROM node:16.19.1-alpine3.17 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Build the React app
RUN npm run build

FROM nginx:1.25.4-alpine3.18 as final

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
