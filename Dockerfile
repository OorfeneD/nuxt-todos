FROM node:14
# Create app directory
WORKDIR /usr/src/app
# ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]