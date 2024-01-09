'use strict';
const express = require('express');
const router = express.Router();
require('dotenv').config();

const axios = require('axios');
const ical = require('ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const returnGuests = function(value) {
    let descrip = value.split(":");
    descrip = descrip[descrip.length-1].replace("Nights","").split("x")
    return parseInt(descrip[0]);
}
router.get('/', function (request, response) {
    console.log(process.env.ICAL_URL);
    axios.get(process.env.ICAL_URL)
    .then(function (response) {
        var data = ical.parseICS(response.data);
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                var ev = data[k];
                if (data[k].type == 'VEVENT') {
                    let startDate = new Date(ev.start);
                    let endDate = new Date(ev.end);
                    console.log(startDate, endDate, returnGuests(ev.description.val));

                }
            }
        }
    });

    response.json({hi:'you'});
});
module.exports = router;


