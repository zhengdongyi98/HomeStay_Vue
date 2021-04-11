import { get, post } from "../utils/http";

const baseUrl = "http://47.98.226.145/homestay";

export const login = async (params) => {
  return post(`${baseUrl}/login`, params);
};

export const register = async (params) => {
  post(`${baseUrl}/userRegister`, params);
};
