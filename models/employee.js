var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Employee = new Schema({
name:{
 type:String,
 required:false
},
designation:{
 type:String,
 required:false
},
empId:{
    type:String,
    required:false
   },
dob:{
    type:String,
    required:false
   }
});
module.exports = mongoose.model('Employee', Employee);