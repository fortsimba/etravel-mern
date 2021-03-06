const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const assert = require("assert");
var fs = require('fs');
var mongojs = require('mongojs');
var dbjs = mongojs('etravel');

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/etravel";
mongoose.connect(MONGO_URI, {useNewUrlParser: true})
        .then(console.log(`MongoDB connected ${MONGO_URI})`))
        .catch(err => console.log(err));



//insert hotels to mongodb if they are not already present
dbjs.hotel.find(function(err, docs){
    if(!docs.length){
      fs.readFile('../client/public/hotel_data.json', 'utf8', function (err, data) {
          if (err) throw err;
          var json = JSON.parse(data);

          dbjs.hotel.insert(json, function(err, doc) {
              if(err) throw err;
          });
      });
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: "not doing this at all",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.get("/api/hotel_all", function(req, res){
  dbjs.hotel.findOne({},{"hotels.uniq_id": 1, "hotels.property_name": 1, "hotels.per_person_price":1, "hotels.hotel_star_rating":1, "hotels.image_urls": 1, "hotels.city": 1},async function(err, docs){
    if(err) throw err;
    await res.json(docs);
  });
});

app.get("/api/hotel_import", async function(req,res){
  dbjs.hotel.findOne({"hotels.uniq_id": req.query.id},{"hotels.$":1}, function(err, docs){
    if(err) throw err
    if(docs)
    {
      res.json(docs.hotels)
    }
  });
});

app.use("/api/auth", auth);
app.get("/api/profile_import", function(req, res){
  dbjs.users.findOne({"_id": mongojs.ObjectId(req.query.uid)}, async function(err, docs){
    if(err) throw err;
    await res.json(docs);
  });
  // MongoClient.connect(MONGO_URI, function(err, db) {
  //       if (err) throw err;
  //       db.db("ecommerce").collection("users").findOne({"_id": ObjectId(req.query.uid)},
  //       async function(err, result) {
  //           if (err) throw err;
  //           await res.json(result);
  //           db.close();
  //       });
  //   });
});
app.use("/api/profile_update", profile);
app.route("/api/wishlist").post((req,res,next) => {
  if(req.body.mode=="add"){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.user)}, {$push: {'wishlist':req.body.product}});
  }
  else{
    dbjs.users.update({_id:mongojs.ObjectId(req.body.user)}, {$set: {'wishlist':[]}});
    for(var i=0;i<req.body.arr.length;i++){
      dbjs.users.update({_id:mongojs.ObjectId(req.body.user)}, {$push: {'wishlist':req.body.arr[i]}});
    }
  }
  // dbjs.on('error', function(err){
  //   return res.status(400).json({errors:"Database error! Records not updated"})
  // })
  return res.status(200).json({success:"Succesfully updated records!"})


}).get((req,res) => {
  dbjs.users.findOne({_id: mongojs.ObjectId(req.query.uid)}, async function(err, docs){
    if(err) throw err;
    await res.json(docs.wishlist);
  });
})

app.route("/api/details").post((req , res ) => {
        dbjs.comments.update({'_id': req.body.product} ,{ $push: {
            'name': req.body.inp_name,
            'rate': req.body.inp_rating,
            'comment': req.body.inp_comment}},
          { upsert : true })
          dbjs.on('error', function(err){
            return res.status(400).json({errors:"Database error! Records not updated"})
          })
        return res.status(200).json({success:"Succesfully updated records!"})

  }).get(function( req , res ) {
    dbjs.comments.find({_id: req.query._id}, async function(err, docs){
      if(err) throw err;
      await res.json(docs);
    });
  })

app.route("/api/booking").post((req,res)=>{
  dbjs.users.update({'_id' : ObjectId(req.body.id)},{ $push: {
    'hotel' : req.body.hotel_name,
    'hotel_id' : req.body.hotel_id,
    'room_type' : req.body.room_type,
    'no_rooms' : req.body.no_rooms,
    'checkin' : req.body.checkin,
    'checkout' : req.body.checkout,
    'total' : req.body.total
  }},{ upsert : true })
  return res.status(200).json({success:'Booking Confirmed'})
}).get(function(req,res) {
  dbjs.users.find({_id: mongojs.ObjectId(req.query.uid)},async function(err , docs){
    if(err) throw err;
    await res.json(docs);
  })
}
)
var child = /\bkids' meals\b|\bgame room\b/
var family = /\binterconnected rooms available\b|\bpool\b/
var business = /\bmeeting rooms\b|\bconference facilities\b/
var breakfast = /\bbreakfast\b/
var smoking = /\bsmoking\b/
var nonSmoking = /\bnon-smoking\b/
app.route('/api/featureSearch').get(function(req,res){
  dbjs.hotel.find({},{"hotels.uniq_id": 1,"hotels.room":1, "hotels.hotel":1}, async function(err, docs){
    if(err) throw err;
    var hotelList = docs[0].hotels
    hotels = []
    if(req.query.mode=="child"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(child)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    if(req.query.mode=="family"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(family)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    if(req.query.mode=="business"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(business)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    if(req.query.mode=="breakfast"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(breakfast)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    if(req.query.mode=="smoking"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(smoking)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    if(req.query.mode=="noSmoking"){
      for(var i=0;i<hotelList.length;i++){
        var str = docs[0].hotels[i].room.join(" ").toLowerCase()+docs[0].hotels[i].hotel.join(" ").toLowerCase();
        found = str.match(smoking)
        if(found){
          hotels.push(docs[0].hotels[i].uniq_id)
        }
      }
    }
    res.json(hotels)
  })
})


app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!\n\n\n\n\n\n\n`));
