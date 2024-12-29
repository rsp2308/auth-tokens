// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// module.exports = router;
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/express");

const userSchema = mongoose.Schema({
  username:String,
  nickname:String,
  description:String,

  categories:{
    type:Array,
    default:[]
  },
  datecreated:{
    type:Date,
    default:Date.now()
  }
});
userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);
