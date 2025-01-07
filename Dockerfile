# build environment
FROM node:lts-alpine AS build
# Set working directory
WORKDIR /usr/src/app
# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
# Copy local files to build folder
COPY . .
# Installing dependencies
RUN pnpm install --silent --frozen-lockfile
# Build node application
RUN pnpm run build


# production environment
FROM node:lts-alpine
# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory for the app
WORKDIR /opt/app

# Copy public folder
COPY --from=build /usr/src/app/public ./public

# Copy package.json to install production node modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/dist ./dist

# Copy .env file
COPY --from=build /usr/src/app/.env ./

# Installing production dependencies
RUN pnpm i --silent --prod

# Create the tmp directory
RUN mkdir -p /opt/app/storage/tmp

# Expose port 3001
EXPOSE 3001

# Set the default command
CMD ["pnpm","start"]