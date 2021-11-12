const Flows = require('../app-flow.js');

var flow = new Flows.Flow("default", "Default Flow", Flows.MediaType.Voice);
flow.voice = "Alice";

flow.menus.AddResponse("main", Flows.MediaType.Voice, Flows.VerbType.Say, { "message": "The route you specified could not be found." });

exports.getFlow = function() {
    return flow;
}