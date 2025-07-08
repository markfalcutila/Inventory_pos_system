# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make start.sh executable
RUN chmod +x ./start.sh

# Expose the port your app runs on (default: 3000, change if needed)
EXPOSE 3000

# Start the application using the custom script
CMD ["./start.sh"]
