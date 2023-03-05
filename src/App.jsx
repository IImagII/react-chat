import './index.css'
import { JoinBlock } from './components/JoinBlock'
import reducer from './reducer.js'
import { useEffect, useReducer } from 'react'
import socket from './socket'
import Chat from './components/Chat'
import axios from 'axios'

function App() {
   const [state, dispatch] = useReducer(reducer, {
      isAuth: false,
      room: null, // номер комнаты
      userName: null, // под каким именем зашел пользователь
      users: [], // это те пользователи коотрые находятьс в комнате
      messages: [], // это сообещня коотрые написаны
   })

   //делаем функцию для смены нашего состоняи авторизации (obj мы передаем из JoinBlock.jsx)
   async function onLogin(obj) {
      dispatch({ type: 'IS_AUTH', payload: obj })
      // подключаемся к комнате  через сокет
      socket.emit('ROOM:JOIN', obj)
      //делаем запрос get чтобы получить данные о том что сейчас произошло в комнате и отобразить это новому пользователю
      const { data } = await axios.get(
         `http://localhost:3002/rooms/${obj.room}`
      )
      //ДЛя получения актуалных сообщений даже когда вышел все сообщения сохраняются
      dispatch({ type: 'SET_DATA', payload: data })
   }

   //создаем для рефакторинга кода чтобы не писать два раза в полседующем useEffcet()
   const setUsers = users => {
      dispatch({ type: 'SET_USERS', payload: users })
   }

   //рефакторинг для добавления сообщений
   const addMessage = message => {
      dispatch({ type: 'NEW_MESSAGE', payload: message })
   }

   //пишем чтобы проверить что к нам подключился другой пользоватлеь
   useEffect(() => {
      //добаление пользователя
      socket.on('ROOM:JOINED', setUsers)

      //удаление пользователя
      socket.on('ROOM:SET_LEAVE', setUsers)

      //сокет добавления новых сообщений
      socket.on('ROOM:NEW_MESSAGE', addMessage)
   }, [])

   return (
      <div className='wrapper'>
         {/* соответсвенно показываем или нет наш чат в зависимости от авторизации */}
         {!state.isAuth ? (
            <JoinBlock onLogin={onLogin} />
         ) : (
            <Chat {...state} addMessage={addMessage} />
         )}
      </div>
   )
}

export default App
