const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require('../db_conn');

router.post('/register', function(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        if (username == null || password == null) {
            res.send({
                'message': 'Please enter valid info.',
                'data': null,
                'status': false,
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);

        const sql = "INSERT INTO users (Username, Password) VALUES ('" + username + "','" + hashedPass + "')";
        connection.query(sql, function(err, result, fields) {
            if (err) {
                res.send({
                    'message': 'An error has occured please try again later',
                    'data': err,
                    'status': false,
                });
            } else {
                res.send({
                    'message': 'User Registered Successfully',
                    'data': null,
                    'status': true,
                });
            }
        });
    } catch (error) {
        res.send({
            'message': 'Something went wrong please try again later.',
            'data': null,
            'status': false,
        });
    }
});

router.post('/login', function(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        if (username == null) {
            res.send({
                'message': 'Please enter username',
                'data': req.body,
                'status': false,
            });
        } else if (password == null) {
            res.send({
                'message': 'Please enter password',
                'data': null,
                'status': false,
            });
        }

        const sql = "SELECT * FROM users WHERE username='" + username + "'";
        connection.query(sql, async function(err, result, fields) {
            if (err) {
                res.send({
                    'message': 'Something went wrong please try again later.',
                    'data': err,
                    'status': false,
                });
            } else if (!(result.length > 0)) {
                res.send({
                    'message': 'Signed in Unuccessful',
                    'data': null,
                    'status': false,
                });
            } else {
                const validPass = bcrypt.compareSync(password, result[0].password);
                if (!validPass) {
                    res.send({
                        'message': 'Username or Password Incorrect',
                        'data': null,
                        'status': false,
                    });
                } else {
                    const token = jwt.sign({ _id: result[0].id, roles: ['a', 'b'], }, process.env.Token_Secret);
                    res.header('auth-token', token).send({
                        'message': 'Signed in Successfully',
                        'data': token,
                        'status': true,
                    });
                }
            }
        });
    } catch (error) {
        res.send({
            'message': 'Something went wrong please try again later.',
            'data': false,
        });
    }

});

module.exports = router;