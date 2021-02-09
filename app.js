const https = require('https')
const options = {
    hostname: 'public-api.tracker.gg',
    port: 443,
    path: '/v2/overwatch/standard/profile/psn/mooky456',
    method: 'GET',
    headers: {
        "TRN-Api-key": '1f56ef78-2811-42e9-8dc7-0c28bb8e479f'
        }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()