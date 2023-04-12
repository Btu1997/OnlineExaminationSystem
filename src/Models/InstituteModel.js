const mongoose = require('mongoose')


const instituteSchema = new mongoose.Schema({
        institute_Name: {
            type:String, 
            required:true,
            trim:true
        },
        instituteId:{
            type : String,
            required : true,
            unique: true
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
            trim:true,
        }, // encrypted password
        phone: {
            type:String, 
            required:true,
            unique:true,
            trim:true
        }, 
        address: {
             street: {type:String,required:true,trim:true},
            city: {type:String,required:true,trim:true},
            pincode: {type:Number,required:true,trim:true}
          
      }
},{timestamps:true})


module.exports = mongoose.model("institute", instituteSchema);