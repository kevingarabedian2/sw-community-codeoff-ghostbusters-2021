const Flows = require('../app-flow.js');

var flow = new Flows.Flow("Dispatch", "Ecto 411 Alert System", Flows.MediaType.Voice);
flow.voice = "Polly.Joanna-Neural";

// Setup Variables to use in call flow, #FUTURE TO DO: Add API fulfillments, on access
// Will create a flow template, and swap variables at run time.
flow.variables.SetVar("main", "reported_by", "Scooby Doo");
flow.variables.SetVar("main", "reported_date", "November 10th, 2021");
flow.variables.SetVar("main", "reported_time", "9:30 AM");
flow.variables.SetVar("main", "location_name", " clifton park ");
flow.variables.SetVar("main", "description", " Slimer was spotted ");

//flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/popcorn.mp3" });

flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "This is the Ghost Busters 4 1 1 Notification System! Warning. Warning. Paranormal activity has been detected in your area! " });

// Create Menu Path 'main'
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "At %%reported_time%% on %%reported_date%%, it was reported, that at or near %%location_name%% %%description%% " });

// Create Menu Choices group 'main-choices-1', then add to gather
flow.menus.BuildGatherMenuOption("main-choices-1", Flows.GatherVerbType.Say, { message: "To acknowledge this alert please press 1 now" }, Flows.GatherInputType.Dtmf, "1", [], "confirmed");

// Add created 'main-choices-1' to 'main' gather menu
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Gather, { "optionsId": "main-choices-1", "loop": 3 });

// Say Good Bye! if no options selected after x tries
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Good Bye!" });

// Create Menu Path 'confirmed'
flow.menus.AddResponse("confirmed", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Thank you, don't worry the ghost busters have been dispatched.  Help is on the way.  Seek shelter imediatly.!" });


exports.getFlow = function() {
    return flow;
}