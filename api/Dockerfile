# Use Node.js LTS
FROM node:20

WORKDIR /app

# Copy package files (They are right here, next to the Dockerfile)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code (Everything in this folder)
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 7860

# Start the application
CMD ["npm", "start"]