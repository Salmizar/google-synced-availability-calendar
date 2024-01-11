'use strict';
const express = require('express');
const router = express.Router();
require('dotenv').config();
const themeData = require('../theme');
const axios = require('axios');
const ical = require('ical');
const one = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 7 * 30,
    year: 1000 * 60 * 60 * 24 * 365
}
const returnGuests = function(value) {
    let descrip = value.split(":");
    descrip = descrip[descrip.length-1].replace("Nights","");
    if (descrip.indexOf("x") > -1) {
        descrip = descrip.split("x");
        return parseInt(descrip[0]);
    } else {
        return 1;
    }
}
router.get('/', function (request, response) {
    if (!isNaN(request.query.totalslots) && request.query.categories && !isNaN(request.query.days)) {
        axios.get(process.env.ICAL_URL)
        .then(function (axios_response) {
            //create data object
            var data = {
                themeDates: themeData.themeDates,
                slots: {
                }
            };
            //add slot entries for the next 6 months
            let startDate = new Date();
            for (var day=1;day<=request.query.days;day++) {
                const dteEntry = startDate.getUTCDate()+'-'+(startDate.getUTCMonth() + 1)+'-'+startDate.getUTCFullYear(); 
                data.slots[dteEntry] = request.query.totalslots;
                startDate.setDate(startDate.getDate() + 1);
            }
            //parse Ical data
            var cal_data = ical.parseICS(axios_response.data);
            //Inject Ical Data into slots
            for (let k in cal_data) {
                if (cal_data.hasOwnProperty(k)) {
                    var ev = cal_data[k];
                    if (cal_data[k].type == 'VEVENT') {
                        if (ev.categories[0] === request.query.categories) {
                            let startDate = new Date(ev.start);
                            const  endDate = new Date(ev.end);
                            const  nights = (endDate.getTime() - startDate.getTime())/one.day;
                            const guests = returnGuests(ev.description.val);
                            for (var n=1;n<=nights;n++) {
                                const dteEntry = startDate.getUTCDate()+'-'+(startDate.getUTCMonth() + 1)+'-'+startDate.getUTCFullYear(); 
                                data.slots[dteEntry] = ((data.slots[dteEntry])?data.slots[dteEntry]:request.query.totalslots)-guests;
                                if (data.slots[dteEntry]<0) {
                                    //If the day is overbooked, just return 0
                                    data.slots[dteEntry] = 0;
                                }
                                startDate.setDate(startDate.getDate() + 1);
                            }
                        }
                    }
                }
            }
            response.send("const data = "+JSON.stringify(data));
        });
    } else {
        response.status(400).send();
    }
});
module.exports = router;


