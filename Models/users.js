const mongoose=require('mongoose');

const  user = mongoose.Schema({
    fullname:String,
    phonenumber: Number, ///login/account phone number
    phoneNumber: Number, ///info phone number
    // department:

    department:String,
    sscpoint:String,
    hscpoint:String,
    password:String,
    active_status:{type:Boolean,default:false}
});


// const department = mongoose.Schema({
//     department:String,
//     credit:Number,
//     per_cred_cost:Number
// });


module.exports = mongoose.model('users', user)
