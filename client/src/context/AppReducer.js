export default (state, action) => {
  switch (action.type) {
    case "LOGIN_COMPUTER":
      return {
        ...state,
        data: action.payload,
        changeLoading: false,
      };
    case "LOGOUT_COMPUTER":
      return {
        ...state,
        data: action.payload,
        changeLoading: false,
      };

    case "DELETE_COMPUTER":
      return {
        ...state,
        data: action.payload,
        changeLoading: false,
      };

    case "CHANGE_FETCH":
      return {
        changeLoading: true,
      };

    default:
      return state;
  }
};
