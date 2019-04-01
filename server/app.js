const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/robe'; //without authentication
//const url ='mongodb://localhost:27017/robedata';
var bcrypt = require('bcrypt');
var multer = require('multer');
var img_dir = '/home/roy/Desktop/software_eng_proj/roberental/robe-rental-app/src/assets';
var upload = multer({
	dest: img_dir
});

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
					password: hashedPassword,
					firstname: req.body.firstname,
					lastname: req.body.lastname
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

app.get('/api/robeList', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		Robe_image.find({}, function (err, all_images) {
			if (err) throw err;
			else if (!all_images) {
				var err = new Error('No images');
				err.status = 401;
				return callback(err);
			}
			console.log("show all images");
			console.log(all_images);
			res.send(all_images);
		})
	});
})

app.post('/api/imgupload', upload.single('robeImg'), (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		console.log("The post request");
		var file_path = 'assets/' + req.file.filename;
		console.log(file_path);
		console.log(req.file.path);
		const robe_image = new Robe_image({
			email: req.body.email,
			robeTitle: req.body.robeTitle,
			robeImg: file_path,
			rentPrice: req.body.rentPrice,
			buyPrice: req.body.buyPrice,
			robeSize: req.body.robeSize,
			robeMaterialDesc: req.body.robeMaterialDesc,
			robeMaterial: req.body.robeMaterial,
			robeCare: req.body.robeCare
		});
		robe_image.save((err, res) => {
			console.log(err);
			if (err) throw err;
			console.log("Image saving");
		})
		return res.status(200).json({
			successMsg: 'Successfully Uploaded',
			token: 'OK'
		})
	});
})

app.post('/api/myaccount', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		if (err) throw err;
		var myemail = req.body.email;
		var myquery = { email: req.body.email };
		var newvalues = { $set: {firstname: req.body.firstname, lastname: req.body.lastname, address1:req.body.address1,
			address2:req.body.address2, city:req.body.city, state:req.body.state, zipcode: req.body.zipcode } };
			User.updateOne(myquery, newvalues, function(err, res) {
				if (err) throw err;
				console.log("Account updated");
			  });
			  
			  return res.status(200).json({
				successMsg: 'Successfully Updated',
				token: 'OK'
			})
	});
})

app.get('/api/myaccount', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		if (err) throw err;
		var myemail = req.query.email;
		console.log("In get call");
		console.log(req);
		console.log(myemail);
		var myquery = { email: myemail };
		User.findOne(myquery, function(err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		  });
		 
	});
})

/*
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname:{ type: String, required: true },
  lastname:{ type: String, required: true },
  address1:{ type: String},
  address2:{ type: String},
  city:{ type: String},
  state:{ type: String},
  zipcode:{ type: Number}
*/
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