# roberental
Robe Rental - A web application for renting clothes using HTML, CSS, SASS, Angular, NodeJS, ExpressJS, MongoDB, AWS.

Front-End code running and development

1. Download the folder
2. npm install -g @angular/cli  (globally installs angular-cli)
3. Go the folder Run - npm install
4. You should see a folder "node_modules" in your directory - Never commit this folder
5. Run ng serve -o (This should open a browser window with http://localhost:4200)
6. The app should be running
7. Run ng build robe-rental-app (To build the application for deployment purpose in AWS - generates a dist folder)
8. We only deploy the "dist" folder to the AWS for deployment purpose - Never commit this folder
9. Check angular app FAQ if you have any more doubts 


Below are steps for using Mongodb

1. Install mongodb for your system
2. Start mongodb and make sure the port 27017 is open and listening (you can see that in the log or in the terminal). 
    keep that terminal on.
3.Open mongo shell
4. type the following command to set up the database
5. show dbs (use this command to check the number of database)
6. show collections (use this command to see collections in the database)
7. use robe (to create the database..else if you have database that you want to use)
8. db.createCollection("user") (to create collection named user)
9. db.user.insert({email:'roy@gmail.com', password:'123'}) (to insert the data in database)
10. db.user.find().pretty() (to show all the o)bjects in the database)
11. do nmp install in the server directory to install all the required modules
12. start the frontend using the command [npm start] and backend using the command [node app.js]


