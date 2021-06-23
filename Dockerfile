FROM node:lts AS client-phase
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:lts AS server-phase
WORKDIR /root/
COPY --from=client-phase /usr/src/app/client/build ./client/build
COPY server/ ./server/
RUN cd server && npm install
COPY server/app.js ./server/

EXPOSE 5000

CMD ["node", "./server/bin/www"]