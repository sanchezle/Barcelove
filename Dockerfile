# Use the official Node.js image from DockerHub
FROM node:16.4.2

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the `package.json` and `package-lock.json` files
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# The application listens on port 3000, so we'll expose it
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js" ]
