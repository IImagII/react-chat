// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
   switch (action.type) {
      case 'IS_AUTH':
         return {
            ...state,
            isAuth: true,
            userName: action.payload.userName,
            room: action.payload.room,
         }
      case 'SET_USERS':
         return {
            ...state,
            users: action.payload,
         }
      case 'SET_DATA':
         return {
            ...state,
            users: action.payload.users,
            messages: action.payload.messages,
         }
      case 'NEW_MESSAGE':
         return {
            ...state,
            messages: [...state.messages, action.payload],
         }
      default:
         return state
   }
}
