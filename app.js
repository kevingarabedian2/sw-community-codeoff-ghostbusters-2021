/*
    Contest Entry: Signalwire Community Ghostbuster Challenge 2021
    Author: Kevin Garabedian
    Description: Wanted to share another way to digest and generate call flows.
    The folder flows, contains multiple predefined flows that are routed to based
    on the input numbers flow query string var, and then passed in-app via the flow id.

    Demonstrates alerting a group i.e. Ghostbusters
    Demonstrates subscription to a group ie.e Neighborhood Alert
    Demonstrates inbound flow IVR to report sightings, and to join neighborhood alert ecto 411.
    Demonstrates web signup for neigborhood alert, and reporting of sightings.
    Demonstrates text submission / reporting
*/

const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const layout = require('express-layout');
const { check, validationResult, matchedData } = require('express-validator');

const VoiceResponse = require('twilio').twiml.VoiceResponse;

require('dotenv').config();

const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('build'))

var accountSid = process.env.SIGNALWIRE_PROJECT;
var authToken = process.env.SIGNALWIRE_TOKEN;

const {
    RestClient
} = require('@signalwire/node')
const client = new RestClient(accountSid, authToken, { signalwireSpaceUrl: process.env.SIGNALWIRE_SPACE })


var GhostBusters = [
    {
        Name: "Peter Venkman",
        Number: "+",
        Enabled: true,
        Address: "14 North Moore Street, Tribeca, Manhattan, New York 10007"
    },
    {
        Name: "Raymond Stantz",
        Number: "",
        Enabled: false,
        Address: "14 North Moore Street, Tribeca, Manhattan, New York 10007"
    },
    {
        Name: "Egon Spengler",
        Number: "",
        Enabled: false,
        Address: "14 North Moore Street, Tribeca, Manhattan, New York 10007"
    },
    {
        Name: "Winston Zeddemore",
        Number: "",
        Enabled: false,
        Address: "14 North Moore Street, Tribeca, Manhattan, New York 10007"
    },
];

var Neighborhood411 = [
    {
        Name: "Kevin Garabedian",
        Number: "+",
        Enabled: true
    }
];

var Sightings = [
    {
        ReportedBy: "Good Samaritan",
        ReportedNumber: "+12125551234",
        ReportedIncident: "A giant marshmellow is taking over the city.",
        SupportingDeposition: false,
        SupportingMedia: [],
        Reported: true
    }
];


function doRequest(options, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseBody));
                } catch (err) {
                    reject(err);
                }
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.write(data)
        req.end();
    });
}

// Accept GET / Index
app.get('/', (req, res) => {
    res.render('index');
});

// Accept GET the form
app.get('/contact', (req, res) => {
    res.render('contact');
});
// Accept POST the form
app.post('/contact', (req, res) => {
    res.render('contact', {
        data: req.body, // { message, email }
        errors: {
            message: {
                msg: 'A message is required'
            },
            email: {
                msg: 'That email doesn‘t look right'
            }
        }
    });
});

function DialAttachFlow(to, from, flow) {

    client.calls
        .create({
            url: 'https://ecto411.codergames.dev/inbound/voice?flow=' + flow,
            to: to,
            from: from
        })
        .then(call => console.log(call.sid));
}

function AlertGhostbusters() {

    for (var i = 0; i < GhostBusters.length; i++) {
        if (GhostBusters[i].Enabled) {
            client.calls
                .create({
                    url: 'https://ecto411.codergames.dev/inbound/voice?flow=Dispatch',
                    to: GhostBusters[i].Number,
                    from: process.env.FROM
                })
                .then(call => console.log(call.sid));
        }
    }
}

function AlertCommunity() {

    // Send Voice Alert
    for (var i = 0; i < Neighborhood411.length; i++) {
        if (Neighborhood411[i].Enabled) {
            client.calls
                .create({
                    url: 'https://ecto411.codergames.dev/inbound/voice?flow=Sighting',
                    to: Neighborhood411[i].Number,
                    from: process.env.FROM
                })
                .then(call => console.log(call.sid));
        }
    }
    // Send Text Alert
    /*for (var i = 0; i < Neighborhood411.length; i++) {
        if (Neighborhood411[i].Enabled) {
            client.calls
                .create({
                    url: 'https://ecto411.codergames.dev/inbound/voice?flow=Sighting',
                    to: Neighborhood411[i].Number,
                    from: process.env.FROM
                })
                .then(call => console.log(call.sid));
        }
    }*/
}


// 
app.get('/add-community-alert', (req, res) => {
    AlertCommunity();
    res.end('200');
});

// 
app.get('/add-report-alert', (req, res) => {
    AlertGhostbusters();
    //AlertCommunity();
    res.end('200');
});

// test dialer
app.get('/dialtest', (req, res) => {
    DialAttachFlow("+15189149598", "+15185062373", "Sighting")
    res.end('200');
});

// Inbound Voice Endpoint
app.all('/inbound/voice', (req, res) => {

    /*console.log('kevin');
    console.log('/inbound/voice');
    console.log(req.method);

    console.log('post body');
    console.log(req.body);

    console.log('get query');
    console.log(req.query);*/

    if (req.method === "GET" || req.method === "POST") {

        var path = "main";

        var FlowName = "default"; // default path
        if (req.query.flow && req.query.flow.length > 0) {
            FlowName = req.query.flow;
            path = "main";
        }

        // get the flow
        var instance = require('./flows/' + FlowName + '.js');
        var flow = instance.getFlow();

        // Inject Voice Session Variables from POST
        flow.variables.SetVar("main", "AccountSid", req.body.AccountSid);
        flow.variables.SetVar("main", "From", req.body.From);
        flow.variables.SetVar("main", "To", req.body.To);
        flow.variables.SetVar("main", "Called", req.body.Called);
        flow.variables.SetVar("main", "CallStatus", req.body.CallStatus);
        flow.variables.SetVar("main", "ApiVersion", req.body.ApiVersion);
        flow.variables.SetVar("main", "Direction", req.body.Direction);

        // Write Response To Browser
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });

        // Routing from choice/logic
        if (req.query['x-success'] == "true") {
            console.log('success route stuff');
            var menu = req.query['x-menu'];
            var optionMenu = req.query['x-OptionsId'];
            var options = flow.menus.GetGatherOptions(optionMenu);
            var selected = req.query['x-selected'];

            // Search Menu Options for Route, and Generate Menu
            for (var i = 0; i < options.length; i++) {
                console.log("-- opts");
                console.log(options[i]);
                if (options[i]['x-matchDigits'] == selected) {
                    return res.end(flow.GenerateLaML(options[i]['x-matchActionTarget']));
                }
            }
            return res.end(flow.GenerateLaML(req.query['x-failRoute']));
        } else if (req.query['x-success'] == "false") {
            return res.end(flow.GenerateLaML(req.query['x-failRoute']));
        } else {
            // Normal Routing
            return res.end(flow.GenerateLaML(path));
        }
    } else {
        // Only Allow GET/POST Methods, else return Forbidden.
        res.writeHead(403, {
            'Content-Type': 'text/xml'
        });
        return res.end();
    }
});

// Process and handle menu logic
app.all('/inbound/voice/logic', (req, res) => {
    console.log('/inbound/voice/logic');

    if (req.method === "GET" || req.method === "POST") {

        var queryString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
        console.log(queryString);

        var failRoute = req.query['x-failRoute'];
        var xRegEx = req.query['x-regex'];
        var checkRegex = false;
        if (xRegEx.length > 0) {
            checkRegex = true;
        }
        if (req.query['x-input'] === "dtmf") {
            var digits = req.body.Digits;
            if (checkRegex) {
                // add check logic regex here
            }
            res.redirect('/inbound/voice?x-success=true' + "&" + queryString + "&x-selected=" + digits);
            res.end();
            return;
        }
        res.redirect('/inbound/voice?x-success=false' + "&" + queryString);
        res.end();
        return;
    } else {
        // Only Allow GET/POST Methods, else return Forbidden.
        res.writeHead(403, {
            'Content-Type': 'text/xml'
        });
        res.end();
        return;
    }
});

http.createServer(app).listen(80, () => {
    console.log('Express server listening on port 80');
});
