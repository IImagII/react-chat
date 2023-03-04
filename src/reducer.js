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
      case 'NEW_MESSAGE':
         return {
            ...state,
            messages: [...state.messages, action.payload],
         }
      default:
         return state
   }
}
