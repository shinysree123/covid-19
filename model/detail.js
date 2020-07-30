var Mongoose=require('mongoose');
const covidSchema= new Mongoose.Schema({
    name_id :{
        type:String
    },
    address:{
        type:String
    },
    age:{
        type:Number
    },
    sex:{
        type:String
    },
    phonenumber:{
        type:Number
    }
});
var covidModel= Mongoose.model('covid',covidSchema);
module.exports={covidModel}