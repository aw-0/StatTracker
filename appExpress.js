const express = require('express')
const https = require('https')
var app = express()
const port = 3000
const options = {
    hostname: 'public-api.tracker.gg',
    port: 443,
    path: '/v2/overwatch/standard/profile',
    method: 'GET',
    headers: {
        "TRN-Api-key": '1f56ef78-2811-42e9-8dc7-0c28bb8e479f'
        }
}

app.use(express.static('public'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var str = ""

app.get('/stat1', (req, res) => {
    console.log(req.query);
    var playerStats = {
        platformUserHandle: 'tbd',
        platformSlug: 'tbd',
        timePlayed: 'tbd',
        wins: 0,
        wlPercentage: 0
    };
    str = "";
    callback = function(response) {
        response.on('data', function (chunk) {
            str += chunk;
        });
        
        response.on('end', function () {
            console.log(str);
            var json = JSON.parse(str);
            console.log(json.data)
            playerStats.platformUserHandle = json.data.platformInfo.platformUserHandle;
            playerStats.platformSlug = json.data.platformInfo.platformSlug;
            //console.log(json.data.segments);
            //console.log(json.data.segments[0])
            playerStats.timePlayed = json.data.segments[0].stats.timePlayed.displayValue;
            playerStats.wins = json.data.segments[0].stats.wins.value;
            playerStats.wlPercentage = json.data.segments[0].stats.wlPercentage.value
            playerStats.chartData = [json.data.segments[0].stats.goldMedals.value, 
            json.data.segments[0].stats.silverMedals.value, 
            json.data.segments[0].stats.bronzeMedals.value];;
            options.path = "/v2/overwatch/standard/profile"
            console.log(playerStats)
            res.send(playerStats);
        });
    }
    options.path = `${options.path}/${req.query.platform}/${req.query.userHandle}`;
    const req1 = https.request(options, callback).end();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})