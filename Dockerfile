FROM node:20-alpine

RUN addgroup -S dimdimgroup && adduser -S dimdimuser -G dimdimgroup
WORKDIR /usr/src/dimdimapp
COPY package*.json ./
RUN npm install --omit=dev
COPY src ./src
RUN chown -R dimdimuser:dimdimgroup /usr/src/dimdimapp
ENV PORT=3000
USER dimdimuser
EXPOSE 3000
CMD ["npm", "start"]
