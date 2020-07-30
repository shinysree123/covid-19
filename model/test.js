var Mongoose=require('mongoose');
const testSchema= new Mongoose.Schema({
    user_id :{
        type:String
    },
    test_result:{
        type:String
    },
    date:{
        type:Number
    },
    verified_dr:{
        type:String
    }
});
var testModel= Mongoose.model('results',testSchema);
module.exports={testModel}