const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRoute");
const loginRoute = require("./Routes/loginRoute");
const authentication = require("./Midelwares/authenticationMW");

const server = express();
const port = process.env.PORT || 8080;


mongoose.connect("mongodb://127.0.0.1:27017/nurserySystem")
    .then(()=>{
        console.log("Connected to MongoDB");
        server.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {console.log(err)});


server.use(express.json());



server.use(loginRoute);

server.use(authentication);

server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);



server.use((request,response)=>{
    response.status(404).json({data:"Not Found"});
});



server.use((error,request,response,next)=>{
    response.status(500).json({data:`Error MW ${error}`})
});
