# filmlyBackend
A server-side application that provides API to communicate with MongoDB database powered by Node.js and Express.js. This is a backend application for [filmlyApp](https://github.com/patgrajkowski/filmlyApp.git).
## Demo
API works inside docker on Heroku https://filmlybackend.herokuapp.com/
## Routes
### Auth
```POST /api/auth/``` expects email and password for authentication if the user with a certain combination of email and password exists then provides JSON web token.
### Comments
``` GET /api/comments ``` provides comments collection.\
``` GET /api/comments/movie/:movieID ``` provides comments that are related to a movie with movieID.\
``` POST /api/comments/movie/:movieID ``` expects ``` { comment: yourComment } ``` as body of the request and valid jsonWebToken in headers ``` { x-auth-token: yourToken } ```, adds comment to movie with movieID in database.
### Movies
``` GET /api/movies ``` provides movies collection\
``` GET /api/movies/:movieID ``` provides movies with that have movieID as _id in database.\
``` POST /api/movies/:movieID ``` expects 
```  
title: yourMovieTitle
genre: yourMovieGenre
director: yourMovieDirector
length: yourMovieLength
rate: yourMovieRate
plot: yourMoviePlot
actors: yourMovieActors array
img: yourMovieImgURL
``` 
as the body of the request and valid JSON web token in headers ``` { x-auth-token: yourToken } ``` checks if the user related to the provided token is admin and if it adds a movie to the database.\
``` PUT /api/movies/:movieID ``` expects 
```  
title: yourMovieTitle
genre: yourMovieGenre
director: yourMovieDirector
length: yourMovieLength
rate: yourMovieRate
plot: yourMoviePlot
actors: yourMovieActors array
img: yourMovieImgURL
``` 
as the body of the request and valid JSON web token in headers ``` { x-auth-token: yourToken } ``` checks if the user related to the provided token is admin and if it edits the movie with movieID.\
``` DELETE /api/movies/:movieID ``` expects valid JSON web token in headers ``` { x-auth-token: yourToken } ``` checks if a user related to the provided token is admin and if it deletes the movie with movieID from the database.
### Users
``` GET /api/users/ ``` provides users collection, expects valid admin JSON web token in headers ``` { x-auth-token: yourToken } ```.\
``` POST /api/users/ ``` expects 
```
nickname: #userNickname,
email: #userEmail,
password: #userPassword,
avatar: #userAvatar,
```
and creates a user in the database, created user will have a hashed password.\
``` DELETE /api/users/:userID ```  expects valid JSON web token in headers ``` { x-auth-token: yourToken } ``` checks if the user related to the provided token is admin and if it deletes the user with userID from the database.
## Usage
You can use this app in live or locally on your device.\
In order to run this app you will need Node.js and npm. You should also provide environmental variables.
```bash
#Setup environment variables
export JWT_SECRET= #Your jsonWebToken
export MONGO_URL= #Url to MongoDB database
#Clone this repository
git clone https://github.com/patgrajkowski/filmlyBackend.git
#Go into repository
cd filmlyBackend/app
#Download dependencies
npm install
#Run
node index.js
```
