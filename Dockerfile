# Use Node.js LTS
FROM node:20

WORKDIR /app

# Copy package files first for caching
# CHANGE: Removed 'api/' prefix. Docker will now look for package.json in the current context.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API source code
# CHANGE: Removed 'api' prefix. Copies everything from the current directory to /app.
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 7860
ENV PORT=7860

# Start the application
CMD ["npm", "start"]
