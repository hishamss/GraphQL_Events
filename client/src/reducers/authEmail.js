const emailReducer = (state = "", action) => {
  switch (action.type) {
    case "setEmail":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default emailReducer;
