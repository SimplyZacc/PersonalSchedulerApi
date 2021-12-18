const router = require('express').Router();
const verify = require('../verifyToken');
const { connection } = require('../db_conn');

router.get('/', verify, function(req, res) {
    try {
        const sql = "SELECT * FROM event";
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
                res.json({
                    'message': 'Signed in Successfully',
                    'data': result,
                    'status': true,
                }).send(req.user);
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