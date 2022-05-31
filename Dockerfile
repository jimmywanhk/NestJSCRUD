FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
# COPY package.json yarn.lock* ./
RUN npm install -g @nestjs/cli
RUN yarn install


# Exports
EXPOSE 3000
CMD [ "yarn", "start:dev" ]