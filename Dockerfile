# Base image ----
FROM node:21.2.0

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
#RUN npm install --force
RUN yarn install --force
z
# Copy app files
COPY . .

# Build the app
RUN rm -f .next
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
