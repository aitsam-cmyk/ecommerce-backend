# Use Node.js LTS
FROM node:20

WORKDIR /app

# Copy package files first for caching
COPY api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API source code
# Using ./api to be explicit about the source directory
COPY api ./

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 7860

# Start the application
CMD ["npm", "start"]
