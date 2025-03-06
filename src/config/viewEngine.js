const express = require("express");
const path = require("path");

// Config view engine for the node app
let configViewEngine = (app) => {
    app.use(express.static(path.resolve(__dirname, "..", "public"))); 
    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "..", "views"));
};

module.exports = configViewEngine;

