let express = require('express');
let app = express();

const cors = require('cors');
let mysql = require('mysql');
let url = require("url");


// For file upload
const path = require('path');
const util = require('util');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Vapaat autot tietyllä aikavälillä
app.get('/api/cars', cors(), async function (req, res) {
    let q = nourl.parse(req.url, true).query;
    let startDate = q.from;
    let endDate = q.to;
    let type = q.type;

    // let sql = "SELECT vehicle.Vehicle_id, vehicle_type.Type_name, Vehicle_model, Reg_number, Price, Vehicle_descr, Vehicle_src FROM vehicle, `order`, vehicle_type" +
    //     " WHERE vehicle.Vehicle_id = order.Vehicle_id AND vehicle.Vehicle_type = vehicle_type.Type_id AND Vehicle_type = '" + type + "' AND order.Order_end <= '" + startDate +
    //     "' OR vehicle.Vehicle_id = order.Vehicle_id AND vehicle.Vehicle_type = vehicle_type.Type_id AND order.Order_start >= '" + endDate + "' " +
    //     "AND Vehicle_type = '" + type + "' OR NOT vehicle.Vehicle_id = order.Vehicle_id AND vehicle.Vehicle_type = vehicle_type.Type_id AND Vehicle_type = '" + type + "'" + //jos ajoneuvoa ei ole tilattu ollenkaan
    //     " GROUP BY Vehicle_model " +
    //     "ORDER BY Vehicle_model ";

    let sql = "SELECT vehicle.Vehicle_id, vehicle_type.Type_name, Vehicle_model, Reg_number, Price, Vehicle_descr, Vehicle_src" +
        " FROM `vehicle`" +
        " LEFT JOIN `order` ON vehicle.Vehicle_id=order.Vehicle_id" +
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
app.post('/api/orders/', async function (req, res, url) {
    let json = JSON.stringify(req.body);
    let jsonLength = Object.keys(json).length;

    let sql = "INSERT INTO `order` (Personal_id, First_name, Last_name, Email, Phone_Number, Home_address," +
        "City,Postal_code,Additional_info,Payment,Vehicle_id, Date_create, Order_start, Order_end, Amount)" +
        "SELECT *" +
        " FROM JSON_TABLE ('" + json + "', '$' COLUMNS ( " +
        "Personal_id         VARCHAR(11)     PATH '$[0].Personal_id', " +
        "First_name          VARCHAR(45)     PATH '$[0].First_name', " +
        "Last_name           VARCHAR(45)     PATH '$[0].Last_name', " +
        "Email               VARCHAR(45)     PATH '$[0].Email', " +
        "Phone_Number        VARCHAR(13)     PATH '$[0].Phone_Number', " +
        "Home_address        VARCHAR(50)     PATH '$[0].Home_address', " +
        "City                VARCHAR(50)     PATH '$[0].City', " +
        "Postal_code         int(5)          PATH '$[0].Postal_code', " +
        "Additional_info	 TEXT 		     PATH '$[0].Additional_info', " +
        "Payment             VARCHAR(50)     PATH '$[0].Payment', " +
        "Vehicle_id          INT(11)         PATH '$[0].Vehicle_id'," +
        "Date_create         datetime        PATH '$[0].Date_create', " +
        "Order_start         datetime        PATH '$[0].Order_start', " +
        "Order_end           datetime        PATH '$[0].Order_end', " +
        "Amount              decimal(10,2)   PATH '$[0].Amount')) AS `order`;"

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

    // Tilausvahvistuksen lähetys asiakkaan sähköpostille
    // Ylläpitäjälle tilaus lähetetään front-end puolella
    let nodemailer = require('nodemailer')

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'car.rent.websowellus',
            pass: 'mika72361400'
        }
    });

    let mailOptions = {
        from: 'car.rent.websowellus@gmail.com',
        to: req.body.Email,
        subject: 'Tilauksen vahvistus',
        text: '',
        html: '<h1>Tilausvahvistus</h1>' +
            '      <h4>Tilauksen tiedot</h4>' +
            '      <p>Tilauksen alku: ' + req.body.Order_start + '</p>' +
            '      <p>Tilauksen loppu: ' + req.body.Order_end + '</p>' +
            '      <p>Tilauksen summa: ' + req.body.Amount + '</p>' +
            '      <p>Tilauksen auton ID: ' + req.body.Vehicle_id + '</p>' +
            '      <h4>Tilaajan tiedot</h4>' +
            '      <p>Nimi: ' + req.body.First_name + ' ' + req.body.Last_name + '</p>' +
            '      <p>Sähköpostiosoite: ' + req.body.Email + '</p>' +
            '      <p>Puhelinnumero: ' + req.body.Phone_Number + '</p>' +
            '      <p>Lähiosoite: ' + req.body.Home_address + '</p>' +
            '      <p>Postitoimipaikka: ' + req.body.Postal_code + '</p>' +
            '      <p>Lisätiedot: ' + req.body.Additional_info + '</p>' +
            '      <p>Maksutapa: ' + req.body.Payment + '</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})

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