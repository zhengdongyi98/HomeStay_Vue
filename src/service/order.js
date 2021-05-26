import { get, post } from "../utils/http";
import qs from "qs";
import axios from "axios"; //引入qs


export const orderRoom = async (params) =>{
  return post(`/order/saveOrder`, params)
};


export const getOrderByCondition = async (params) =>{
  return post(`/order/getOrderByCondition`, params)
};

export const continueOrder = async (params) =>{
  return get(`/order/continueOrder?orderNo=${params}`)
};

export const createComment = async (params) =>{
  return post(`/order/createComment`, params)
};

export const overOrder = async (params) =>{
  return get(`/order/overOrder?orderNo=${params}`)
};
