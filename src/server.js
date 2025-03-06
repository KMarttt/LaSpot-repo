const express = require("express");

const configViewEngine = require("./config/viewEngine");
;
const dotenv = require("dotenv");
const connection = require("./config/connectDB")
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const Session = require("express-session");
// const Session = require ("express-session");



const app = express();

// Enable body parser post data (allows it to read url encoded stuff?)
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// // Enable it to temporily store data (for registration)
// app.use(Session({
//     secret: "secret key",
//     // use env later on
//     resave: false,
//     saveUninitialized: false
// }));

// Enable it to temporily store data 
app.use(Session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 1  day
    }
}));

// Enable flash message
app.use(connectFlash());





// Config view Engine
configViewEngine(app)

// Import Web Routes
const initWebRoutes = require("./routes/web")
// init all web routes
initWebRoutes(app);
// // auth Validation
// app.use("/authValidation", require("./validation/authValidation"));

let port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`App is running at the ${port}`);
});

 