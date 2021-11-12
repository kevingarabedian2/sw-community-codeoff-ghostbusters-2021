const Flows = require('../app-flow.js');

var flow = new Flows.Flow("ReportVoice", "Sightings Voice", Flows.MediaType.Voice);
flow.voice = "Alice";

flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "Your sighting has been recorded." });

exports.getFlow = function() {
    return flow;
}