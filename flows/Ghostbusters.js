const http = require('http');
const https = require('https');
const Flows = require('../app-flow.js');

var flow = new Flows.Flow("Ghostbusters", "Ecto 411 Alert System", Flows.MediaType.Voice);
flow.voice = "Polly.Joanna-Neural";

flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/trumpet-ghostbusters.mp3" });
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/hello-ghostbusters.mp3" });
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/who-you-gonna-call-intro.mp3" });

// Create Menu Choices group 'main-choices-1', then add to gather
flow.menus.BuildGatherMenuOption("main-choices-1", Flows.GatherVerbType.Say, { message: "Called from %%From%% To report paranormal activity press 1 now" }, Flows.GatherInputType.Dtmf, "1", [], "report_sighting");
flow.menus.BuildGatherMenuOption("main-choices-1", Flows.GatherVerbType.Say, { message: "To be added to the ecto 4 1 1 neighborhood alert network please press 2 now" }, Flows.GatherInputType.Dtmf, "2", [], "signup_community_alert");

// Add created 'main-choices-1' to 'main' gather menu
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Gather, { "optionsId": "main-choices-1", "loop": 3 });

// Say Good Bye! if no options selected after x tries
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Good Bye!" });

// Create Menu Path 'confirmed'
flow.menus.AddResponse("report_sighting", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Report your experience now . . . . . . . . ................................................ .  go on . . ................................................ . . . . . . .  on moment please " });
flow.menus.AddResponse("report_sighting", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/we-got-one-ghostbusters.mp3" });
flow.menus.AddResponse("report_sighting", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/snoopclose.wav" });
flow.menus.AddResponse("report_sighting", Flows.MediaType.Voice, Flows.VerbType.Function, {
    "callback": () => {
        console.log("function called from report_sighting");
        https.get('https://ecto411.codergames.dev/add-report-sighting?phone=15555551234', (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data).explanation);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
});

flow.menus.AddResponse("signup_community_alert", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Thank you, your number has been added to the ecto 4 1 1 alert system! Good Bye !!" });
flow.menus.AddResponse("signup_community_alert", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/hey-anybody-see-a-ghost-ghostbusters.mp3" });
flow.menus.AddResponse("signup_community_alert", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/snoopclose.wav" });
flow.menus.AddResponse("signup_community_alert", Flows.MediaType.Voice, Flows.VerbType.Function, {
    "callback": () => {
        console.log("function called from signup_community_alert");
        https.get('https://ecto411.codergames.dev/add-community-alert?phone=15555551234', (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data).explanation);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
});
exports.getFlow = function () {
    return flow;
}