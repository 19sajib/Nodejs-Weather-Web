const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=e327f3e7f0c4f533e4fd8ecbd563197a&query='+latitude+','+longitude   
             
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. Its currently ' + body.current.temperature + ' degress out and its feel like '+ body.current.feelslike +' degress' )

        }
    })
}

module.exports = forecast


// const url ='http://api.weatherstack.com/current?access_key=e327f3e7f0c4f533e4fd8ecbd563197a&query=37.8267,-122.4233&units=f'

// request({url: url, json: true},
//             function (error, response) {
//                  if (error) {
//                       console.log('Unable to connect weather service!');
//                  } 
//                  else if(response.body.error) {
//                      console.log('Unable to find location');  
//                  }
//                  else {
//                     console.log(response.body.current.weather_descriptions[0] + 
//                          '. Its currently ' + response.body.current.temperature + ' degress out and its feel like ' 
//                          + response.body.current.feelslike +' degress' );         
//                  }                
//            // console.log(response);     
//         //   const data = JSON.parse(response.body)
//         //   console.log(data.current);
//        // console.log(response.body);    
// })