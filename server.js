import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const server = createServer(app) // тут мы показываем что наш сервер работает через наше приложение
const socketio = new Server(server) //подключили к нашему серверу webSocket
dotenv.config() // это делаем для переменных

//Переменные из .env
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json()) // для того чтобы воспринимать формат json

const rooms = new Map()

// для того чтобы отправить json файл ответ на клиент
app.get('/rooms', (req, res) => {
   rooms.set('hello', '')
   res.json(rooms)
})

//проверяем подключен ли человек к webScocket
socketio.on('connection', socket => {
   console.log('user connection', socket.id)
})

server.listen(PORT, error => {
   //если ошибка есть то верни нам ошибку то есть делаем проверку на ошибки
   if (error) {
      throw Error(error)
   }
   console.log(`Сервер запущен на порту ${PORT}`)
})
