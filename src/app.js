const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Andrew' 
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Andrew'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Andrew Mead',
        helpText: 'This is help page.'
    })
})

// app.get('',(req, res) => {
//    res.send('<h1>Weather</h1>')
// })

// app.get('',(req, res) => {
//    res.send('Help page')
// })

// app.get('',(req, res) => {
//     res.send('<h1>About</h1>')
//  })





 app.get('/weather',(req, res) => {
     if(!req.query.address){
   return res.send({
        error: 'You must provide an address.'
    })
}
   // console.log(req.query.address)
    // res.send({
    //     forecast:'it is snowing',
    //     location: 'New york',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, {latitude, longitude, location } = {} ) =>
    {
        if(error){
            return res.send({error})         // shorthand 'error'
        }
        // console.log('Error',error)
        // console.log('Data',data)
    
        forecast(latitude,longitude,(error,forecastData) =>
    {
        if(error){
            return res.send({error})
        
        }
        res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        // console.log(location)
        // console.log(forecastData)
        // console.log('Error',error)
        // console.log('Data',data)
    })
    })
 })

app.get('/help/*', (req, res) => {
    res.render('404' ,{
        title : '404',
        name: 'Andrew Mead',
          errorMessage: 'Help article not found.'

    })
})



 })









app.get('/products', (req, res) => {
    if(!req.query.search) {
    return res.send({
        error: 'you must provide a search item.'
    })
}
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {               // * is wild card character
      res.render('404', {
          title: '404',
          name: 'Andrew Mead',
          errorMessage: 'Page not found.'
      })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})

