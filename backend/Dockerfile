# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Set the environment variables for the PostgreSQL connection
ENV PGHOST=127.0.0.1
ENV PGUSER=postgres
ENV PGDATABASE=whale
ENV PGPASSWORD=4523asdf
ENV PGPORT=5432

# Start the Node.js application
CMD ["npm", "start"]