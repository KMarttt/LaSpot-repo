const connection = require("../config/connectDB");
const signupValidation = require("../validation/signupValidation");
const bcrypt = require("bcryptjs");


exports.accountType = (req, res) => {
    const {AccountType} = req.body;
    req.session.accountType = AccountType;
    
    // Will redirect the user to the appropriate signup page based on the account type
    if (AccountType === "student"){
        return res.redirect("/signup-student");
    } else if (AccountType == "worker") {
        return res.redirect("/signup-worker");
     } else if (AccountType == "admin"){
        return res.redirect("/signup-admin");
     } ;
};


// Will signup the student
exports.signupStudent = async (req, res) => {
   
    console.log(req.body);

    // Deconstructing the values from the form
    const {Fname, Lname, StuEmail, StuNumber, StuPass, StuConfirmPass} = req.body;
    req.session.firstName = Fname;
    req.session.lastName = Lname;
    req.session.email = StuEmail;
    req.session.idNumber = StuNumber;
    req.session.password = StuPass;

    // Student validation
    try {
        const checkResult = await signupValidation.checkExistingStudent(StuEmail, StuNumber);
        if (checkResult.exists){
            return res.render("signup-student.ejs", {message: checkResult.message});
        } else {
            res.redirect("signup-2");
        };
    } catch (error) {
        console.log(error);
    };
};


exports.signupWorker = async (req, res) => {
    console.log(req.body);

    // Deconstructing the values from the form
    const {Fname, Lname, WorkEmail, WorkId, Pass} = req.body;
    req.session.firstName = Fname;
    req.session.lastName = Lname;
    req.session.email = WorkEmail;
    req.session.idNumber = WorkId;
    req.session.password = Pass;

    // Worker validation
   try {
        const checkResult = await signupValidation.checkExistingWorker(WorkEmail, WorkId);
        if (checkResult.exists){
            return res.render("signup-worker.ejs", {message: checkResult.message});
        } else {
            res.redirect("signup-2");
        };
   } catch (error) {
        console.log(error);
   };
};


exports.signupAdmin = async(req,res) => {
    console.log(req.body);
    const {Fname, Lname, AdminCode, AdPass} = req.body;

    // Admin code validation
    try {
        const checkResult = await signupValidation.checkAdminCodes(AdminCode);
        if (checkResult.exist){
            return res.render("signup-admin.ejs", {message: checkResult.message});
        } 
    } catch (error) {
        console.log(error);
    }

    // Will update the admin code to be used
    let sqlAdminCodeInfor = `UPDATE admin_codes SET is_used = true WHERE admin_code = ?`;
    let valuesAdminCodeInfo = [AdminCode];
    connection.query(sqlAdminCodeInfor, valuesAdminCodeInfo, (error, results) => {
        if (error){
            console.log(error)
        }
    });

    // let password = bcrypt.hashSync(req.session.password, 10);
    let password = await bcrypt.hashSync(AdPass, 10);

    // Will insert the admin information into the database
    let sqlAdminInfo = `INSERT INTO admin_information (admin_code, first_name, last_name, account_password) VALUES (?, ?, ?, ?)`;
    let valuesAdminInfo = [AdminCode, Fname, Lname, password];
    
    connection.query(sqlAdminInfo, valuesAdminInfo, (error, results) => {
        if (error){
            console.log(error)
        }
        console.log("check3");
        return res.redirect("/login");
    });
};


exports.signupSubmit = async(req, res) => {
    console.log(req.body);
    const {CarType, CarPlatenumber} = req.body;

    // Vehicle plate validation
    try{
        let checkResult = await signupValidation.checkVehiclePlate(CarPlatenumber);
        if (checkResult.exists){
            return res.render("signup-2.ejs", {message: checkResult.message});
        }
    } catch (error) {
        console.log(error);
    };

    // let password = bcrypt.hashSync(req.session.password, 10);
    let password = await bcrypt.hashSync(req.session.password, 10);


    // Will declare the values to be inserted into the database
    let valuesPersonInfo = [req.session.idNumber, req.session.firstName, req.session.lastName, req.session.email, password];
    let valueVehicleInfo = [CarPlatenumber, req.session.idNumber, CarType];

    let sqlPersonInfo, sqlVehicleInfo;

    // Will declare the sql statements based on the account type
    if (req.session.accountType === "student") {
        sqlPersonInfo = `INSERT INTO student_information (student_id, first_name, last_name, school_email, account_password) VALUES (?, ?, ?, ?, ?)`;
        sqlVehicleInfo = `INSERT INTO vehicle (vehicle_plate, student_id, vehicle_type) VALUES  (?, ?, ?)`;
    } else if (req.session.accountType === "worker"){
        sqlPersonInfo = `INSERT INTO worker_information (worker_id, first_name, last_name, email, account_password) VALUES (?, ?, ?, ?, ?)`;
        sqlVehicleInfo = `INSERT INTO vehicle (vehicle_plate, worker_id, vehicle_type) VALUES  (?, ?, ?)`;    
    };

    // Will insert the user information into the database
    connection.query(sqlPersonInfo, valuesPersonInfo, (error, results) => {
        if (error){
            console.log(error)
            return res.render("signup-2.ejs", {message: "Error in inserting data"});
        }

        // Will insert the vehicle information into the database
        connection.query(sqlVehicleInfo, valueVehicleInfo, (error, results) => {
            if (error){
                console.log(error)
                return res.render("signup-2.ejs", {message: "Error in inserting data"});
            } 

            // Will clear the session data
            req.session.accountType = null;
            req.session.firstName = null;
            req.session.lastName = null;
            req.session.email = null;
            req.session.idNumber = null;
            req.session.password = null;
            return res.redirect("/login");          
        });
    });
};





