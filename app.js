const express = require('express')
const app = express()
const morgan = require('morgan')
// Db Connection
const dbConnect = require('./db-config')

// routes
const customer = require('./customer.routes');

const port = 4000 || 5000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('tiny'))
app.use('/customer',customer)

app.get('/', (req, res) => {
    res.status(200).json({ response: true, message: "Server Is Working Fine." })
})
app.listen(port, async(error) => {
    if(error){

    }else{
        console.log(`Server Running On http://localhost:${port}`);
        await dbConnect()
    }
})
