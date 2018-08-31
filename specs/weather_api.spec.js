const callWeatherApi = require('../src/weather_api')
require('dotenv').config()

callWeatherApi('Cairo', '').then(x=>{
    console.log('Success', x)
}).catch(err=>{
    console.log('error', err)
})