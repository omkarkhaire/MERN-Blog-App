const Reducer = (state, action) => {
  switch (action.type) {
    case "Login_start":
      return { user: null, isfetching: true, error: false };

    case "Login_success":
      return { user: action.payload, isfetching: false, error: false };

    case "Login_fail":
      return { user: null, isfetching: false, error: true };
    case "update_start":
      return { ...state, isfetching: true };

    case "update_success":
      return { user: action.payload, isfetching: false, error: false };

    case "update_fail":
      return { user: state.user, isfetching: false, error: true };
    case "Logout":
      return { user: null, isfetching: false, error: false };
    default:
      return { ...state };
  }
};
export default Reducer;
