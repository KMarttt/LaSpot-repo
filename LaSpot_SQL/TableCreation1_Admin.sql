-- Pre-made admin code for admin account creation
CREATE TABLE admin_codes (
    admin_code VARCHAR(10),
    is_used BOOLEAN DEFAULT FALSE
);

INSERT INTO admin_codes (admin_code)
VALUES
    ('ABCDE12345'),
    ('FGHIJ67890'),
    ('KLMNO54321'),
    ('PQRST09876'),
    ('UVWXY13579'),
    ('ZABCD24680'),
    ('EFGHI86420'),
    ('JKLMN97531'),
    ('OPQRS86420'),
    ('TUVWX75319');

--  | = | = | = | = | = | = |


-- Will create the admin database
CREATE TABLE admin_information (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_code VARCHAR(10) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    account_password VARCHAR(255)
);


-- Will create admin account into the admin table and update the admin_code table
INSERT INTO admin_information (admin_code, first_name, last_name, account_password) 
VALUES('ABCDE12345', 'John', 'Doe', 'password123');
UPDATE admin_codes  SET is_used = true WHERE admin_code = 'ABCDE12345';

INSERT INTO admin_information (admin_code, first_name, last_name, account_password) 
VALUES('FGHIJ67890', 'Jim', 'Boom', 'password321');
UPDATE admin_codes  SET is_used = true WHERE admin_code = 'FGHIJ67890';



--  | = | = | = | = | = | = |

-- Creating an admin_log table (to track admins)
CREATE TABLE admin_log (
    admin_log_ID INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    time_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_out TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin_information(admin_id)
);


-- Admin time-in
INSERT INTO admin_log (admin_id)  VALUES (1);

-- Admin time-out
UPDATE admin_log SET time_out = CURRENT_TIMESTAMP WHERE admin_id = 1;


--  | = | = | = | = | = | = |

SELECT * FROM admin_codes;
SELECT * FROM admin_information;
SELECT * FROM admin_log;

DROP TABLE admin_codes;
DROP TABLE admin_log;
DROP TABLE admin_information;

