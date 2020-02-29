const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url ='https://api.darksky.net/forecast/3e40cca877141d06e81739ea49bbd05e/'+latitude+','+longitude
    request({url, json: true},(error,{body})=>{
        if(error){
                    callback('Unable to connect to weather service',undefined)
                }
                else if (body.error){
                    callback('unable to find location.',undefined)
                }
                else {
                    callback(undefined,'it is currently '+body.currently.temperature+' degrees out and there is '+body.currently.precipProbability+'% chances of rain.')
              
                }
    }
    )
}
module.exports = forecast