const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "setToken":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default tokenReducer;
