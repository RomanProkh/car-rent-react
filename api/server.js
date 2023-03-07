let express = require('express');
let app = express();

const cors = require('cors');
let mysql = require('mysql');
let url = require("url");


// For file upload
const path = require('path');
const util = require('util');

// For the user authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js')
require('dotenv').config()

// console.log(process.env)
// remove this after you've confirmed it is working
function authenticateToken(req, res, next) {

   // console.log(req.headers['authorization'])
     const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    //console.log(token)
    let bearerToken;

    let bearerHeader = req.headers["authorization"];
   // console.log(req.headers)

    if (typeof bearerHeader !== 'undefined') {

        let bearer = bearerHeader.split(" ");

        bearerToken = bearer[1];
        console.log(bearerToken)
        req.token = bearerToken;
    }

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

let bodyParser = require('body-parser');

// node native promisify

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Bearer  ");
    next();
});

let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Vapaat autot tietyllä aikavälillä
app.get('/api/cars', cors(), async function (req, res) {
    let q = url.parse(req.url, true).query;
    let startDate = q.from;
    let endDate = q.to;
    let type = q.type;

    let sql = "SELECT vehicle.Vehicle_id, vehicle_type.Type_name, Vehicle_model, Reg_number, Price, Vehicle_descr, Vehicle_src" +
        " FROM `vehicle`" +
        " LEFT JOIN `order` ON vehicle.Vehicle_id=`order`.`Vehicle_id`" +
        " LEFT JOIN `vehicle_type` ON vehicle.Vehicle_type=vehicle_type.Type_id" +
        " WHERE (vehicle.vehicle_type='" + type + "' AND order.Order_end <= '" + startDate + "')" +
        " OR (vehicle.vehicle_type='" + type + "' AND order.Order_start >= '" + endDate + "')" +
        " OR (Order_id IS NULL AND vehicle.vehicle_type='" + type + "'); ";
    let result;
    let db = makeDb();
    try {
        await makeTransaction(db, async () => {
            result = await db.query(sql);
        });
    } catch (err) {
        console.log(err);
    }
    res.send(result);
})

// Yksittäisen ajoneuvon tiedot id:lla
app.get('/api/car/:id', cors(), async function (req, res, url) {
    let sql = "SELECT vehicle.Vehicle_id, vehicle_type.Type_name, Vehicle_model, Reg_number, Price, Vehicle_descr, Vehicle_src FROM vehicle, vehicle_type WHERE vehicle.Vehicle_id = '" + req.params.id + "' AND vehicle.Vehicle_type = vehicle_type.Type_id GROUP BY Vehicle_type ";
    let db = makeDb();
    let result;
    try {
        await makeTransaction(db, async () => {
            result = await db.query(sql);
        });
    } catch (err) {
        console.log(err);
    }
    res.send(result);
});

// Ajoneuvon tyyppin nimi id:llä
app.get('/api/vehicle_type/:id', cors(), async function (req, res, url) {
    let sql = "SELECT Type_id, Type_name FROM vehicle_type WHERE Type_id = '" + req.params.id + "' GROUP BY Type_id ";
    let db = makeDb();
    let result;
    try {
        await makeTransaction(db, async () => {
            result = await db.query(sql);
        });
    } catch (err) {
        console.log(err);
    }
    res.send(result);
});

// Ajoneuvon tyypit
app.get('/api/vehicle_type', cors(), async function (req, res) {
    let sql = "SELECT vehicle_type.Type_id, Type_name FROM vehicle_type WHERE 1=1 ORDER BY Type_id";
    let db = makeDb();
    let result;
    try {
        await makeTransaction(db, async () => {
            result = await db.query(sql);
        });
    } catch (err) {
        console.log(err);
    }

    res.send(result);
});

// Tilauksen tekeminen
app.post('/api/orders/', async (req, res) => {

    try {
        const data = req.body

        let sql = "INSERT INTO `order` (First_name, Last_name, Email, Phone_Number, Home_address, City, Postal_code, Payment, Vehicle_id, Date_create, Order_start, Order_end, Amount) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let db = makeDb();
        try {
            await makeTransaction(db, async () => {
                // INSERT NEW ORDER
                db.query(sql, [data.First_name, data.Last_name, data.Email, data.Phone_Number, data.Home_address, data.City, data.Postal_code, data.Payment, data.Vehicle_id, data.Date_create, data.Order_start, data.Order_end, data.Amount]).then((result) => res.status(200).send("POST was succesful "));
            });
        } catch (err) {
            res.status(400).send("POST was not succesful ");
        }
    } catch (e) {
        res.json({message: "Error"});
    }

    // Tilausvahvistuksen lähetys asiakkaan sähköpostille
    // Ylläpitäjälle tilaus lähetetään front-end puolella
    // let nodemailer = require('nodemailer')
    //
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'car.rent.websowellus',
    //         pass: 'mika72361400'
    //     }
    // });
    //
    // let mailOptions = {
    //     from: 'car.rent.websowellus@gmail.com',
    //     to: req.body.Email,
    //     subject: 'Tilauksen vahvistus',
    //     text: '',
    //     html: '<h1>Tilausvahvistus</h1>' +
    //         '      <h4>Tilauksen tiedot</h4>' +
    //         '      <p>Tilauksen alku: ' + req.body.Order_start + '</p>' +
    //         '      <p>Tilauksen loppu: ' + req.body.Order_end + '</p>' +
    //         '      <p>Tilauksen summa: ' + req.body.Amount + '</p>' +
    //         '      <p>Tilauksen auton ID: ' + req.body.Vehicle_id + '</p>' +
    //         '      <h4>Tilaajan tiedot</h4>' +
    //         '      <p>Nimi: ' + req.body.First_name + ' ' + req.body.Last_name + '</p>' +
    //         '      <p>Sähköpostiosoite: ' + req.body.Email + '</p>' +
    //         '      <p>Puhelinnumero: ' + req.body.Phone_Number + '</p>' +
    //         '      <p>Lähiosoite: ' + req.body.Home_address + '</p>' +
    //         '      <p>Postitoimipaikka: ' + req.body.Postal_code + '</p>' +
    //         '      <p>Maksutapa: ' + req.body.Payment + '</p>'
    // };
    //
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

})

// ----------------------- Käyttäjäj rekisteröinti ja sisäänkirjauttuminen --------------------- //

// User signup
app.post('/api/signup/', async (req, res) => {
    console.log(req.body)
    try {
        const user = req.body
        const hashedPassword = await bcrypt.hash(user.password, 10);
        //console.log(hashedPassword)

        // make updates to the database
        if (user.email !== '') { // is  a username present?

            let sql = "INSERT INTO user (Username, Email, Password, First_Name, Last_name, Phone_number, Home_Address, City, Postal_Code)"
                + " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let db = makeDb();
            try {
                await makeTransaction(db, async () => {
                    await db.query(sql, [user.userName, user.email, hashedPassword, user.firstName, user.lastName, user.phoneNumber, user.homeAddress, user.city, user.postalCode]);

                    // res.status(200).send("POST succesful ");
                    const accessToken = jwt.sign(JSON.stringify(user), process.env.SECRET_KEY)
                    //console.log(accessToken)

                    res.status(202).json({accessToken: accessToken})
                });
            } catch (err) {
                res.status(400).send("POST was not succesful ");
            }
        }
    } catch (e) {
        res.json({message: "Error"});
    }
});

// User login
app.post('/api/signin', async (req, res) => {
    let user = req.body

    console.log(req.body)
    try {
        // Try to obtain a given account password from the database to compare
        let dbUserPassword = ''
        let dbUserName = ''
        let dbUserEmail = ''
        let dbUserId = ''
        let dbUserFirstName = ''
        let dbUserLastName = ''
        let dbUserPhoneNumber = ''
        let dbUserHomeAddress = ''
        let dbUserCity = ''
        let dbUserPostalCode = ''
        let sql = "SELECT username, email, password, user_id, first_name, last_name, phone_number, home_address, city, postal_code, COUNT(password) AS rows_found " +
            " FROM `user` WHERE email = ? "

        let db = makeDb()
        try {
            await makeTransaction(db, async () => {
                await db.query(sql, [user.email]).then((result) => {
                    // If user data found from the database
                    if(result[0].rows_found === 1){
                        dbUserName =  result[0].username
                        dbUserEmail =  result[0].email
                        dbUserPassword =  result[0].password
                        dbUserId = result[0].user_id
                        dbUserFirstName = result[0].first_name
                        dbUserLastName = result[0].last_name
                        dbUserPhoneNumber = result[0].phone_number
                        dbUserHomeAddress = result[0].home_address
                        dbUserCity = result[0].city
                        dbUserPostalCode = result[0].postal_code
                    }
                });
                //console.log(dbUserPassword)
            });
        } catch (err) {
            console.log(err);
        }

        //Comparing the passwords
        if (dbUserPassword !== null) {
            try {
                const match = await bcrypt.compare(user.password, dbUserPassword);
                const accessToken = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)
                if (match) {
                    console.log("Passwords matched")
                    res.json({
                        accessToken: accessToken,
                        username: dbUserName,
                        email: dbUserEmail,
                        id: dbUserId,
                        firstName: dbUserFirstName,
                        lastName: dbUserLastName,
                        phoneNumber: dbUserPhoneNumber,
                        homeAddress: dbUserHomeAddress,
                        city: dbUserCity,
                        postalCode: dbUserPostalCode,
                        message: "User Identified"
                    });
                } else {
                    res.json({
                        accessToken: null,
                        message: "Invalid Credentials"
                    });
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            res.json({
                accessToken: null,
                message: "Invalid Credentials"
            });
        }
    } catch (e) {
        res.json({
            accessToken: null,
            message: "Error"
        })
    }

})


// Existing usernames
app.get('/api/usernames', cors(), async function (req, res) {

    let q = url.parse(req.url, true).query;
    let username = q.username;
    let email = q.email;

    let rowsFound = {
        username: false,
        email: false
    }

    let sqlCheckUsername = "SELECT COUNT(username) AS rows_found " +
        " FROM `user` WHERE username = ? "
    let sqlCheckEmail = "SELECT COUNT(email) AS rows_found" +
        " FROM `user` WHERE email = ? "

    try {
        // Check username
        if (q.username !== '') {
            let db = makeDb();
            await makeTransaction(db, async () => {
                await db.query(sqlCheckUsername, [q.username]).then((result) => rowsFound.username = result[0].rows_found > 0 ? true : false);
            });
        }
        // Check email
        if (q.email !== '') {
            let db = makeDb();
            await makeTransaction(db, async () => {
                await db.query(sqlCheckEmail, [q.email]).then((result) => rowsFound.email = result[0].rows_found > 0 ? true : false);
            });
        }
    } catch (err) {
        console.log(err);
    }

    res.send(rowsFound);
})


// Add new event
app.post('/api/user', authenticateToken,  async (req, res) => {
    //console.log(req.body)
    let result;
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const user = req.body
        // console.log(req.body.email)
        let userEmail = req.body.email

        // Get user data from the database

        // Check if email is present in the database
        let rowsFound = {
            email: false
        }
        let sqlCheckEmail = "SELECT COUNT(email) AS rows_found" +
            " FROM `user` WHERE email = ? "
        try {
            // Check email
            if (userEmail !== '') {
                let db = makeDb();
                await makeTransaction(db, async () => {
                    await db.query(sqlCheckEmail, [userEmail]).then((result) => rowsFound.email = result[0].rows_found > 0 ? true : false);
                });
            }
        } catch (err) {
            console.log(err);
        }

        // if email founded
        if(rowsFound.email){
            let sql = "SELECT user_id, username, email, date_create, first_name, last_name, phone_number, home_address, city, postal_code " +
                "FROM `user` WHERE email = ?"
            let db = makeDb();
            await makeTransaction(db, async ()=>{
                result = await db.query(sql, userEmail)
            })
        }

    } catch (e) {
        res.json({message: "Error"});
    }
    res.send(result)
});



// ---------------------- YHTEYDET ----------------------------------------- //
let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

// Method for interacting with database
function makeDb() {

    const connection = mysql.createConnection({
        host: "mysql.metropolia.fi",
        user: "mihailka",
        password: "mika72361400",
        database: "mihailka"
    });
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
        beginTransaction() {
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit() {
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback() {
            return util.promisify(connection.rollback)
                .call(connection);
        }
    };
}

// Method making transaction
async function makeTransaction(db, callback) {
    try {
        await db.beginTransaction();
        await callback();
        await db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    } finally {
        await db.close();
    }
}