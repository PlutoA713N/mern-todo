# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build TypeScript to JS (outputs to /app/dist)
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy only package files & install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

# Expose the port your app runs on
EXPOSE 5000

# Run the compiled JS file
CMD ["node", "dist/index.js"]
