const express = require('express')
const router = express.Router();
const {authentication}=require("../Middleware/auth")
const {createStudent,studentLogin}= require("../Controllers/studentController")
const {createAdmin,adminlogin}= require("../Controllers/adminController");
const {createQuestion,getQuestionDetails,updateQuestion,deleteQuestionById}= require("../Controllers/questionController")

router.post("/registerStudent",createStudent);
router.post("/studentLogin",studentLogin);

router.post("/registerAdmin",createAdmin )
router.post("/adminLogin", adminlogin)


router.post("/question/:adminId",authentication,createQuestion);
router.get("/question",getQuestionDetails);
router.put("/updateQuestion",updateQuestion);
router.delete("/deleteQuestion",deleteQuestionById)


module.exports = router;