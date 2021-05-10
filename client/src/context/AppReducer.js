export default (state, action) => {
  switch (action.type) {
    case 'DELETE_WEBSITE':
      return {
        ...state,
        websites: state.websites.filter(
          (website) => website.id !== action.payload
        ),
      };
    case 'ADD_WEBSITE':
      return {
        ...state,
        websites: [...state.websites, action.payload],
      };
    case 'ADD_TIMER':
      return {
        ...state,
        running: true,
        timer: [...state.timer, action.payload],
      };
    case 'STOP_TIMER':
      return {
        ...state,
        running: false,
        timer: state.timer.filter((time) => time._id !== action.payload),
      };
    case 'UNBLOCK':
      return {
        ...state,
        running: false
      };
    case 'SET_WORK':
      return {
        ...state,
        work: true,
        running: false
      };
    case 'SET_BREAK':
      return {
        ...state,
        work: false,
        running: false
      };
    case 'STOP_RUNNING':
      return {
        ...state,
        running: false,
      };
    case 'TIMER_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
