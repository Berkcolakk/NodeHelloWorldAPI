import { MongoClient } from "mongodb";
const DBName = "MyDB";
const URL = "mongodb://localhost:27017";
export const InsertMany = (CollectionName, DataCollection) => {
  MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    try {
      var dbo = db.db(DBName);
      var myobj = [
        { name: "John", address: "Highway 71" },
        { name: "Peter", address: "Lowstreet 4" },
        { name: "Amy", address: "Apple st 652" },
        { name: "Hannah", address: "Mountain 21" },
        { name: "Michael", address: "Valley 345" },
        { name: "Sandy", address: "Ocean blvd 2" },
        { name: "Betty", address: "Green Grass 1" },
        { name: "Richard", address: "Sky st 331" },
        { name: "Susan", address: "One way 98" },
        { name: "Vicky", address: "Yellow Garden 2" },
        { name: "Ben", address: "Park Lane 38" },
        { name: "William", address: "Central st 954" },
        { name: "Chuck", address: "Main Road 989" },
        { name: "Viola", address: "Sideway 1633" },
      ];
      dbo.collection("customers").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      });
    } catch (exception) {
      throw exception;
    } finally {
      // db.close();
    }
  });
};
export const Insert = (CollectionName, Data) => {
  MongoClient.connect(URL, (err, db) => {
    if (err) throw err;
    try {
      var dbo = db.db(DBName);
      var myobj = { name: "John", address: "Highway 71" };
      dbo.collection("customers").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      });
    } catch (exception) {
      throw exception;
    } finally {
      db.close();
    }
  });
};
export const GetById = (CollectionName, FindObj) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      var dbo = db.db(DBName).collection(CollectionName);
      dbo.find(FindObj).toArray((err, arr) => {
        resolve(arr);
      });
    });
  });
};
export const GetAll = (CollectionName) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, db) => {
      if (err) throw err;
      var dbo = db.db(DBName).collection(CollectionName);
      dbo.find({}).toArray((err, arr) => {
        resolve(arr);
      });
    });
  });
};
