const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const todoApi= require("./routes/api/todoApi");
const PORT=  8081;
const app = express();

app.use(cors(corsOptions));
app.use(express.json())

app.use("/todo-v1", todoApi)

app.listen(PORT, ()=>{
    console.log("Server listening")
})
