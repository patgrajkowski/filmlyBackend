# filmlyBackend
A server side application that provied API to communicate with mongoDB database.
## Demo
API works life inside docker on Heroku https://filmlyapp.herokuapp.com/filmy
## Routes
### Auth
```POST /api/auth/``` expects email and password for authentication if user with certain combination of email and password exists then provides jsonWebToken.
### Comments
``` GET /api/comments ``` provides comments collection\
``` GET /api/comments/movie/:movieID ``` provides comments that are related to movie with movieID\
``` POST /api/comments/movie/:movieID ``` expects ``` { comment: yourComment } ``` as body of the request and valid jsonWebToken in headers ``` { x-auth-token: yourToken } ```, adds comment to movie with movieID in database
### Movies
``` GET /api/movies ``` provides movies collection\
``` GET /api/movies/:movieID ``` provides movies with that have movieID as _id in database\
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
as body of the request and valid jsonWebToken in headers ``` { x-auth-token: yourToken } ``` checks if user related with provided token is admin and if it is adds movie to database\
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
as body of the request and valid jsonWebToken in headers ``` { x-auth-token: yourToken } ``` checks if user related with provided token is admin and if it is edits movie with movieID\
``` DELETE /api/movies/:movieID ``` expects valid jsonWebToken in headers ``` { x-auth-token: yourToken } ``` checks if user related with provided token is admin and if it is deletes movie with movieID from database
### Users
``` GET /api/users/ ``` provides users collection, expects valid admin jsonWebToken in headers ``` { x-auth-token: yourToken } ```\
``` POST /api/users/ ``` expects 
```
nickname: #userNickname,
email: #userEmail,
password: #userPassword,
avatar: #userAvatar,
```
and creates user in database, created user will have hashed password\
``` DELETE /api/users/:userID ```  expects valid jsonWebToken in headers ``` { x-auth-token: yourToken } ``` checks if user related with provided token is admin and if it is deletes user with userID from database
## Usage
You can use this app in live or localy on your device.\
In order to run this app you will need Node.js and npm. You should also provide enviroment variables.
```bash
#Setup enviroment variables
export JWT_SECRET= #Your jsonWebToken
export MONGO_URL= #Url to mongodb database
#Clone this repository
git clone https://github.com/patgrajkowski/filmlyBackend.git
#Go into repositorty
cd filmlyBackend/app
#Download dependencies
npm install
#Run
node index.js
```
