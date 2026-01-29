# Use Node.js LTS
FROM node:20

WORKDIR /app

# Copy package files first for caching (current context)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code from current context
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 7860
ENV PORT=7860

# Start the application
CMD ["npm", "start"]
