import io from 'socket.io-client'

// const socket = io.connect('http://localhost:3002')
const socket = io.connect('http://server-chat-production.up.railway.app')
export default socket
