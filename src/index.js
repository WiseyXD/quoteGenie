const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use("/user",userRoutes);

app.listen(PORT,()=>{
    console.log("Server is Listening at "+PORT);
})