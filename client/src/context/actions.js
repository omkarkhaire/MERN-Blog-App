export const Loginstart = (usercredientials) => ({
    type:"Login_start"
});
export const Loginsuccess = (user) => ({
  type: "Login_success",
  payload:user
});
export const Loginfailure = () => ({
  type: "Login_fail",
});
export const Logout = () => ({
  type: "Logout",
});
export const updatestart = (usercredientials) => ({
  type: "update_start"
});
export const updatesuccess = (user) => ({
  type: "update_success",
  payload: user,
});
export const updatefailure = () => ({
  type: "update_fail",
});
