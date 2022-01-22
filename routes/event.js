const router = require('express').Router();
const verify = require('../verifyToken');
const jwt = require('jsonwebtoken');

// router.get('/', verify, function(req, res) {
//     try {
//         const token = req.header('auth-token');
//         const verified = jwt.verify(token, process.env.Token_Secret);
//         const sql = `SELECT * 
//         FROM event
//         INNER JOIN userevents
//         ON event.id = userevents.eventId
//         WHERE userevents.userId = ${verified._id}`;
//         connection.query(sql, async function(err, result, fields) {
//             if (err) {
//                 res.send({
//                     'message': 'Something went wrong please try again later.',
//                     'data': err,
//                     'status': false,
//                 });
//             } else if (!(result.length > 0)) {
//                 res.send({
//                     'message': 'Getting Event Unuccessful',
//                     'data': null,
//                     'status': false,
//                 });
//             } else {

//                 res.json({
//                     'message': 'Got Event in Successfully',
//                     'data': result,
//                     'status': true,
//                 }).send(req.user);
//             }
//         });
//     } catch (error) {
//         res.send({
//             'message': 'Something went wrong please try again later.',
//             'data': false,
//         });
//     }

// });

module.exports = router;