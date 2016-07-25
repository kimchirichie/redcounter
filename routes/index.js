var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:3001/meteor';

// Use connect method to connect to the server


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/kiss', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('asuka').insertOne({type:"kiss"}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('/');
});


router.get('/lick', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('asuka').insertOne({type:"lick"}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('/');
});


router.get('/sex', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('asuka').insertOne({type:"sex"}, function(err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);
			db.close();
		});
	});

	res.redirect('/');
});

router.get('/stats', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('asuka').count({type:"kiss"}).then(function(kiss) {
			db.collection('asuka').count({type:"lick"}).then(function(lick) {
				db.collection('asuka').count({type:"sex"}).then(function(sex) {
					db.close();
					res.json({kiss:kiss, lick:lick, sex:sex});
				});
			});
		});
	});
	// var data = {kiss:23,lick:10,sex:8};
	// res.json(data);
});



module.exports = router;
