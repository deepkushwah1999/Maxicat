import { LOGIN } from "../actionTypes";

export const login = (user = { id: "id" }) => ({
  type: LOGIN,
  payload: user,
});
