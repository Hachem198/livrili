# Use latest alpine-based Node image
FROM node:22-alpine

# Create a non-root user and group
RUN addgroup -S react && adduser -S react -G react

# Create app directory and set ownership
RUN mkdir -p /react-app && chown react:react /react-app
WORKDIR /react-app

# Install dependencies as non-root user
COPY --chown=react:react package*.json .
USER react
RUN npm install --force

# Copy the rest of the app with correct ownership
COPY --chown=react:react . .

# Configure Vite to listen on all interfaces
EXPOSE 5173

# Start the app with explicit host configuration
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
