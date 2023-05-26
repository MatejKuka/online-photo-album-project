OPA (Online photo album)

The link to the deployed project:
https://lucky-semolina-44ac39.netlify.app/

--Project description--

This is a simple server-less web application, where you create an account and sort your favorite photos into albums. 
It consists of the main page where you can see all your albums and do CRUD methods. Each album can be then opened with its pictures nicely laid out in a grid.
Then there is a profile page where the user can do basic actions related to profile management 

--Tech stack--

Front-end is built with react
We store our data using Firebase storage
For cloud functions, we also use Firebase Cloud Functions
Authentification is handled by Firebase Authentification
To handle HTTPS requests in the front-end we use AXIOS (npm install axios)
And to run the app, emulators for cloud functions are needed (npm install -g firebase-tools)

--Functionality--

User is presented by a login page where he/she can sign up or log in, in case of signing in he/she will receive a mail confirming the successful creation of a new account. 
When a user is logged in, he/she is presented with their main page with all their albums. User can only get to this page after logging in and that is done by routing so that non-logged user will not be able to get to this page. If they would try to send a get of post request (for example using postman), we set up read/write rules, that only allow read/write if the user.uid is not null and the same applies for the auth.token 
==(our use of firebase authentification and setting up rules).==

Albums and photos are stored in Firebase storage, one slightly important thing is that the first photo will carry the name of the album. Each photo has its id, only the first one has the name of the album and id (which is separated from id by a dash). 
==(our use of firebase storage)==

When user creates or deletes his/her profile he will receive a mail notifying about such an action and that is handled by our cloud function. ONLINE-PHOTO-ALBUM-PROJECT -> functions -> index.js
==(our use of firebase cloud functions)==

