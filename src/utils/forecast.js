const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url ='https://api.darksky.net/forecast/3e40cca877141d06e81739ea49bbd05e/'+latitude+','+longitude
    request({url, json: true},(error,{body})=>{
        console.log('lat: '+latitude)
        console.log('long: '+longitude)
        if(error){
                    callback('Unable to connect to weather service',undefined)
                }
                else if (body.error){
                    callback('unable to find location.',undefined)
                }
                else {
                    callback(undefined,body.daily.data[0].summary + ' it is currently '+body.currently.temperature+' degrees out and there is '+body.currently.precipProbability+'% chances of rain.'+' Highest temperature was '+ body.daily.data[0].temperatureHigh +' and lowest temperature was '+ body.daily.data[0].temperatureLow+'.')
              
                }
    }
    )
}
module.exports = forecast