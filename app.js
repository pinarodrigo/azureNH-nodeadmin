var azure = require('azure');
var hubName = 'msazuremobilenativescriptnotificationhub';
var connectionString = 'Endpoint=sb://msazuremobilenativescript.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=68N0vDpCDjEjERffOBG/U06ju094N7yXmENYE0N8n0Q=';
var notificationHubService = azure.createNotificationHubService(hubName, connectionString, function(err) {
    if (!err) {
        //Connection to Notification hub was successfull
    } else {
        cosole.err("Failed to connect to Azure Notification Hub");
    }
});

// template notification
/*notificationHubService.send(
    null, {
        message: 'This is my template notification',
        goesTo: 'all registrations irrespective of the platform'
    },
    function(error) {
        if (!error) {
            console.log('message sent successfully');
        }
    });*/


// get list of regoistrations
notificationHubService.listRegistrations(function(err, registrations) {
    console.log(registrations);
});
