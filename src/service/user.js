import { get, post } from "../utils/http";
import qs from 'qs'      //引入qs

const baseUrl = "http://localhost/homestay";
// const baseUrl = "http://47.98.226.145/homestay";

export const login = async (params) => {
  return post(`${baseUrl}/user/userLogin`, qs.stringify(params));
};

export const register = async (params) => {
  post(`${baseUrl}/user/userRegister`, qs.stringify(params));
};
