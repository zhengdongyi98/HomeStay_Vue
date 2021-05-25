import { get, post } from "../utils/http";
import qs from "qs";
import axios from "axios"; //引入qs

export const getRoomById = async (params) => {
  return get(`/room/getRoomById?rId=${params}`);
};

export const addRoom = async (params) =>{
  return post(`/room/addRoom`, params)
};

export const uploadImage = async (params) =>{
  return post(`/room/uploadFile`, params,{"headers":{"Content-Type":"multipart/form-data"}});
};
export const getRoomByUId = async (params) =>{
  return get(`/room/getRoomByUId?uId=${params}`);
};
export const getRoomPages = async (params) =>{
  return get(`/room/getRoomPages?${params}`);
};

export const searchRooms = async (params) =>{
  return post(`/room/searchRooms`,params)
}





