const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
        fname: {
            type:String, 
            required:true,
            trim:true
        },
        lname: {
            type:String, 
            required:true,
            trim:true
        },
             email: {
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password: {
            type:String, 
            required:true,
            trim:true
        }, // encrypted password

        emp_id:{
            type :String,
            required:true,
            unique:true
        },
        phone: {
            type:String, 
            required:true,
            unique:true,
            trim:true
        }, 
       
        address: {
         current: {
            street: {type:String,required:true,trim:true},
            city: {type:String,required:true,trim:true},
            pincode: {type:Number,required:true,trim:true}
          },
          isDeleted:{
            type:Boolean,
            default :false
          }

          }
},{timestamps:true})


module.exports = mongoose.model("admin", adminSchema);