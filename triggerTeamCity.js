var url = "http://" + constants.TeamCityURL + '/app/rest/buildQueue';

var headers = {
   'Content-Type': 'application/xml'
};

let projectCode = constants.TeamCityProjectCode

var dataString = "<build><buildType id='" + projectCode + "'/></build>";

var opts = {
    url: url,
    method: 'POST',
    headers: headers,
    body: dataString,
    auth: {
       "user": constants.TeamCityUserName,
       "pass": constants.TeamCityPassword
    }
};

request.post(opts, function(err, res, bd) {
        if(err) {
            Promise.reject(err);
            emitEvent('SlackEvent', { TeamCityProject: "Unexpected Error Triggering TeamCity Build" }); 


        }
        else {
            emitEvent('SlackEvent', { TeamCityTriggerSuccess: "TeamCity Build just kicked off for this plan " + projectCode }); 

        }
})
