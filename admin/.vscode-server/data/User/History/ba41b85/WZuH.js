const express = require("express");
const { createPool } = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { updateStrings } = require("yargs");
const { verifier } = require("protobufjs");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create a database connection pool
const pool = createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "adminadmin",
    password: "adminadmin",
    database: "robixe",
    connectionLimit: 10
});

// Define route to serve the HTML file for the root URL
app.get("/", (req, res) => {
    res.send("Yaaaaa Boy We Have API");
});


// Login
app.get("/root/login", (req, res) => {

    const { user, pass } = req.headers;

    if (!user || !pass) {
        return res.json({ code: 0, message: "Invalid information" });
    }

    pool.query("SELECT * FROM root WHERE user = ? AND pass = ?", [user, pass], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.json({ code: 0, message: "Database error" });
        }

        if (result.length === 0) {
            return res.json({ code: 0, message: "Invalid User" });
        }

        result = result[0];
        var id = result.id
        var jobtitle = result.jobtitle

        var perm = result
        delete perm.pass
        delete perm.user
        delete perm.id
        delete perm.jobtitle

        const data = { code: 1, message: "Login Successful ", token: "", id: id, user: user,  jobtitle:jobtitle ,perm: perm };
        const payload = { id:id, user: user, pass: pass };
        data.token = jwt.sign(payload, "robixe");

        res.json(data);
    });
});


// -----------------------     STUDENT VIEW     ----------------------------

app.get("/root/student/view", (req, res) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json({ code: 0, message: "Token not defined" }); 
    }

    jwt.verify(token, "robixe", (err, decoded) => {
        if (err) { 
            return res.json({ code: 0, message: "Invalid User" });
        }

        const { id, user, pass } = decoded;

        pool.query(`SELECT * FROM root WHERE id = ? AND user = ? AND pass = ?`, [id, user, pass], (err, result) => {
            if (err) { 
                return res.json({ code: 0, message: "Database error", err });
            }

            if (result.length === 0) {
                return res.json({ code: 0, message: "Invalid User" });
            }

            // Copying root_info for manipulation
            const perm = { ...result[0] };
            delete perm.pass;
            delete perm.user;
            delete perm.id;
            delete perm.jobtitle;

            // Checking for 'student' permission
            if (!('student' in perm)) {
                return res.json({ code: 0, message: "You Don't Have Access" });
            }

            const w_or_r = perm['student'];

            if (w_or_r > 0) {
                pool.query(`SELECT id, user, level, group_name, last, first, sexe, idc, date, massar FROM student`, (err, studentResult) => {
                    if (err) { 
                        return res.json({ code: 0, message: "Database error" });
                    }
                    const student = studentResult;
            
                    pool.query(`SELECT * FROM \`group\``, (err, groupResult) => {
                        if (err) { 
                            return res.json({ code: 0, message: "Database error" });
                        }
                        const group = groupResult.map(group => group.name);
            
                        pool.query(`SELECT * FROM \`level\``, (err, levelResult) => {
                            if (err) { 
                                return res.json({ code: 0, message: "Database error" });
                            }
                            const level = levelResult.map(level => level.name);
            
                            res.json({ code: 1, message: "This Is Student Data",  level: level ,group: group ,student: student });
                        });
                    });
                });
            } else {
                res.json({ code: 0, message: "You Don't Have Access" });
            }            
            
        });
    });

});


// -----------------------     STUDENT ADD     ----------------------------


app.get("/root/student/add", (req, res) => {
    
    const token = req.headers.authorization;
    let add = req.headers.add;
    add = Object.fromEntries(add.split(',').map(entry => entry.trim().split(':').map(item => item.trim().replace(/^'|'$/g, ''))));

    if (!token) {
        return res.json({ message: "Token is missing" });
    }

    jwt.verify(token, "robixe", (err, decoded) => {
        if (err) {
            return res.json({ code:0, message: "Invalid token" });
        }

        const { id, user, pass } = decoded;

        pool.query(`SELECT * FROM root WHERE id = ? AND user = ? AND pass = ?`, [id, user, pass], (err, result) => {
            if (err) {
                res.json({ code:0, message: "Database error", err });
            }

            if (result.length === 0) {
                res.json({ code:0, message: "Invalid User" });
            }

            const perm = result[0];

            if (!('student' in perm && perm['student'] === 2)) {
                res.json({ code:0, message: "You Don't Have Access" });
            }

            // Validate input data
            if (!(add && add.first && add.last && add.date && add.level && add.group_name)) {
                return res.json({ code:0, message: "Required fields are missing" });
            }

            // Check if student already exists
            pool.query(`SELECT * FROM student WHERE first = ? AND last = ? AND date = ?`, [add.first, add.last, add.date], (err, existingResult) => {
                if (err) {
                    return res.json({ code:0, message: "Database error", err });
                }

                if (existingResult.length > 0) {
                    return res.json({ code:1, message: "Student already exists" });
                }

                // If student is Not exist
                const randomLetters = Math.random().toString(36).slice(-8);

                const username = `${add.first}@${randomLetters}`

                const password = Math.random().toString(36).slice(-8);

                const fieldsToAdd = Object.keys(add).join(', ');
                const placeholders = Object.keys(add).map(() => '?').join(', ');

                const query = `
                    INSERT INTO student (user, pass, ${fieldsToAdd})
                    VALUES (?, ?, ${placeholders})
                `;

                const values = [username, password, ...Object.values(add)];

                pool.query(query, values, (err, result) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.json({ code:0, message: "Database error", err });
                    }

                    return res.json({ code:1, message: "Data inserted successfully", user: username, pass: password });
                });
            });
        });
    });
});


// -----------------------     STUDENT EDIT     ----------------------------

app.get("/root/student/edit", (req, res) => {
    
    const token = req.headers.authorization;
    let edit = req.headers.edit;
    edit = Object.fromEntries(add.split(',').map(entry => entry.trim().split(':').map(item => item.trim().replace(/^'|'$/g, ''))));

    if (!token) {
        return res.json({ message: "Token is missing" });
    }

    jwt.verify(token, "robixe", (err, decoded) => {
        if (err) {
            return res.json({ code:0, message: "Invalid token" });
        }

        const { id, user, pass } = decoded;

        pool.query(`SELECT * FROM root WHERE id = ? AND user = ? AND pass = ?`, [id, user, pass], (err, result) => {
            if (err) {
                res.json({ code:0, message: "Database error", err });
            }

            if (result.length === 0) {
                res.json({ code:0, message: "Invalid User" });
            }

            const perm = result[0];

            if (!('student' in perm && perm['student'] === 2)) {
                res.json({ code:0, message: "You Don't Have Access" });
            }


            // Validate input data
            if (!(edit && edit.id)) {
                return res.json({ code:0, message: "Required fields are missing" });
            }

            


        });
    });
});

// Start the server
const PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
