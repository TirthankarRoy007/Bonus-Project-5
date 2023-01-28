const express = require("express");
const express = require("express");
const route = require("./routes/route")
const route = require("./routes/route");


const {default:mongoose} = require("mongoose")

const app = express();

app.use(express.json())
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Tirtha008:mlpnk3AhOzHztAdO@tirthacluster.psqixlb.mongodb.net/Bonus5", {useNewUrlParser: true})
.then(()=>console.log("MongoDB is Connected"))
.catch(err=>console.log(err))
app.use("/", route)

app.listen(3000, function(){
    console.log("Express App is running on port" + (3000))
})