const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require("../models");

const User = models.User;

router.post('/register', function (req, res) {
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

        const user = User.create({
            userName: username,
            password: hashedPass,
            email: "Test",
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(function (user) {
            if (user) {
                res.send({
                    'message': 'Successful',
                    'data': user,
                    'status': true,
                });

            } else {
                res.send({
                    'message': 'Unsuccessful',
                    'data': null,
                    'status': false,
                });

            }
        }).catch(function (err) {
            res.send({
                'message': 'Unsuccessful',
                'data': err,
                'status': false,
            });
        })
    } catch (error) {
        res.send({
            'message': 'Something went wrong please try again later.',
            'data': null,
            'status': false,
        });
    }
});

router.post('/login', function (req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        if (username == null) {
            res.send({
                'message': 'Please enter username',
                'data': null,
                'status': false,
            });
        } else if (password == null) {
            res.send({
                'message': 'Please enter password',
                'data': null,
                'status': false,
            });
        }

        const user = User.findAll({
            where: {
                userName: username
            }
        }).then(function (user) {
            if (user) {
                const validPass = bcrypt.compareSync(password, user[0].password);
                if (!validPass) {
                    res.send({
                        'message': 'Username or Password Incorrect',
                        'data': null,
                        'status': false,
                    });
                } else {
                    const token = jwt.sign({
                        _id: user[0].id,
                        roles: ['a', 'b'],
                    }, process.env.Token_Secret);

                    res.header('auth-token', token).send({
                        'message': 'Signed in Successfully',
                        'data': {
                            'token': token,
                            'name': user[0].userName
                        },
                        'status': true,
                    });
                }

            } else {
                res.send({
                    'message': 'Username or Password Incorrect',
                    'data': null,
                    'status': false,
                });

            }
        }).catch(function (err) {
            res.send({
                'message': 'Something went wrong please try again latera.',
                'data': err,
                'status': false,
            });
        });

    } catch (error) {
        res.send({
            'message': 'Something went wrong please try again later.',
            'data': false,
        });
    }

});

module.exports = router;