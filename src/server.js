const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const router = require('./routes.js')
require( './database/index')

const script = require('./services/getSpaceFlightNews.js')
const cronJob = require('./services/cronServices.js')

const app = express()

cronJob.start()
app.use(cors())

app.use(express.json())
app.use(morgan('dev'))
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
script()

const port = process.env.PORT || 3333

app.listen( port, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`connected server http://localhost:${port}`)
    }     
})

