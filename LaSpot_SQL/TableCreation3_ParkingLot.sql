-- Will create the table for the lot
CREATE TABLE lot (
    lot_id int PRIMARY KEY,
    zone VARCHAR(50) NOT NULL,
    parking_type ENUM("Regular", "Faculty", "Reserved"),
    reserved_to_student int,
    reserved_to_worker int,
    parking_status ENUM("occupied", "vacant") DEFAULT "vacant"
);


-- Inserting sample data into the lot table (Regular)
INSERT INTO lot(lot_id, zone, parking_type)
VALUES
(1, 'A', 'Regular'),
(2, 'A', 'Regular'),
(3, 'A', 'Regular'),
(4, 'A', 'Regular'),
(5, 'A', 'Reserved'),
(6, 'A', 'Regular'),
(7, 'A', 'Regular'),
(8, 'A', 'Regular'),
(9, 'A', 'Regular'),
(10, 'A', 'Regular');


--  | = | = | = | = | = | = |


-- Will create the vehicle table
CREATE TABLE vehicle (
    vehicle_plate VARCHAR(10) PRIMARY KEY,
    student_id int,
    worker_id int,
    vehicle_type ENUM("Sedan", "SUV", "Motorcycle"),
    FOREIGN KEY (student_id) REFERENCES student_information(student_id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES worker_information(worker_id) ON DELETE CASCADE,
    CHECK(
        (student_id IS NOT NULL AND worker_id IS NULL) OR
        (worker_id IS NOT NULL AND student_id IS NULL)
    )
);

-- Will insert the worker vehicles into the vehicle table
INSERT INTO vehicle(vehicle_plate, worker_id, vehicle_type)
VALUES
('ABC123', 123456789, 'Sedan'),
('XYZ456', 456789012, 'SUV'),
('LMN789', 234567890, 'Motorcycle'),
('DEF012', 345678901, 'Sedan');


-- Will insert the student vehicles into the vehicle table
INSERT INTO vehicle (vehicle_plate, student_id, vehicle_type)
VALUES
('GHI345', 123456789, 'Sedan'),
('JKL678', 987654321, 'SUV'),
('MNO901', 234567890, 'Motorcycle'),
('PQR234', 345678901, 'Sedan'),
('STU567', 456789012, 'SUV');


-- | = | = | = | = | = | = |


-- Creating the parking table
CREATE TABLE parking (
    parking_id INT PRIMARY KEY AUTO_INCREMENT,
    lot_id INT,
    vehicle_plate VARCHAR(10),
    student_id INT,
    worker_id INT,
    occupied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vacated_at TIMESTAMP,
    duration INT,
    admin_in_id INT,
    admin_out_id INT,
    FOREIGN KEY (lot_id) REFERENCES lot(lot_id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_plate) REFERENCES vehicle(vehicle_plate) ON DELETE SET NULL,
    FOREIGN KEY (student_id) REFERENCES student_information(student_id) ON DELETE RESTRICT,
    FOREIGN KEY (worker_id) REFERENCES worker_information(worker_id) ON DELETE RESTRICT,
    FOREIGN KEY (admin_in_id) REFERENCES admin_log(admin_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_out_id) REFERENCES admin_log(admin_id) ON DELETE SET NULL,
    CHECK(
        (student_id IS NOT NULL AND worker_id IS NULL) OR
        (worker_id IS NOT NULL AND student_id IS NULL)
    )
);


-- Student parking onto the lot
INSERT INTO parking (lot_id, student_id, admin_in_id)
VALUES(1, 123456789, 1);
UPDATE lot SET parking_status = "occupied" WHERE lot_id = 1;


-- Worker parking onto the lot
INSERT INTO parking (lot_id, worker_id, admin_in_id)
VALUES(10, 456789012, 1);
UPDATE lot SET parking_status = "occupied" WHERE lot_id = 10;


-- Student leaving the lot
UPDATE parking 
SET vacated_at = CURRENT_TIMESTAMP, duration = TIMESTAMPDIFF(MINUTE, occupied_at, CURRENT_TIMESTAMP), admin_out_id = 1
WHERE student_id = 123456789;
UPDATE lot SET parking_status = "vacant" WHERE lot_id IN (SELECT lot_id FROM parking WHERE student_id = 123456789);


--  | = | = | = | = | = | = |


CREATE TABLE parking_history (
    parking_history INT PRIMARY KEY AUTO_INCREMENT,
    lot_id INT,
    vehicle_plate VARCHAR(10),
    student_id INT,
    worker_id INT,
    occupied_at TIMESTAMP,
    vacated_at TIMESTAMP,
    duration INT,
    admin_in_id INT,
    admin_out_id INT,
    FOREIGN KEY (lot_id) REFERENCES lot(lot_id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_plate) REFERENCES vehicle(vehicle_plate) ON DELETE SET NULL,
    FOREIGN KEY (student_id) REFERENCES student_information(student_id) ON DELETE SET NULL,
    FOREIGN KEY (worker_id) REFERENCES worker_information(worker_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_in_id) REFERENCES admin_log(admin_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_out_id) REFERENCES admin_log(admin_id) ON DELETE SET NULL
);

-- Transferring parking data to parking_history table
INSERT INTO parking_history (lot_id, vehicle_plate, student_id, worker_id, occupied_at, vacated_at, duration, admin_in_id, admin_out_id)
SELECT lot_id, vehicle_plate, student_id, worker_id, occupied_at, vacated_at, duration, admin_in_id, admin_out_id
FROM parking
WHERE vacated_at IS NOT NULL;

-- Natamad na ako
-- TO DO (Daily Reset of Daily Parking data and long-term recording of parking data): 
-- Create a table for temp parking data (for those who are still parked on the university)
-- Trasnfer the parking data into the temp parking table, then delete the parking table
-- then create the parking table again (to reset the auto_increment)
-- Transfer the data of the temp parking table into the the parking table 
-- Recording ends and parking operations may continue


--  | = | = | = | = | = | = |

SELECT * FROM lot;
SELECT * FROM vehicle;
SELECT * FROM parking;
SELECT * FROM parking_history;

DROP TABLE lot;
DROP TABLE vehicle;
DROP TABLE parking;
DROP TABLE parking_history;
