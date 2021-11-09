FROM node:12.18.1
# Create app directory
WORKDIR /usr/src/app
# ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./
# RUN npm install --global yarn
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]