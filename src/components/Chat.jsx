import React, { useEffect, useRef, useState } from 'react'
import socket from '../socket'

function Chat({ users, messages, room, userName, addMessage }) {
   const [messageValue, setMessageValue] = useState('') // тут состояние коотрое передает ваши сообщения что вы пишете
   const messagesRef = useRef(null)

   //функция по отправки сообщений на сервер через сокеты
   const onSendMessage = () => {
      //пием сокет который соединяется и отслеживает сообщени и добаляет их от других пользователей
      socket.emit('ROOM:NEW_MESSAGE', {
         room,
         userName, // передаем кто пишет сообщение
         text: messageValue, // тут формируем наше сообщенние
      })
      addMessage({ userName, text: messageValue }) // это для того чтобы самому можно было отправлять сообщение
      setMessageValue('')
   }

   //это пишем для того чтобы чат двигался вниз когда пишуться сообщения
   useEffect(() => {
      messagesRef.current.scrollTo(0, 99999)
   }, [messages])

   return (
      <div className='chat'>
         <div className='chat-users'>
            Комната: <b>№{room}</b>
            <hr />
            <b>Онлайн : ({users.length})</b>
            <ul>
               {users.map((name, index) => (
                  <li key={name + index}>{name}</li>
               ))}
            </ul>
         </div>
         <div className='chat-messages'>
            <div ref={messagesRef} className='messages'>
               {messages.map((message, index) => (
                  <div className='message' key={message + index}>
                     <p>{message.text}</p>
                     <div>
                        <span>{message.userName}</span>
                     </div>
                  </div>
               ))}
            </div>
            <form>
               <textarea
                  value={messageValue}
                  onChange={e => setMessageValue(e.target.value)}
                  className='form-control'
                  rows='3'
               ></textarea>
               <button
                  type='button'
                  className='btn btn-primary'
                  onClick={onSendMessage}
               >
                  Отправить
               </button>
            </form>
         </div>
      </div>
   )
}

export default Chat
