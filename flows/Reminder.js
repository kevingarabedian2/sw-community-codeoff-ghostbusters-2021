const Flows = require('../app-flow.js');

var flow = new Flows.Flow("Reminder", "Ecto 411 Alert System", Flows.MediaType.Voice);
flow.voice = "Alice";

// Setup Variables to use in call flow, #FUTURE TO DO: Add API fulfillments, on access
// Will create a flow template, and swap variables at run time.
flow.variables.SetVar("main", "doctor", "Dr. Micheal Baden");
flow.variables.SetVar("main", "appointment_date", "June 3rd, 2021");
flow.variables.SetVar("main", "appointment_time", "9:30 AM");
flow.variables.SetVar("main", "location_name", "New York City Mortuary");
flow.variables.SetVar("main", "location_address", "462 1st Avenue, New York, NY 10016");
flow.variables.SetVar("main", "location_phone", "(518) 430-7855");

//flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Play, { "message": "https://sinergyds.blob.core.windows.net/signalwire/popcorn.mp3" });

flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Thank you for calling ghostbusters." });

// Create Menu Path 'main'
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Hello, this is %%location_name%%. We want to remind you of your upcoming scheduled appointment with %%doctor%% at %%location_address%% on %%appointment_date%% at %%appointment_time%%." });

// Create Menu Choices group 'main-choices-1', then add to gather
flow.menus.BuildGatherMenuOption("main-choices-1", Flows.GatherVerbType.Say, { message: "To confirm your appoinment, please press 1 now" }, Flows.GatherInputType.Dtmf, "1", [], "confirmed");
flow.menus.BuildGatherMenuOption("main-choices-1", Flows.GatherVerbType.Say, { message: "If you havde any questions concerning your appointment, or need to reschedule please call our office during normal business hours at %%location_phone%%." }, Flows.GatherInputType.Dtmf, "2", [], "cancel");

// Add created 'main-choices-1' to 'main' gather menu
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Gather, { "optionsId": "main-choices-1", "loop": 3 });

// Say Good Bye! if no options selected after x tries
flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Good Bye!" });

// Create Menu Path 'confirmed'
flow.menus.AddResponse("confirmed", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Thank you, your appointment has been confirmed. We look forward to seeing you.  Have a nice day! Good Bye!" });

// Create Menu Path 'failed-validation'
flow.menus.AddResponse("failed-validation", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "We could not validate your request good bye!" });

exports.getFlow = function() {
    return flow;
}