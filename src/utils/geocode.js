const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiMnNhamliMiIsImEiOiJja2JxM3ZrdXQyaWhtMnNxdmhxcnRwdjd2In0.gOW1ck9ISOkL7tUZbkSrAQ&limit=1'    
             
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to conncet to location service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })

        }
    })
}

module.exports = geocode


// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiMnNhamliMiIsImEiOiJja2JxM3ZrdXQyaWhtMnNxdmhxcnRwdjd2In0.gOW1ck9ISOkL7tUZbkSrAQ&limit=1'

// request({url: geocodeUrl , json: true} , 
//          (error, response) =>{

//           if (error) {
//                console.log('Unable to connect location service!');
//           } 
//           else if(response.body.features.length === 0) {
//               console.log('Unable to find location. Try another search.');  
//           }
//           else {
//                const latitude = response.body.features[0].center[1]
//              const longitude = response.body.features[0].center[0]
//             console.log(latitude,longitude);
//                 }    
// })