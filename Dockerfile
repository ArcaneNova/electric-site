# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build Next.js project
RUN npm run build

# Expose port
EXPOSE 3020

# Start Next.js app
CMD ["npm", "start"]
