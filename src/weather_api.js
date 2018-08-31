const http = require('http');
const host = 'api.worldweatheronline.com';

module.exports =  (city, date) => {
    return new Promise((resolve, reject) => {
        let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
            '&q=' + encodeURIComponent(city) + '&key=' + process.env.wwoApiKey + '&date=' + date;
        console.log('API Request: ' + host + path);

        http.get({ host: host, path: path }, (res) => {
            let body = ''; // var to store the response chunks
            res.on('data', (d) => { body += d; }); // store each response chunk
            res.on('end', () => {
                // After all the data has been received parse the JSON for desired data
                const response = JSON.parse(body);
                const forecast = response['data']['weather'][0];
                const location = response['data']['request'][0];
                const conditions = response['data']['current_condition'][0];
                const currentConditions = conditions['weatherDesc'][0]['value'];

                // Create response
                const output = `Current conditions in the ${location['type']} 
                ${location['query']} are ${currentConditions} with a projected high of
                ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
                ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
                ${forecast['date']}.`;

                // Resolve the promise with the output text
                console.log(output);
                resolve(output);
            });
            res.on('error', (error) => {
                console.log(`Error calling the weather API: ${error}`)
                reject();
            });
        });
    });
};