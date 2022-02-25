const router = require('express').Router();
const verify = require('../verifyToken');
const jwt = require('jsonwebtoken');
const models = require("../models");


router.get('/', function (req, res) {
    try {
        const token = req.header('auth-token');
        const verified = jwt.verify(token, process.env.Token_Secret);
        const id = verified._id;

        const User = models.User;
        const Event = models.Event;

        const event = User.findOne({
            where: {
                id: id
            },
            include: [{
                model: Event
            }]
        }).then(function (events) {
            if (events) {
                delete events.Events.UserEvent;
                res.send({
                    'message': 'Events retrieved sucessfully',
                    'data': events.Events,
                    'status': true,
                });
            } else {
                res.send({
                    'message': 'No events found',
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
            'status': false
        });
    }
});

router.post('/', function (req, res) {
    try {

        const token = req.header('auth-token');
        const verified = jwt.verify(token, process.env.Token_Secret);
        const id = Number(verified._id);

        const title = req.body.title;
        const start = req.body.start;
        const end = req.body.end;
        const allDay = req.body.allDay;
        const color = req.body.color;
        const backgroundColor = req.body.backgroundColor;
        // const status = req.body.status;

        const Event = models.Event;

        const event = Event.create({
            title: title,
            start: start,
            end: end,
            allDay: allDay,
            color: color,
            backgroundColor: backgroundColor,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(function (events) {
            if (events) {
                const UserEvent = models.UserEvent;
                const eventId = Number(events.id);

                const userEvent = UserEvent.create({
                    UserId: id,
                    EventId: eventId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }).then(function (userEvents) {
                    if (userEvents) {
                        res.send({
                            'message': 'User Event created',
                            'data': userEvents,
                            'status': true,
                        });
                    } else {
                        res.send({
                            'message': 'No userEvent created',
                            'data': null,
                            'status': false,
                        });

                    }
                })

            } else {
                res.send({
                    'message': 'No event created',
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
            'status': false
        });
    }
});


module.exports = router;