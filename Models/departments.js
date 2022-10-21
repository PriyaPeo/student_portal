const mongoose=require('mongoose');

const department = mongoose.Schema({
    department:String,
    credit:Number,
    per_cred_cost:Number
});


module.exports = mongoose.model('departments', department)