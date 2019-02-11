# project1telematics

This application in meant to be used to track users position, save them and let them visualize 
those saved routes later.

## Getting started

To use this application as a copy, you have to make sure your machine has installed docker-compose, 
nodejs, mongodb and ngninx.

Each operating system has its own requirements. But, as this is not the topic, you can check on 
official pages for further information.

Besides that, you have to have npm.

### Prerequisites

```
 - npm
 - docker-compose
 - nodejs
 - mongodb
 - nginx
```
### Node modules
There are plenty node modules used for the app to run.
There is a directory with all of them, but if you want (and need) to install them, you can do it by using:
```
 npm i express express-handlebars express-session method-override mongoose passport passport-local \
 bcryptjs connect-flash nodemon socket.io --save
```
### Deployment
After cloning the repo
```
 $ git clone https://github.com/warango4/project1telematics.git
```
go to the directory
```
 $ cd project1telematics
```
and build the app with docker-compose
```
 $ docker-compose up --build 
```
For that last command you may need to be super user. 

If you want to test it without docker and nginx, you can type in your terminal:
```
 $ npm run start
```
and then visit http://localhost:3000

It's important for you to know the app is going to run through port 3000.
If you want to change this, go to src/index.js line 20
```
 application.set('port', process.env.PORT || 3000)
```
and set the port you want it to run through. 