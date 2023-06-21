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
            type: String,
            required: true
          },
          
          isDeleted:{
            type:Boolean,
            default :false
          }
        

        
},{timestamps:true})


module.exports = mongoose.model("admin", adminSchema);