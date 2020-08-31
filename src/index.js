const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { loadavg } = require('os')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New WebSocket connection')




    socket.emit('message', 'Welcome')
    socket.broadcast.emit('message', 'a new user has joined')  //emits to everybody expect itself

    socket.on('sendMessage',(message)=>{
        io.emit('message',message) //triggers to every single client
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left')
    })

    socket.on('sendLocation',(location)=>{
        io.emit('message',`latitude: ${location.latitude} and longitude: ${location.longitude}`)
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
