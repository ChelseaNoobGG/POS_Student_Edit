# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port for Telnet (23)
EXPOSE 23

# Expose the port for the application (8080 or your custom port)
EXPOSE 8080

# Command to run both the telnetServer.js and server.js (POS application)
CMD ["sh", "-c", "node telnetServer.js & node server.js"]
