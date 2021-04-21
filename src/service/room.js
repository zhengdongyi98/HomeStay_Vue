import { get, post } from "../utils/http";
import qs from "qs"; //引入qs

export const getRoomById = async (params) => {
  return get(`/room/getRoomById?rId=${params}`);
};