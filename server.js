//Constants
const express = require('express')
const app     = express()
const http    = require('http').Server(app)
const port    = process.env.PORT || 5000
const io      = require('socket.io')(http)
const cors    = require('cors')
const logger  = require("morgan");
// bodyParser = require('body-parser')

app.use(express.static(__dirname+'node_modules'))
app.use(express.static(__dirname +'/build'))
app.use(cors());
app.use(logger("dev"));

//Routes

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname+'/build/index.html')
    // res.send('connected')
})

http.listen(port,()=>{
    console.log('server is listening at port ',port)
})

io.on('connection',(socket)=>{
    console.log('connected')
})