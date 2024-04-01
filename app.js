const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRoute");
const loginRoute = require("./Routes/loginRoute");
const registerRoute = require("./Routes/registerRoute");
const authentication = require("./Midelwares/authenticationMW");
const swaggerUI = require("swagger-ui-express");
const documentSwagger = require("./swagger.json");


const server = express();
const port = process.env.PORT;


mongoose.connect(`mongodb://${process.env.URL_DATABASE}:${process.env.PORT_DATABASE}/nurserySystem`)
    .then(()=>{
        console.log("Connected to MongoDB");
        server.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {console.log(err)});

server.use("/document-api", swaggerUI.serve, swaggerUI.setup(documentSwagger));
server.use(express.json());

server.use(registerRoute);
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
