# Use an official Node runtime as a base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Install the latest Angular CLI globally
RUN npm install -g @angular/cli

# Build the Angular app
RUN ng build --prod

# Use a lightweight runtime image
FROM nginx:latest

# Copy the built artifacts from the build image to the NGINX public directory
COPY --from=build /app/dist/learnify /usr/share/nginx/html

# Expose the port that NGINX will run on
EXPOSE 80

# Command to start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
