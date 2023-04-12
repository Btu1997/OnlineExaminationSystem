const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
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
        Gender :{
            type :String,
            required: true,
            enum: ["Male","Female","Others"]
             },

    DateOfBirth:{
        type: Date,
        requried: true
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
        phone: {
            type:String, 
            required:true,
            unique:true,
            trim:true
        }, 
        profileImage: {
            type:String, 
            required:true,
            trim:true
        }, // s3 link
      
       
        address: {
         current: {
            street: {type:String,required:true,trim:true},
            city: {type:String,required:true,trim:true},
            pincode: {type:Number,required:true,trim:true}
          },
          permanent: {
            street: {type:String,required:true,trim:true},
            city: {type:String,required:true,trim:true},
            pincode: {type:Number,required:true,trim:true}
          }
      }
},{timestamps:true})


module.exports = mongoose.model("student", studentSchema);