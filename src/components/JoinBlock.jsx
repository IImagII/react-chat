import React, { useState } from 'react'
import axios from 'axios'

export const JoinBlock = ({ onLogin }) => {
   const [room, setRoom] = useState('')
   const [userName, setUserName] = useState('')
   const [isLoading, setsLoading] = useState(false) // для реализации смены кнопки

   const postSocket = async () => {
      if (!room || !userName) {
         return alert('Не верные данные')
      }
      //создали этот объект чтобы передавать наши состояния далее на сервер
      const obj = {
         room,
         userName,
      }
      setsLoading(true)
      await axios.post('http://server-chat-production.up.railway.app/rooms', obj)
      onLogin(obj)
   }

   return (
      <div className='join-block'>
         <input
            type='text'
            placeholder='RoomID'
            value={room}
            onChange={e => setRoom(e.target.value)}
         />
         <input
            type='text'
            placeholder='Ваше имя'
            value={userName}
            onChange={e => setUserName(e.target.value)}
         />
         <button
            disabled={isLoading}
            className='btn btn-success'
            onClick={postSocket}
         >
            {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
         </button>
      </div>
   )
}
