const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')





const app = express()

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static dircetory to server
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sajib'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sajib'
    });  
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
       desc: 'get your help from here',
       name: 'Sajib'
    });  
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide a address!'
        }) 
    }
        
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send ({ error }) 
        }
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send ({ error }) 
                 }
              res.send({
                  forecast: forecastdata,
                  location,
                    Address: req.query.address
                });  
              
            })
           
            })

        })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sajib',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
         res.render('404', {
             title: '404',
             name: 'Sajib',
             errorMessage: 'Page not found'
         })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
    
})

