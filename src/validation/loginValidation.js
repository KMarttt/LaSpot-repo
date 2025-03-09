const connection = require("../config/connectDB");
const bcrypt = require("bcryptjs");

// Check if the student exists
exports.checkUserExists = async (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT school_email AS email, account_password, 'student' AS accountType FROM student_information WHERE school_email = ?
             UNION
             SELECT email, account_password, 'worker' AS accountType FROM worker_information WHERE email = ?
             UNION
             SELECT admin_code AS email, account_password, 'admin' AS accountType FROM admin_information WHERE admin_code = ?`, 
            [email, email, email],  
            (error, results) => {
                if (error) return reject({ error: "Database error while checking user.", details: error });
                if (results.length === 0) return resolve({ exists: false, message: "Email not found." });

                return resolve({ exists: true, user: results[0] }); 
            }
        );
    });
};

// Validate the password
exports.validatePassword = async (inputPassword, storedHashedPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await bcrypt.compare(inputPassword, storedHashedPassword);
            if (!match) return reject({ exists: false, message: "Incorrect password." });

            return resolve({ exists: true });
        } catch (error) {
            return reject({ error: "Error while verifying password.", details: error });
        }
    });
};
