Below are steps for using mongodb

1.  Install mongodb for your system 
2.  Start mongodb and make sure the port 27017 is open and listening (you can see that in the log or in the terminal).
    keep that terminal on.
2.  Open mongo shell
3.  type the following command to set up the database
    1. show dbs                         (use this command to check the number of database)
    2. show collections                 (use this command to see collections in the database)
    3. use robe                         (to create the database..else if you have database that you want to use)
    3. db.createCollection("user")      (to create collection named user)
    4. db.user.insert({email:'roy@gmail.com', password:'123'})      (to insert the data in database)
    5. db.user.find().pretty()          (to show all the o)bjects in the database)
4.  do nmp install in the server directory to install all the required modules
5.   start the frontend using the command [npm start] and backend using the command [node app.js]


