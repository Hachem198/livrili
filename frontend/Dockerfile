# Use latest alpine-based Node image
FROM node:alpine

# Create a non-root user and group
RUN addgroup -S react && adduser -S react -G react

# Create app directory and set ownership
RUN mkdir -p /react-app && chown react:react /react-app
WORKDIR /react-app

# Install dependencies as non-root user
COPY --chown=react:react package*.json ./
USER react
RUN npm install --force

# Copy the rest of the app with correct ownership
COPY --chown=react:react . .

# Configure Vite to listen on all interfaces
ENV HOST=0.0.0.0
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]

