const mongoose = require("mongoose")

//creating website
mongoose.connect("mongodb://localhost:27017/dynamic-website")
    .then(() => {
        console.log("database connected successfully");
    }).catch((err) => {
        console.log(err);
    })
