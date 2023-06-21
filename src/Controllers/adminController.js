const jwt = require('jsonwebtoken')
const bcrypt= require("bcrypt")
const adminModel = require("../Models/adminModel")
 
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
}; 

const createAdmin = async function (req, res) {
    try {
        let data = req.body
        const {  fname,lname, email, password, emp_id,phone,address} = data

        let passValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!isValid(data)) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, msg: "Please provide First Name. it's mandatory" })

        }
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, msg: "Please provide Last Name. it's mandatory" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!emailValid.test(email)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
        let adminEmail = await adminModel.findOne({ email: email })
        if (adminEmail) {
            return res.status(400).send({ status: false, msg: "this email is already exist" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        if (!passValid.test(password)) {
            return res.send({ status: false, msg: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number" })
        }
        const encyptPassword = await bcrypt.hash(password, 10);
        data.password= encyptPassword;

        if (!isValid(emp_id)) {
            return res.status(400).send({ status: false, msg: "Please provide emp_id. it's mandatory" })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, msg: "Please provide Phone. it's mandatory" })
        }
        let adminPhone = await adminModel.findOne({ phone: phone })
        if (adminPhone) {
            return res.status(400).send({ status: false, msg: "this Phone is already exist" })
        }
        if (!isValid(address)) {
            return res.status(400).send({ status: false, msg: "Please provide address it's mandatory" })
        }

        let savedata = await adminModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
       return res.status(500).send({ status: false, err: err.message })
    }
}


const adminlogin = async function (req, res) {
    try {
        let adminEmail = req.body.email
        let password = req.body.password
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!isValid(adminEmail)) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        if (!emailValid.test(adminEmail)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
        let admindetails = await adminModel.findOne({ email: adminEmail.trim()})
        if (!admindetails) {
            return res.status(401).send({ status: false, error: "Email is Invalid Please try again !!" })
        }
        const verifyPassword = await bcrypt.compare(password, admindetails.password)
        if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })
 
 /*  const receiver = await receiverModel.findOne({ email: email })
        if (!receiver) return res.status(400).send({ status: false, msg: "Email is Invalid Please try again !!" })
        const verifyPassword = await bcrypt.compare(password, receiver.password)
       if (!verifyPassword) return res.status(400).send({ status: false, msg: "Password is Invalid Please try again !!" })

*/

        let token = jwt.sign(
            {
                adminId: admindetails._id.toString(),
                firstbook: "the moutain",
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


module.exports= {createAdmin,adminlogin}