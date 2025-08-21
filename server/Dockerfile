# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /tienclinic/backend

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g @babel/core @babel/cli

# Copy all files
COPY . .

# copy to folder build
RUN npm run build-src

# Start app
CMD ["npm", "run", "build"]
