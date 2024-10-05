const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')

const corsOptions = {
    origin: '*', 
    credentials: true,
}

//middleware//
const app = express()
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploads'))
const server = http.createServer(app)

//const accountRoutes = require('./Routes/accountRoutes')

//app.use('/account', accountRoutes)


// database connection//
const port = process.env.PORT || 5001

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})