var express = require('express');
var router = express.Router();

var db = require('../DBManager.js')

/* GET home page. */
router.get('/page2', function(req, res, next) {
  res.render('index', { title: 'example Page 2' });
});

router.get('/', function(req, res, next) {
  res.render('input', { title: 'Express' });
});

router.post("/dbTest",(req,res,next)=>{
  res.send("coolio")
})

/*
router.post("/inventory",(req,res,next)=>{
  console.log(req.body)
  db.insert("items", req.body, function (result){
    res.send(result)
  })
})
 */

router.post("/inventory",(req,res,next)=>{
  console.log(req.body)
  db.upsert("items", req.body.id ,req.body, function (result){
    res.send(result)
  })
})


router.get("/inventory",(req,res,next)=>{

  db.find("items",req.body,(result)=>{
    res.send(result)
  })

})


module.exports = router;
