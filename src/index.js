const express= require("express")
const route= require("./Routes/route")
const mongoose= require("mongoose")
const app= express();

app.use(express.json());


mongoose.connect("mongodb+srv://BittuMishra:ZsLbBdUnCK.2jta@cluster0.2v1vzde.mongodb.net/OnlineExaminationSystemDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});