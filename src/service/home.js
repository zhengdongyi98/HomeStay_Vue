import { get, post } from "../utils/http";
import qs from "qs"; //引入qs

export const getAllRooms = async (params) => {
  return get(`/room/getAllRooms`, qs.stringify(params));
};

// export const register = async (params) => {
//   post(`/user/userRegister`, qs.stringify(params));
// };
