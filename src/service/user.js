import { get, post } from "../utils/http";
import qs from "qs"; //引入qs

export const login = async (params) => {
  return post(`/user/userLogin`, qs.stringify(params));
};

export const register = async (params) => {
  return post(`/user/userRegister`, qs.stringify(params));
};

export const logout = async (params) => {
  return  get(`/user/logout`,qs.stringify(params))
}
