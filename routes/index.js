var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function(req, res, next) {
  res.render('todo', { title: 'todos' });
});

router.get('/todo/api', function(req, res, next) {
  res.json('[]');
});

router.get('/todo/api/todos', function(req, res, next) {  
 //Disable caching for content files
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);

  var db = req.db;
  var collection = db.get('todolist');  
  collection.find({},{},function(e,docs){      
      res.json(docs);
  });
});

router.post('/todo/api/todos', function(req, res) {
    var db = req.db;
    var collection = db.get('todolist');	
    collection.insert(req.body, function(err, result){		
        res.send(
            (err === null) ? { msg: '', id:result._id } : { msg: err }
        );
    });
});

router.put('/todo/api/todos/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('todolist');	
	collection.update({_id: req.params.id }, req.body);
    res.json('');
});

router.delete('/todo/api/todos', function(req, res) {	
    var db = req.db;
    var collection = db.get('todolist');    
	collection.remove( {completed: true });
	res.json('');
});

router.delete('/todo/api/todos/:id', function(req, res) {	
    var db = req.db;
    var collection = db.get('todolist');    
	collection.remove( {_id: req.params.id });
	res.json('');
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});



/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
