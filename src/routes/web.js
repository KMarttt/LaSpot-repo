    const express = require("express");
    const loginController = require("../controllers/loginControllers");

    const signupControllers = require("../controllers/signupControllers");
    const { validationResult } = require("express-validator");


    let router = express.Router();

    let initWebRoutes = (app) => {
        router.get('/', (req, res) =>{
            return res.render("homepage.ejs");
        });


        router.get("/login", loginController.getLoginPage);


        router.get("/signup", (req, res) => {
            return res.render("signup-typeperson.ejs")
        });

        router.post("/submit_accountType", signupControllers.accountType); //good


        router.get("/signup-student", (req, res) =>{
            return res.render("signup-student.ejs");
        });

        router.post("/signup-student", signupControllers.signupStudent);

        
        router.get("/signup-worker", (req, res) =>{
            return res.render("signup-worker.ejs");
        });

        router.post("/signup-worker", signupControllers.signupWorker);
        

        router.get("/signup-admin", (req, res) =>{
            return res.render("signup-admin.ejs")
        });

        router.post("/signup-admin", signupControllers.signupAdmin);

        router.get("/signup-2", (req, res) =>{
            return res.render("signup-2.ejs");
        });

        router.post("/signupSubmit",signupControllers.signupSubmit);

        return app.use("/", router);
    };

    module.exports = initWebRoutes;