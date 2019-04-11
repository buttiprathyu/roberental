const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/robe'; //without authentication
const fs = require('fs')
//const url ='mongodb://localhost:27017/robedata';
var bcrypt = require('bcrypt');
var multer = require('multer');
var img_dir = "../robe-rental-app/src/assets"
//var img_dir = '/home/roy/Desktop/software_eng_proj/roberental/robe-rental-app/src/assets';

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
		//	console.log(req);
		if (req.query.price == "low") {
			console.log("Low call");
			Robe_image.find().sort({
				"rentPrice": -1,
				"buyPrice": -1
			}).exec(function (err, all_images) {
				if (err) throw err;
				else if (!all_images) {
					var err = new Error('No images');
					err.status = 401;
					return callback(err);
				}
				console.log("show ascending images");
				//	console.log(all_images);
				res.send(all_images);
			})
		} else if (req.query.price == "high") {
			console.log("High call");
			Robe_image.find().sort({
				"rentPrice": 1,
				"buyPrice": 1
			}).exec(function (err, all_images) {
				if (err) throw err;
				else if (!all_images) {
					var err = new Error('No images');
					err.status = 401;
					return callback(err);
				}
				console.log("show descending images");
				//		console.log(all_images);
				res.send(all_images);
			})
		} else if (req.query.size == "S" || req.query.size == "M" || req.query.size == "L") {
			console.log("Small call");
			Robe_image.find({
				"robeSize": req.query.size
			}).exec(function (err, all_images) {
				if (err) throw err;
				else if (!all_images) {
					var err = new Error('No images');
					err.status = 401;
					return callback(err);
				}
				console.log("show descending images");
				//		console.log(all_images);
				res.send(all_images);
			})
		} else if (req.query.size == "S,M,L") {
			console.log("S/M/L call");
			Robe_image.find({
				"robeSize": ['S', 'M', 'L']
			}).exec(function (err, all_images) {
				if (err) throw err;
				else if (!all_images) {
					var err = new Error('No images');
					err.status = 401;
					return callback(err);
				}
				console.log("show descending images");
				//		console.log(all_images);
				res.send(all_images);
			})
		} else {
			Robe_image.find({}, function (err, all_images) {
				if (err) throw err;
				else if (!all_images) {
					var err = new Error('No images');
					err.status = 401;
					return callback(err);
				}
				console.log("show all images");
				//		console.log(all_images);
				res.send(all_images);
			})
		}
	});
})

app.post('/api/imgupload', upload.single('robeImg'), (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		//	console.log("The post request");
		var file_path = 'assets/' + req.file.filename;
		//	console.log(file_path);
		//	console.log(req.file.path);
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
		var myquery = {
			email: req.body.email
		};
		var newvalues = {
			$set: {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				address1: req.body.address1,
				address2: req.body.address2,
				city: req.body.city,
				state: req.body.state,
				zipcode: req.body.zipcode
			}
		};
		User.updateOne(myquery, newvalues, function (err, res) {
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
		//		console.log(req);
		//		console.log(myemail);
		var myquery = {
			email: myemail
		};
		User.findOne(myquery, function (err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});

	});
})

app.post('/api/imgupload', upload.single('robeImg'), (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		//	console.log("The post request");
		var file_path = 'assets/' + req.file.filename;
		//	console.log(file_path);
		//	console.log(req.file.path);
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

app.post('/api/cart', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true
	}, function (err) {
		if (err) throw err;
		console.log(req.body.robeList[0].robeImg);
		console.log(req.body.robeList[0]._id);
		//console.log(req.body.robeList[0].robeImg);
		var mypath = '../robe-rental-app/src/' + req.body.robeList[0].robeImg;
		//console.log(mypath);
		Robe_image.findOneAndDelete({
			"robeImg": req.body.robeList[0].robeImg
		}, function (err, result) {
			if (err) throw err;
			console.log("Deleted bu query");
		});
		fs.unlink(mypath, (err) => {
			if (err) {
				console.error(err)
				return
			}
			console.log("Successfully deleted");
		});

		return res.status(200).json({
			successMsg: 'Successfully deleted',
			token: 'OK'
		})

	});
})
app.listen(3000, () => console.log('Blog server running on port 3000!'))