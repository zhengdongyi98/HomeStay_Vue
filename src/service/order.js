import { get, post } from "../utils/http";
import qs from "qs";
import axios from "axios"; //引入qs


export const orderRoom = async (params) =>{
  return post(`/order/saveOrder`, params)
};
