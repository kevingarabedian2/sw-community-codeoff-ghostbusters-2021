"use strict";
exports.__esModule = true;
exports.Flow = exports.GatherVerbType = exports.VerbType = exports.GatherInputType = exports.MediaType = exports.Variables = exports.Menus = exports.menuVerb = void 0;
var menuVerb = /** @class */ (function () {
    function menuVerb() {
    }
    return menuVerb;
}());
exports.menuVerb = menuVerb;
var Menus = /** @class */ (function () {
    function Menus() {
        this.myMenus = {};
        this.myGathers = {};
    }
    Menus.prototype.GetPath = function (path) {
        console.log(path);
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        var tree = getProperty(this.myMenus, path);
        console.log(tree);
        console.log('returning GetPath.');
        return tree;
    };
    Menus.prototype.GetGatherOptions = function (optionsId) {
        console.log(optionsId);
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        var tree = getProperty(this.myGathers, optionsId);
        console.log(tree);
        console.log('returning GetGatherOptions.');
        return tree;
    };
    Menus.prototype.GetMenuOptionsAction = function (optionsId, value) {
        console.log(optionsId);
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        var tree = getProperty(this.myGathers, optionsId);
        console.log(tree);
        console.log('returning GetMenuOptionsAction.');
        var menuRoute = "failed-validation"; // if can not find match, then fail it.
        for (var ii = 0; ii < tree.length; ii++) {
            if (tree[ii].verbType === VerbType.Say) {
                // var voice = tree[ii].verbParams.voice??this.voice??"women";
                // var loop = tree[ii].verbParams.loop??1;
                // var message = tree[ii].verbParams.message??"";
                // var language = tree[ii].verbParams.language??"en";
            }
            if (tree[ii].verbType === VerbType.Play) {
                // var loop = tree[ii].verbParams.loop??1;
                // var digits = tree[ii].verbParams.digits??"";
                // var message = tree[ii].verbParams.message??"";
            }
        }
        return menuRoute;
    };
    Menus.prototype.AddResponse = function (menu, mediaType, verbType, verbParams) {
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        function setProperty(obj, key, value) {
            obj[key] = value;
        }
        var newEntry = {
            "menu": menu,
            "mediaType": mediaType,
            "verbType": verbType,
            "verbParams": verbParams
        };
        var newProp = getProperty(this.myMenus, menu);
        if (newProp != null) {
            newProp.push(newEntry);
            setProperty(this.myMenus, menu, newProp);
        }
        else {
            setProperty(this.myMenus, menu, [newEntry]);
        }
        //var mm = getProperty(this.myMenus, menu);
        //console.log(mm);
        console.log('my menu dump');
        console.log(this.myMenus);
        return true;
    };
    Menus.prototype.BuildGatherMenuOption = function (id, verbType, verbParams, inputType, matchDigits, matchSpeech, matchActionTarget) {
        if (inputType === void 0) { inputType = GatherInputType.Dtmf; }
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        function setProperty(obj, key, value) {
            obj[key] = value;
        }
        var newEntry = {
            "id": id,
            "verbType": verbType,
            "verbParams": verbParams,
            "x-matchActionTarget": matchActionTarget,
            "x-matchDigits": matchDigits,
            "x-matchSpeech": matchSpeech,
            "x-matchInput": inputType
        };
        var newProp = getProperty(this.myGathers, id);
        if (newProp != null) {
            newProp.push(newEntry);
            setProperty(this.myGathers, id, newProp);
            return newProp;
        }
        else {
            setProperty(this.myGathers, id, [newEntry]);
            return [newEntry];
        }
    };
    return Menus;
}());
exports.Menus = Menus;
var Variables = /** @class */ (function () {
    function Variables() {
        this.myVars = {};
    }
    Variables.prototype.GetVar = function (scope, key) {
        console.log(scope + " " + key);
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        var myVar = getProperty(this.myVars, key);
        return myVar;
    };
    Variables.prototype.GetVars = function (scope) {
        console.log(scope);
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        var myVar = getProperty(this.myVars, scope);
        console.log(myVar);
        return myVar;
    };
    Variables.prototype.RenderTemplate = function (text, scope) {
        var _a, _b, _c;
        console.log(scope);
        var scopeVars = this.GetVars(scope);
        var returnText = text;
        if (scopeVars) {
            for (var i = 0; i < scopeVars.length; i++) {
                var key = (_a = scopeVars[i].key) !== null && _a !== void 0 ? _a : "";
                var val = (_b = scopeVars[i].value) !== null && _b !== void 0 ? _b : "";
                var sco = (_c = scopeVars[i].scope) !== null && _c !== void 0 ? _c : "";
                returnText = returnText.replace("%%" + key + "%%", val).replace("%%" + key + "%%", val).replace("%%" + key + "%%", val);
            }
        }
        return returnText;
    };
    Variables.prototype.SetVar = function (scope, key, value) {
        function getProperty(obj, key) {
            return obj[key]; // Inferred type is T[K]
        }
        function setProperty(obj, key, value) {
            obj[key] = value;
        }
        var newEntry = {
            "scope": scope,
            "key": key,
            "value": value
        };
        var newProp = getProperty(this.myVars, scope);
        if (newProp != null) {
            newProp.push(newEntry);
            setProperty(this.myVars, scope, newProp);
        }
        else {
            setProperty(this.myVars, scope, [newEntry]);
        }
        console.log(this.myVars);
        return true;
    };
    return Variables;
}());
exports.Variables = Variables;
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Amazon_Alexa"] = 0] = "Amazon_Alexa";
    MediaType[MediaType["Voice"] = 1] = "Voice";
    MediaType[MediaType["Text"] = 2] = "Text";
    MediaType[MediaType["Chat"] = 3] = "Chat";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var GatherInputType;
(function (GatherInputType) {
    GatherInputType[GatherInputType["Dtmf"] = 0] = "Dtmf";
    GatherInputType[GatherInputType["Speech"] = 1] = "Speech";
    GatherInputType[GatherInputType["Both"] = 2] = "Both";
})(GatherInputType = exports.GatherInputType || (exports.GatherInputType = {}));
var VerbType;
(function (VerbType) {
    VerbType[VerbType["Say"] = 0] = "Say";
    VerbType[VerbType["Play"] = 1] = "Play";
    VerbType[VerbType["Gather"] = 2] = "Gather";
    VerbType[VerbType["Dial"] = 3] = "Dial";
    VerbType[VerbType["Enqueue"] = 4] = "Enqueue";
    VerbType[VerbType["Hangup"] = 5] = "Hangup";
    VerbType[VerbType["Record"] = 6] = "Record";
    VerbType[VerbType["Redirect"] = 7] = "Redirect";
    VerbType[VerbType["Reject"] = 8] = "Reject";
    VerbType[VerbType["Function"] = 9] = "Function";
    //Refer,
    //Leave,
    //Pause,
    //Pay,
    //Siprec,
    //Stream
})(VerbType = exports.VerbType || (exports.VerbType = {}));
var GatherVerbType;
(function (GatherVerbType) {
    GatherVerbType[GatherVerbType["Say"] = 0] = "Say";
    GatherVerbType[GatherVerbType["Play"] = 1] = "Play";
    GatherVerbType[GatherVerbType["Pause"] = 2] = "Pause";
})(GatherVerbType = exports.GatherVerbType || (exports.GatherVerbType = {}));
var Flow = /** @class */ (function () {
    function Flow(id, name, mediaType) {
        // some defaults to consider for A.I. NL ?
        this.voice = "alice";
        this.language = "en-US";
        this.onHoldMusic = "https://s3.amazonaws.com/com.twilio.sounds.music/index.xml";
        this.thinkingSound = "";
        this.typingSound = "";
        this.WelcomeSplashSound = "";
        this.id = id;
        this.name = name;
        this.mediaType = mediaType;
        this.menus = new Menus();
        this.variables = new Variables();
    }
    Flow.prototype.GenerateLaML = function (path) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50;
        var VoiceResponse = require('twilio').twiml.VoiceResponse;
        var response = new VoiceResponse();
        var treeBranch = this.menus.GetPath(path);
        if (!treeBranch) {
            // No Route Found for 'Path'
            // return fancy laml code here
            response.say({
                voice: (_a = this.voice) !== null && _a !== void 0 ? _a : "women",
                language: "en"
            }, "An application error has occured. Please try again later. Good Bye!");
            response.hangup();
            return response.toString();
        }
        console.log(treeBranch);
        for (var i = 0; i < treeBranch.length; i++) {
            if (treeBranch[i].mediaType === MediaType.Voice) { // if medium is Voice
                if (treeBranch[i].verbType === VerbType.Say) {
                    var voice = (_c = (_b = treeBranch[i].verbParams.voice) !== null && _b !== void 0 ? _b : this.voice) !== null && _c !== void 0 ? _c : "women";
                    var loop = (_d = treeBranch[i].verbParams.loop) !== null && _d !== void 0 ? _d : 1;
                    var message = (_e = treeBranch[i].verbParams.message) !== null && _e !== void 0 ? _e : "";
                    var language = (_f = treeBranch[i].verbParams.language) !== null && _f !== void 0 ? _f : "en";
                    // Replace text with template variables, if exist.
                    message = this.variables.RenderTemplate(message, path);
                    response.say({
                        voice: voice,
                        language: language,
                        loop: loop
                    }, message);
                }
                if (treeBranch[i].verbType === VerbType.Play) {
                    var loop = (_g = treeBranch[i].verbParams.loop) !== null && _g !== void 0 ? _g : 1;
                    var digits = (_h = treeBranch[i].verbParams.digits) !== null && _h !== void 0 ? _h : "";
                    var message = (_j = treeBranch[i].verbParams.message) !== null && _j !== void 0 ? _j : "";

                    if (loop > 1) {
                        response.play({
                            loop: loop
                        }, message);
                    } else if (loop > 1 && digits != "") {
                        response.play({
                            digits: digits,
                            loop: loop
                        }, message);
                    } else if (digits != "") {
                        response.play({
                            digits: digits
                        }, message);
                    } else {
                        response.play({
                        }, message);
                    }
                }
                if (treeBranch[i].verbType === VerbType.Dial) {
                    var action = (_k = treeBranch[i].verbParams.action) !== null && _k !== void 0 ? _k : "";
                    var answerOnBridge = (_l = treeBranch[i].verbParams.answerOnBridge) !== null && _l !== void 0 ? _l : false;
                    var callerId = (_m = treeBranch[i].verbParams.callerId) !== null && _m !== void 0 ? _m : ""; //?
                    var callReason = (_o = treeBranch[i].verbParams.callReason) !== null && _o !== void 0 ? _o : "";
                    var hangupOnStar = (_p = treeBranch[i].verbParams.hangupOnStar) !== null && _p !== void 0 ? _p : false;
                    var method = (_q = treeBranch[i].verbParams.method) !== null && _q !== void 0 ? _q : "POST";
                    var record = (_r = treeBranch[i].verbParams.record) !== null && _r !== void 0 ? _r : "do-not-record";
                    var recordingStatusCallback = (_s = treeBranch[i].verbParams.recordingStatusCallback) !== null && _s !== void 0 ? _s : "";
                    var recordingStatusCallbackMethod = (_t = treeBranch[i].verbParams.recordingStatusCallbackMethod) !== null && _t !== void 0 ? _t : "POST";
                    var recordingStatusCallbackEvent = (_u = treeBranch[i].verbParams.recordingStatusCallbackEvent) !== null && _u !== void 0 ? _u : "completed";
                    var recordingTrack = (_v = treeBranch[i].verbParams.recordingTrack) !== null && _v !== void 0 ? _v : "both";
                    var referUri = (_w = treeBranch[i].verbParams.referUri) !== null && _w !== void 0 ? _w : "";
                    var referMethod = (_x = treeBranch[i].verbParams.referMethod) !== null && _x !== void 0 ? _x : "POST";
                    var ringTone = (_y = treeBranch[i].verbParams.ringTone) !== null && _y !== void 0 ? _y : ""; //?
                    var timeLimit = (_z = treeBranch[i].verbParams.timeLimit) !== null && _z !== void 0 ? _z : 14400;
                    var timeout = (_0 = treeBranch[i].verbParams.timeout) !== null && _0 !== void 0 ? _0 : 30;
                    var trim = (_1 = treeBranch[i].verbParams.trim) !== null && _1 !== void 0 ? _1 : "do-not-trim";
                    var message = (_2 = treeBranch[i].verbParams.message) !== null && _2 !== void 0 ? _2 : "";
                    response.dial({
                        action: action,
                        answerOnBridge: answerOnBridge,
                        callerId: callerId,
                        callReason: callReason,
                        hangupOnStar: hangupOnStar,
                        method: method,
                        record: record,
                        recordingStatusCallback: recordingStatusCallback,
                        recordingStatusCallbackMethod: recordingStatusCallbackMethod,
                        recordingStatusCallbackEvent: recordingStatusCallbackEvent,
                        recordingTrack: recordingTrack,
                        referUri: referUri,
                        referMethod: referMethod,
                        ringTone: ringTone,
                        timeLimit: timeLimit,
                        timeout: timeout,
                        trim: trim
                    }, message);
                }
                if (treeBranch[i].verbType === VerbType.Enqueue) {
                    var action = (_3 = treeBranch[i].verbParams.action) !== null && _3 !== void 0 ? _3 : "";
                    var method = (_4 = treeBranch[i].verbParams.method) !== null && _4 !== void 0 ? _4 : "POST";
                    var waitUrl = (_5 = treeBranch[i].verbParams.waitUrl) !== null && _5 !== void 0 ? _5 : "https://s3.amazonaws.com/com.twilio.sounds.music/index.xml";
                    var waitUrlMethod = (_6 = treeBranch[i].verbParams.waitUrlMethod) !== null && _6 !== void 0 ? _6 : "POST";
                    var workflowSid = (_7 = treeBranch[i].verbParams.workflowSid) !== null && _7 !== void 0 ? _7 : "";
                    var message = (_8 = treeBranch[i].verbParams.message) !== null && _8 !== void 0 ? _8 : "";
                    response.enqueue({
                        action: action,
                        method: method,
                        waitUrl: waitUrl,
                        waitUrlMethod: waitUrlMethod,
                        workflowSid: workflowSid
                    }, message);
                }
                if (treeBranch[i].verbType === VerbType.Gather) {
                    console.log('Building Gather');
                    var optionsId = (_9 = treeBranch[i].verbParams.optionsId) !== null && _9 !== void 0 ? _9 : "";
                    var gatherBranch = this.menus.GetGatherOptions(optionsId);
                    console.log(gatherBranch);
                    var xNumDigits = "unlimited";
                    if (gatherBranch.length < 10) {
                        xNumDigits = "1";
                    }
                    else if (gatherBranch.length < 100) {
                        xNumDigits = "2";
                    }
                    var finishOnKey = (_10 = treeBranch[i].verbParams.finishOnKey) !== null && _10 !== void 0 ? _10 : "#";
                    var hints = (_11 = treeBranch[i].verbParams.hints) !== null && _11 !== void 0 ? _11 : "";
                    var input = (_12 = treeBranch[i].verbParams.input) !== null && _12 !== void 0 ? _12 : "dtmf";
                    var language = (_13 = treeBranch[i].verbParams.language) !== null && _13 !== void 0 ? _13 : "en-US";
                    var method = (_14 = treeBranch[i].verbParams.method) !== null && _14 !== void 0 ? _14 : "POST";
                    var numDigits = (_15 = treeBranch[i].verbParams.numDigits) !== null && _15 !== void 0 ? _15 : xNumDigits;
                    var partialResultCallback = (_16 = treeBranch[i].verbParams.partialResultCallback) !== null && _16 !== void 0 ? _16 : ""; //"/inbound/voice/partial?input=" + input + "&fromPath=" + path + "&regex=&numDigits=" + numDigits;;
                    var partialResultCallbackMethod = (_17 = treeBranch[i].verbParams.partialResultCallbackMethod) !== null && _17 !== void 0 ? _17 : "POST";
                    var profanityFilter = (_18 = treeBranch[i].verbParams.profanityFilter) !== null && _18 !== void 0 ? _18 : true;
                    var speechTimeout = (_19 = treeBranch[i].verbParams.speechTimeout) !== null && _19 !== void 0 ? _19 : "auto";
                    var timeout = (_20 = treeBranch[i].verbParams.timeout) !== null && _20 !== void 0 ? _20 : 5;
                    var speechModel = (_21 = treeBranch[i].verbParams.speechModel) !== null && _21 !== void 0 ? _21 : "default";
                    var enhanced = (_22 = treeBranch[i].verbParams.enhanced) !== null && _22 !== void 0 ? _22 : false;
                    var actionOnEmptyResult = (_23 = treeBranch[i].verbParams.actionOnEmptyResult) !== null && _23 !== void 0 ? _23 : false;
                    var message = (_24 = treeBranch[i].verbParams.message) !== null && _24 !== void 0 ? _24 : "";
                    var failRoute = (_25 = treeBranch[i].verbParams.failRoute) !== null && _25 !== void 0 ? _25 : "failed-validation";
                    var validationRegex = (_26 = treeBranch[i].verbParams.validationRegex) !== null && _26 !== void 0 ? _26 : "";
                    var action = (_27 = treeBranch[i].verbParams.action) !== null && _27 !== void 0 ? _27 : "/inbound/voice/logic?flow=" + encodeURIComponent(this.id) + "&x-id=" + encodeURIComponent(this.id) + "&x-name=" + encodeURIComponent(this.name) + "&x-count=" + 1 + "&x-failRoute=" + failRoute + "&x-input=" + encodeURIComponent(input) + "&x-OptionsId=" + encodeURIComponent(optionsId) + "&x-menu=" + encodeURIComponent(path) + "&x-regex=" + encodeURIComponent(validationRegex) + "&x-numDigits=" + encodeURIComponent(numDigits) + "&x-language=" + encodeURIComponent(language);
                    var gather = response.gather({
                        action: action,
                        finishOnKey: finishOnKey,
                        hints: hints,
                        input: input,
                        language: language,
                        method: method,
                        numDigits: numDigits,
                        partialResultCallback: partialResultCallback,
                        partialResultCallbackMethod: partialResultCallbackMethod,
                        profanityFilter: profanityFilter,
                        speechTimeout: speechTimeout,
                        timeout: timeout,
                        speechModel: speechModel,
                        enhanced: enhanced,
                        actionOnEmptyResult: actionOnEmptyResult
                    });
                    for (var ii = 0; ii < gatherBranch.length; ii++) {
                        if (gatherBranch[ii].verbType === VerbType.Say) {
                            var voice = (_29 = (_28 = gatherBranch[ii].verbParams.voice) !== null && _28 !== void 0 ? _28 : this.voice) !== null && _29 !== void 0 ? _29 : "women";
                            var loop = (_30 = gatherBranch[ii].verbParams.loop) !== null && _30 !== void 0 ? _30 : 1;
                            var message = (_31 = gatherBranch[ii].verbParams.message) !== null && _31 !== void 0 ? _31 : "";
                            var language = (_32 = gatherBranch[ii].verbParams.language) !== null && _32 !== void 0 ? _32 : "en";
                            // Replace text with template variables, if exist.
                            message = this.variables.RenderTemplate(message, path);
                            gather.say({
                                voice: voice,
                                language: language,
                                loop: loop
                            }, message);
                        }
                        if (gatherBranch[ii].verbType === VerbType.Play) {
                            var loop = (_33 = gatherBranch[ii].verbParams.loop) !== null && _33 !== void 0 ? _33 : 1;
                            var digits = (_34 = gatherBranch[ii].verbParams.digits) !== null && _34 !== void 0 ? _34 : "";
                            var message = (_35 = gatherBranch[ii].verbParams.message) !== null && _35 !== void 0 ? _35 : "";

                            if (loop > 1) {
                                gather.play({
                                    loop: loop
                                }, message);
                            } else if (loop > 1 && digits != "") {
                                gather.play({
                                    digits: digits,
                                    loop: loop
                                }, message);
                            } else if (digits != "") {
                                gather.play({
                                    digits: digits
                                }, message);
                            } else {
                                gather.play({
                                }, message);
                            }

                        }
                    }
                }
                if (treeBranch[i].verbType === VerbType.Hangup) {
                    response.hangup({ reason: reason });
                }
                if (treeBranch[i].verbType === VerbType.Record) {
                    var action = (_36 = treeBranch[i].verbParams.action) !== null && _36 !== void 0 ? _36 : "";
                    var method = (_37 = treeBranch[i].verbParams.method) !== null && _37 !== void 0 ? _37 : "POST";
                    var timeout = (_38 = treeBranch[i].verbParams.timeout) !== null && _38 !== void 0 ? _38 : 5;
                    var finishOnKey = (_39 = treeBranch[i].verbParams.finishOnKey) !== null && _39 !== void 0 ? _39 : "1234567890*#";
                    var maxLength = (_40 = treeBranch[i].verbParams.maxLength) !== null && _40 !== void 0 ? _40 : 3000;
                    var playBeep = (_41 = treeBranch[i].verbParams.playBeep) !== null && _41 !== void 0 ? _41 : true;
                    var trim = (_42 = treeBranch[i].verbParams.trim) !== null && _42 !== void 0 ? _42 : "trim-silence";
                    var recordingStatusCallback = (_43 = treeBranch[i].verbParams.recordingStatusCallback) !== null && _43 !== void 0 ? _43 : "";
                    var recordingStatusCallbackMethod = (_44 = treeBranch[i].verbParams.recordingStatusCallbackMethod) !== null && _44 !== void 0 ? _44 : "POST";
                    var recordingStatusCallbackEvent = (_45 = treeBranch[i].verbParams.recordingStatusCallbackEvent) !== null && _45 !== void 0 ? _45 : "completed";
                    var transcribe = (_46 = treeBranch[i].verbParams.transcribe) !== null && _46 !== void 0 ? _46 : false;
                    var transcribeCallback = (_47 = treeBranch[i].verbParams.transcribeCallback) !== null && _47 !== void 0 ? _47 : "";
                    response.record({
                        action: action,
                        method: method,
                        timeout: timeout,
                        finishOnKey: finishOnKey,
                        maxLength: maxLength,
                        methplayBeepod: playBeep,
                        trim: trim,
                        recordingStatusCallback: recordingStatusCallback,
                        recordingStatusCallbackMethod: recordingStatusCallbackMethod,
                        recordingStatusCallbackEvent: recordingStatusCallbackEvent,
                        transcribe: transcribe,
                        transcribeCallback: transcribeCallback
                    }, message);
                }
                if (treeBranch[i].verbType === VerbType.Redirect) {
                    var method = (_48 = treeBranch[i].verbParams.method) !== null && _48 !== void 0 ? _48 : "POST";
                    var message = (_49 = treeBranch[i].verbParams.message) !== null && _49 !== void 0 ? _49 : "";
                    response.redirect({ method: method }, message);
                }
                if (treeBranch[i].verbType === VerbType.Reject) {
                    var reason = (_50 = treeBranch[i].verbParams.reason) !== null && _50 !== void 0 ? _50 : "rejected";
                    response.reject({ reason: reason });
                }

                if (treeBranch[i].verbType === VerbType.Function) {
                    console.log("*** FUNCTION *** ");
                    console.log(treeBranch[i].verbParams);
                    if (treeBranch[i].verbParams.callback) {
                        console.log("*** FUNCTION CALLBACK EXECUTED *** ");
                        treeBranch[i].verbParams.callback();
                    }
                }
            }
            if (treeBranch[i].mediaType === MediaType.Text) { // if medium is Text
                response.say(treeBranch[i].verbParams.text);
            }
        }
        // return fancy laml code here
        return response.toString();
    };
    return Flow;
}());
exports.Flow = Flow;
