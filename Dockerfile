# Use the official Node.js image as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/index

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the app dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]  # Adjust 'dist/index.js' to your actual entry point
