const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://admin:BehYTcgGEPoPtYHJYPj4PEMV@ds139951.mlab.com:39951/lamonby-web-assets";
const dbName = "lamonby-web-assets";

var categories = [];
var db;

const findDocuments = function(db, callback) {
    db.collection('assets').find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        let result = [];
        docs.forEach(function (item) {
            result.push(item.category)
        });
        callback(result);
    });
};

const uploadDocument = function(data) {
    db.collection('assets').insert(data)
};

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    db = client.db(dbName);

    findDocuments(db, function(data) {
        categories = data;
        //client.close();
    });
});

const getCategories = () => categories.filter(function(item, pos){
    return categories.indexOf(item)== pos;
});

module.exports = {
    getCategories,
    uploadDocument
};
// password
// BehYTcgGEPoPtYHJYPj4PEMV
// username
// admin

// mongo ds139951.mlab.com:39951/lamonby-web-assets -u admin -p BehYTcgGEPoPtYHJYPj4PEMV

//db.assets.insert({"homepage": {"images": {1: {imgSrc: "/assets/homepage/IMG_0001.jpg", category: 'wildlife', keywords: []}, 2: {imgSrc: "/assets/homepage/IMG_0026.jpg", category: 'landscapes', keywords: []}}}})

// 5b4dcc1a71ce34758641f2e1

// db.assets.homepage.images.insert(
//     {
//         3: {imgSrc: "/assets/homepage/IMG_0051.jpg", category: "wildlife", keywords: []}
//     }
// )