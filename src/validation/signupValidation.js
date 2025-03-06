const connection = require("../config/connectDB");

// Check if the student already exists
exports.checkExistingStudent = async (StuEmail, StuNumber) => {
    return new Promise((resolve, reject) => {
        // Check if the email already exists
        connection.query('SELECT school_email FROM student_information where school_email =?', [StuEmail], (error,emailResults) => {
            if (error) return reject(error);
            if (emailResults.length > 0 ) return resolve({exists: true, message: "Email already exists."});
            
            // Check if the student ID already exists
            connection.query('SELECT student_id FROM student_information where student_id =?', [StuNumber], (error,results) => {
                if (error) return reject(error);
                if (results.length > 0 ) return resolve({exists: true, message: "ID already exists."});

        
                return resolve({exists: false});

            });
        });
    });
};

// Check if the worker already exists
exports.checkExistingWorker = async (WorkEmail, WorkId) => {
    return new Promise((resolve, reject) => {
        // Check if the email already exists
        connection.query('SELECT email FROM worker_information where email =?', [WorkEmail], (error,results) => {
            if (error) return reject(error);
            if (results.length > 0 ) return resolve({exists: true, message: "Email already exists."});

            // Check if the worker ID already exists
            connection.query('SELECT worker_id FROM worker_information where worker_id =?', [WorkId], (error,results) => {
                if (error) return reject(error);
                if (results.length > 0 ) return resolve({exists: true, message: "That ID is already in use."});
                
                return resolve({exists: false});
            });
        });
    });
};

// Check if the admin already exists
exports.checkAdminCodes =  async (AdminCode) => {
    return new Promise ((resolve, reject) => {
        // Check if the admin code exists
        connection.query('SELECT admin_code FROM admin_codes WHERE admin_code = ? AND is_used = false;', [AdminCode], (error,results) => {
            if (error) return reject(error);
            if (results.length === 0 ) return resolve({taken: true, message: "Invalid Admin Code"});
            return resolve({exists: false});
        });
    });
};

// Check if the vehicle plate already exists
exports.checkVehiclePlate = async (CarPlatenumber) => {
    return new Promise ((resolve, reject) => {
        connection.query('SELECT vehicle_plate FROM vehicle where vehicle_plate =?', [CarPlatenumber], (error,results) => {
            if (error) return reject(error);
            if (results.length > 0 ) return resolve({exists: true, message: "That vehicle plate is already in use."});
            resolve({exists: false});
            
        });
    }); 
};