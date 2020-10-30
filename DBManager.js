mongoUtil = require("./DBConnection")
mongoUtil.connectToServer((err)=>{
    console.log(err)
    db = mongoUtil.getDb();
});


//insert will be the most important. Doc is the document name, value is the json and cb is the callback.
exports.insert=function(doc,value,cb){
    // MongoClient.connect(url, function(err, db) {

    db.collection(doc).insertOne(value, function (err, result) {
        if(err)throw err;
        cb(result);
        // db.close();
    });
};

exports.upsert=function(doc,id,value,cb){
    db.collection(doc).update({id: id},{$set: value}, upsert=true, function (err, result) {
        if(err)throw err;
        cb(result);
    });
};


exports.findOne=function(doc,value,cb){
    try{
        db.collection(doc).findOne(value,(err,result)=>{
            if(err)throw err;
            cb(result)
        });
        //});
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
}

exports.find=function(doc,value,cb){
    try{
        db.collection(doc).find(value).toArray((err,result)=>{
            if(err)throw err;
            cb(result)
        });
        //});
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
};

exports.getAnswers=function(search,callback){
    try{
        // MongoClient.connect(url, function(err, db) {
        db.collection("answers").aggregate([
            // Unwind the source

            {"$match":search},
            { "$lookup": {
                    "from": "users",
                    "localField": "username",
                    "foreignField": "username",
                    "as": "userdata",

                }},



            {"$project": {"userdata":{"username":0,"password":0,"session":0,"uid":0,"email":0,"status":0} }},
            { "$unwind": "$userdata" },
            // _id : 0,
            //  {"$project": {"userdata":{_id : 0,"score":1}}},


            //   {"$match":{username:"marc"}},

        ],function(err, doc) {
            callback(doc,err);
            //db.close();
        });
        //});
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
};


/*
exports.getOne=function(search,dbDocument,callback){
    try{
        // MongoClient.connect(url, function(err, db) {
        db.collection("items").findOne(search,function(err, doc) {
            callback(doc,err);
            //db.close();
        });
        //});
    }catch(err){
        console.error(err);
        callback(undefined,err);
    }
};
*/


exports.get=function(search,dbDocument,callback){
    // MongoClient.connect(url, function(err, db) {
    db.collection(dbDocument).find(search).toArray(function(err, doc) {
        callback(doc,err);
    });
};

//db.getCollection('spaces').aggregate([{$match : {catagory:"general"}},{ $sample: { size: 1 } }])


exports.getRand=function(search,dbDocument,count,callback) {

    // MongoClient.connect(url, function(err, db) {

    db.collection(dbDocument).aggregate([{$match : search},{ $sample: { size: count } }],function(err, doc){

        callback(doc,err);
        // db.close();
    });
};
