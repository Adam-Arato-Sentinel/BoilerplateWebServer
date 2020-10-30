var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

    connectToServer: function( callback ) {
        //it should be mongodb://(yourip)/(database name)  YOU DON'T REALLY HAVE TO CHANGE ANYTHING ELSE
        MongoClient.connect( 'mongodb://localhost:27017/',{ useUnifiedTopology: true }, function( err, db ) {
            _db = db.db("SampleWebPage");
            console.log("server connected")
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    }
};


