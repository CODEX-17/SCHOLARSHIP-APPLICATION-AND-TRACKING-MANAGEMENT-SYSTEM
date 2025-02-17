const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',  // Allow the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    credentials: true,  // Allow cookies or authentication headers (if necessary)
}


//middleware//
const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../uploads')))
const server = http.createServer(app)



const profilesRoutes = require('./routes/profileRoutes')
const accountsRoutes = require('./routes/accountsRoutes')
const programsRoutes = require('./routes/programsRoutes')
const requestsRoutes = require('./routes/requestsRoutes')
const announcementsRoutes = require('./routes/announcementsRoutes')

app.use('/profiles', profilesRoutes)
app.use('/accounts', accountsRoutes)
app.use('/announcements', announcementsRoutes)
app.use('/programs', programsRoutes)
app.use('/requests', requestsRoutes)

app.options('/accounts/checkAccounts', cors());  // Enable preflight CORS for this route


// database connection//
const port = process.env.PORT || 5001

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})