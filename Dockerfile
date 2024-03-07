# Use an official Node.js runtime as a parent image
FROM node:16.19.1-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Build the React app
RUN npm run build

# Expose the port for the React app
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
