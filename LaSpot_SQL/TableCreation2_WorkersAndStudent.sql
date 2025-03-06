-- Will create the table for worker_information
CREATE TABLE worker_information(
    worker_id int PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    account_password VARCHAR(255) NOT NULL,
    account_type VARCHAR(10) DEFAULT 'Worker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Will insert sample data into the worker table
INSERT INTO worker_information(worker_id, first_name, last_name, email, account_password)
VALUES
    (123456789, 'John', 'Doe', 'john.doe@example.com', 'securepassword'),
    (987654321, 'Jane', 'Smith', 'jane.smith@example.com', 'anothersecurepassword'),
    (234567890, 'Alice', 'Johnson', 'alice.johnson@example.com', 'alicepassword'),
    (345678901, 'Bob', 'Brown', 'bob.brown@example.com', 'bobpassword'),
    (456789012, 'Charlie', 'Davis', 'charlie.davis@example.com', 'charliepassword');


--  | = | = | = | = | = | = |


-- Will create the table for the student_information
CREATE TABLE student_information (
    student_id int PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    school_email VARCHAR(100) NOT NULL,
    account_password VARCHAR(255) NOT NULL,
    account_type VARCHAR(10) DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Will insert sample data into the student_information
INSERT INTO student_information(student_id, first_name, last_name, school_email, account_password)
VALUES
    (123456789, 'Emily', 'Clark', 'emily.clark@school.edu', 'emilypassword'), 
    (987654321, 'Michael', 'Johnson', 'michael.johnson@school.edu', 'michaelpassword'),
    (234567890, 'Sarah', 'Williams', 'sarah.williams@school.edu', 'sarahpassword'),
    (345678901, 'David', 'Jones', 'david.jones@school.edu', 'davidpassword'),
    (456789012, 'Laura', 'Garcia', 'laura.garcia@school.edu', 'laurapassword');


--  | = | = | = | = | = | = |


-- Will display the table
SELECT * FROM student_information;
SELECT * FROM worker_information;

-- Will delete the table
DROP TABLE student_information;
DROP TABLE worker_information;

