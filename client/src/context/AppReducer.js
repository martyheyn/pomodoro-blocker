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
    default:
      return state;
  }
};
