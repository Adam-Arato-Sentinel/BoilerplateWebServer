var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
//var db = require('../DBManager.js')
fs = require('fs');
filename = "data.txt"

/* GET home page. */
router.get('/page2', function(req, res, next) {
  res.render('index', { title: 'example Page 2' });
});
router.get('/button', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/resource",(req,res,next)=>{
  var data = JSON.stringify(req.body);
  fs.writeFile(filename, data, ()=>{
    res.send(data+ " was saved")
  })

})

router.put("/resource",(req,res,next)=>{
  var data = JSON.stringify(req.body);
  fs.appendFile(filename, data, ()=>{
    res.send(data+ " was appended")
  })
})

router.delete("/resource",(req,res,next)=>{

  fs.writeFile(filename, "", ()=>{
    res.send("file was wiped")
  })
})
router.get("/resource",(req,res,next)=>{
  fs.readFile(filename, 'utf8',(err,data)=>{
    res.send(JSON.stringify(data))
  })

})


/*
router.post("/inventory",(req,res,next)=>{
  console.log(req.body)
  db.insert("items", req.body, function (result){
    res.send(result)
  })
})
 */
/*
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

 */


module.exports = router;
