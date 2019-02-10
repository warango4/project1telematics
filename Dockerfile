FROM node:9.6.1

LABEL version="1.0"
LABEL description="Geolocation app"
LABEL maintainer="Wendy Arango - warango4@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /geolocapp
COPY . ./

EXPOSE 3000
CMD npm start