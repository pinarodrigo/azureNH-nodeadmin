var azure = require('azure');
var CryptoJS = require("crypto-js");
var hubName = 'msazuremobilenativescriptnotificationhub';
var connectionString = 'Endpoint=sb://msazuremobilenativescript.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=68N0vDpCDjEjERffOBG/U06ju094N7yXmENYE0N8n0Q=';
var notificationHubService = azure.createNotificationHubService(hubName, connectionString, function (err) {
    if (!err) {
        //Connection to Notification hub was successfull
    } else {
        cosole.err("Failed to connect to Azure Notification Hub");
    }
});

var getSelfSignedToken = function (targetUri, sharedKey, ruleId,
    expiresInMins) {
    targetUri = encodeURIComponent(targetUri.toLowerCase()).toLowerCase();

    // Set expiration in seconds
    var expireOnDate = new Date();
    expireOnDate.setMinutes(expireOnDate.getMinutes() + expiresInMins);
    var expires = Date.UTC(expireOnDate.getUTCFullYear(), expireOnDate
        .getUTCMonth(), expireOnDate.getUTCDate(), expireOnDate
            .getUTCHours(), expireOnDate.getUTCMinutes(), expireOnDate
                .getUTCSeconds()) / 1000;
    var tosign = targetUri + '\n' + expires;

    // using CryptoJS
    var signature = CryptoJS.HmacSHA256(tosign, sharedKey);
    var base64signature = signature.toString(CryptoJS.enc.Base64);
    var base64UriEncoded = encodeURIComponent(base64signature);

    // construct autorization string
    var token = "SharedAccessSignature sr=" + targetUri + "&sig="
        + base64UriEncoded + "&se=" + expires + "&skn=" + ruleId;
    // console.log("signature:" + token);
    return token;
};

// get list of regoistrations
notificationHubService.listRegistrations(function (err, registrations) {
    //console.log(registrations);
    console.log(getSelfSignedToken('https://msazuremobilenativescript.servicebus.windows.net/msazuremobilenativescriptnotificationhub','68N0vDpCDjEjERffOBG/U06ju094N7yXmENYE0N8n0Q=','DefaultFullSharedAccessSignature',3600));
});
