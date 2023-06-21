const studentModel= require("../Models/studentsModel")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const {isValid,isValidName,isvalidEmail,isvalidMobile,isValidPassword,validString}= require("../validator/validation")

const  createStudent = async function (req, res) {
    try {
        const data = req.body

      

        const { fname, lname, Gender,DateOfBirth,email,password, phone,  address } = data

        if (!isValid(fname)) return res.status(400).send({ status: false, message: "fname is mandatory and should have non empty String" })

        if (!isValidName.test(fname)) return res.status(400).send({ status: false, message: "Please Provide fname in valid formate and Should Starts with Capital Letter" })

        if (!isValid(lname)) return res.status(400).send({ status: false, message: "lname is mandatory and should have non empty String" })

        if (!isValidName.test(lname)) return res.status(400).send({ status: false, message: "Please Provide lname in valid formate and Should Starts with Capital Letter" })
        if(!Gender) return res.status(400).send({status:false,message:"Gender is required and should have among Male,Female,Others"})
        if(!DateOfBirth) return res.status(400).send({status:false,message:"DateOfBirth is required "})
       
        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is mandatory and should have non empty String" })

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email should be in  valid Formate" })

        if (await studentModel.findOne({ email })) return res.status(400).send({ status: false, message: "This email is already Registered Please give another Email" })

       
      
        if (!isValid(password)) return res.status(400).send({ status: false, message: "Password is mandatory and should have non empty String" })

        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15" })
       
        if (!isValid(phone)) return res.status(400).send({ status: false, message: "Phone is mandatory and should have non empty Number" })

        if (!isvalidMobile.test(phone)) return res.status(400).send({ status: false, message: "please provide Valid phone Number with 10 digits starts with 6||7||8||9" })

        if (await studentModel.findOne({ phone })) return res.status(400).send({ status: false, message: "This Phone is already Registered Please give another Phone" })

        if (!isValid(address)) return res.status(400).send({ status: false, message: "Address is mandatory" })

       
        const encyptPassword = await bcrypt.hash(password, 10)

        let obj = {
            fname, lname, Gender,DateOfBirth,email,password:encyptPassword, phone,  address 
        }

        const newStudent = await studentModel.create(obj)

        return res.status(201).send({ status: true, message: "User created successfully", data: newStudent })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const studentLogin = async function (req, res) {
    try {
        let studentEmail = req.body.email
        let password = req.body.password
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!isValid(studentEmail)) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        if (!emailValid.test(studentEmail)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
     
        let studentDetails = await studentModel.findOne({ email: studentEmail.trim()})
        if (!studentDetails) {
            return res.status(401).send({ status: false, error: "Email is Invalid Please try again !!" })
        }
        const verifyPassword = await bcrypt.compare(password, studentDetails.password)
        if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })
 
        let token = jwt.sign(
            {
                userId: studentDetails._id.toString(),
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 50*60*60
            },
            "this is very very secret key of onlineExaminationSystem"
        )
       return res.status(200).send({ status: true, token: token });
    } catch (err) {
       return res.status(500).send({ err: err.message })
    }
}


module.exports={createStudent,studentLogin};