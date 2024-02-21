const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: "meetup"
});


db.connect((err) => {
    try {
        if (err) throw err;

        console.log('Connected to MySQL');

        db.query('DROP DATABASE IF EXISTS meetup', (err) => {
            if (err) throw err;
            console.log('Database dropped or did not exist')
        });


        db.query('CREATE DATABASE IF NOT EXISTS meetup', (err) => {
            if (err) throw err;
            console.log('Database created');


            db.query('USE meetup', (err) => {
                if (err) throw err;


                db.query(`CREATE TABLE IF NOT EXISTS Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255),
            invited_by VARCHAR(255)
            )
        `, (err) => {
                    if (err) throw err;
                    console.log('Invitee table created ');


                    db.query(`CREATE TABLE IF NOT EXISTS Room (
            room_no INT AUTO_INCREMENT PRIMARY KEY,
            room_name VARCHAR(255),
            floor_number INT
            )
        `, (err) => {
                        if (err) throw err;
                        console.log('Room table created ');


                        db.query(`CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255),
                starting_time DATETIME,
                ending_time DATETIME,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
            )
        `, (err) => {
                            if (err) throw err;
                            console.log('Meeting table created');

                            insertData();
                        });
                    });
                });
            });
        });
    } catch (error) {
        throw error
    }
});

function insertData() {
    try {

        db.query(`INSERT INTO Invitee (invitee_name, invited_by) VALUES
        ('Ali', 'Hann'),
        ('Carmen', 'Gab'),
        ('Noor', 'Ahmed'),
        ('Salam', 'Amar'),
        ('Islam', 'Salih')
    `, (err) => {
            if (err) throw err;
            console.log('All the meeting are scheduled');

            db.query(`INSERT INTO Room (room_name, floor_number) VALUES
        ('Room1', 1),
        ('Room2', 2),
        ('Room3', 3),
        ('Room4', 4),
        ('Room5', 5)
    `, (err) => {
                if (err) throw err;
                console.log('All the rooms are booked for the meeting');

                db.query(`
        INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
        ('Meeting1', '2024-02-17 10:00:00', '2024-02-17 11:30:00', 1),
        ('Meeting2', '2024-02-18 14:00:00', '2024-02-18 15:30:00', 2),
        ('Meeting3', '2024-02-19 09:30:00', '2024-02-19 11:00:00', 3),
        ('Meeting4', '2024-02-20 13:00:00', '2024-02-20 14:30:00', 4),
        ('Meeting5', '2024-02-21 11:00:00', '2024-02-21 12:30:00', 5)
        `, (err) => {
                    if (err) throw err;
                    console.log('All the meeting are scheduled');

                    db.end((err) => {
                        if (err) throw err;
                        console.log('Connection closed');
                    });
                });
            });
        });
    } catch (error) {
        throw error
    }
}