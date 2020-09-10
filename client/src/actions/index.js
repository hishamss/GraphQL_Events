export const setToken = (token) => {
  return {
    type: "setToken",
    payload: token,
  };
};

export const logout = () => {
  return {
    type: "logout",
  };
};
