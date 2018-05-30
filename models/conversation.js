var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Conversation = new Schema({
id:{
 type:String,
 required:false
},
timestamp:{
 type:Date,
 required:false
},
lang:{
    type:String,
    required:false
   },
result:[{
    source:String,
    resolvedQuery:String,
    speech:String,
    action:String,
    actionIncomplete:Boolean,
    parameters:{},
    contexts:[],
    metadata:[],
    fulfillment:[],
    score:Number
   }],
   created: { 
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model('Conversation', Conversation);