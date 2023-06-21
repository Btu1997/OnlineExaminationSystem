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
         address: {
                type: String,
                required: true
              },
      
},{timestamps:true})


module.exports = mongoose.model("student", studentSchema);