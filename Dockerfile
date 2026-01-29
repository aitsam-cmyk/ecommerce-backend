# Use Node.js LTS
FROM node:20

WORKDIR /app

# Copy API package files first for caching
COPY api/package*.json ./

# Install dependencies
RUN npm install

# Copy the API source code into the app directory
COPY api ./

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 7860
ENV PORT=7860

# Start the application
CMD ["npm", "start"]
