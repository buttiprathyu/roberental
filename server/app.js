const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/robe'; //without authentication
//const url ='mongodb://localhost:27017/robedata';
var bcrypt = require('bcrypt');
const User = require('./model/user');
const Robe_image = require('./model/robe_image');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

const saltrounds = 3;
//app.listen(3000, () => console.log('Blog server running on port 3000!'))

app.post('/api/signup', (req, res) => {
	console.log("Hekki");
	mongoose.connect(url, function (err) {
		if (err) throw err;

		var password = req.body.password;

		bcrypt.hash(password, saltrounds)
			.then(function (hashedPassword) {
				console.log("saving hashed password");
				const user = new User({
					email: req.body.email,
					password: hashedPassword
				})
				user.save((err, res) => {
					console.log(err);
					if (err) throw err;
					console.log("saving");
				})
			})
			.then(function () {
				res.send();
			})
			.catch(function (error) {
				console.log("Error saving user: ");
				console.log(error);
				next();
			});


		console.log("Update");
		return res.status(200).json({
			successMsg: 'Successfully Created',
			token: 'OK'
		})
	});
})



app.post('/api/login', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		if (err) throw err;
		var myemail = req.body.email;
		var mypassword = req.body.password;
		User.findOne({
			email: myemail
		}, function (err, user) {
			if (err) throw err;
			else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(mypassword, user.password, function (err, result) {
				if (result == true) {
					console.log("Success\n");
					return res.status(200).json({
						successMsg: 'Successfully login',
						token: 'OK'
					})
				} else {
					console.log("Incorrect Password");
					return res.status(400).json({
						errorMsg: 'Incorrect Password'
					})
				}

			})
		})
	});

})

app.get('/api/robeList', (req,res)=>{
	mongoose.connect(url,{
		useNewUrlParser: true
	}, function (err){
		console.log("I can send");
	});
})


app.listen(3000, () => console.log('Blog server running on port 3000!'))
/*
app.post('/api/login', (req, res) => {

	mongoose.connect(url,{ useNewUrlParser: true } , function(err){
		if(err) throw err;
		User.find({
			email : req.body.email, password : req.body.password
		}, function(err, user){
			if(err) throw err;
			if(user.length === 1){	
				console.log("Success\n");
				return res.status(200).json({
					successMsg:'Successfully login',
					token:'OK'
				})
			} else {
				console.log(req.body.email);
				console.log("fail\n");
				console.log(req.body.password);
				return res.status(400).json({
					errorMsg: 'Something went wrong. Please Try Again'
				})
			}
		})
	});
	
})

/*
app.post('/api/signup', (req, res) => {
	mongoose.connect(url, function(err){
		if(err) throw err;
		const user = new User({
			email: req.body.email,
			password: req.body.password
		})
		console.log("Update");
		user.save((err, res) => {
			console.log(err);
			if(err) throw err;
			console.log("saving");
		})
		return res.status(200).json({
			successMsg: 'Successfully Created',
			token:'OK'
		})
	});
})
*/

//app.listen(3000, () => console.log('Blog server running on port 3000!'))

/*
User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
});
*/