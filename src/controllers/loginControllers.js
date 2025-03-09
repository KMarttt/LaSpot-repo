const { checkUserExists, validatePassword } = require("../validation/loginValidation");
const bcrypt = require("bcryptjs");
const connection = require("../config/connectDB");

let getLoginPage = (req, res) => {
    res.render("login.ejs", { message: "" });
};

let login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let userCheck = await checkUserExists(email);
        if (!userCheck.exists) {
            return res.render("login.ejs", { message: userCheck.message });
        }

        // Validate password
        let passwordCheck = await validatePassword(password, userCheck.user.account_password);
        if (!passwordCheck.exists) {
            return res.render("login.ejs", { message: passwordCheck.message });
        }

        // Store session data
        req.session.email = userCheck.user.email;
        req.session.accountType = userCheck.user.accountType;

        return res.redirect("/dashboard"); // Redirect after successful login
    } catch (error) {
        console.error(error);
        return res.render("login.ejs", { message: "Something went wrong. Please try again." });
    }
};

module.exports = {
    getLoginPage,
    login
};
