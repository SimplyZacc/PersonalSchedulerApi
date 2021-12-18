const mysql = require('mysql');

//db login details
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'scheduler',
}

//connect to database here
const con = mysql.createConnection(config);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    connection: mysql.createConnection(config),
};