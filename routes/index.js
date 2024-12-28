var express = require('express');
var router = express.Router();

const userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
// router.get("/failed", (req, res) => {
//   req.flash("age", 12)
//   res.send("ban gya")
// })
// router.get("/checkkaro", (req, res) => {
//   console.log(req.flash("age"))
//   res.send("check karlo ")
// })
router.get("/create",async (req,res)=> {
 let userdata = await userModel.create({
    username:"rohini",
    nickname:"cupcake",
    description:"nodejs master",
  
    categories:['mommy','node','python','ejs'],
   
  });
  res.send(userdata);
});
router.get("/find",async (req,res)=>{
  var regex = new RegExp("^R",'i'); // TO search like strt with we use ^ and for end with $
  let user = await userModel.find({username:regex});
  res.send(user);
});
router.get("/findall",async (req,res)=>{
  let user = await userModel.find();
  res.send(user);
});
router.get("/query",async (req,res)=>{
  // let user = await userModel.find({categories:{ $all: ['ejs']}});// for specific query or type like array search qualities and all that
  // let user = await userModel.find({categories:{ $exists:true}});  // all data that have categories will show for this input
// (frm loc 38and 39 categgeries search) 

  // var date1= new Date('2024-11-27');
  // var date2= new Date('2024-12-27');
  // let user = await userModel.find({datecreated:{$gte: date1,$lte:date2}});
  // (frm LOC 41 to 44)date query $lte for less than equal to and same $gte as greater than equaal to 
 
 let user = await userModel.find({
    $expr:{
      $and: [
        {$gte:[{$strLenCP: '$nickname'},0 ]},
        {$lte:[{$strLenCP: '$nickname'},6 ]},
        
      ]
    }
  })
  // frm (LOC 47 to 56)numbers of letters query search
  res.send(user);
});

module.exports = router;
