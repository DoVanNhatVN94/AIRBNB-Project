/** @format */

import { message } from "antd";
import { quanLyNguoiDung } from "../../services/NguoiDungServices";
import {
  ChiTieTNguoiDungType,
  LayDSNguoiDungType,
} from "../Types/NguoiDungType";
import { layDanhSachNguoiDung } from "../Types/NguoiDungType";

const success = (content) => {
  message.success(content,3);
};
const error = (content) => {
  message.error(content,5);
};

//nhat ***
export const LayDSNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDung.DSNguoiDung();
      if (result.status === 200) {
        console.log(result.data);
        dispatch({
          type: LayDSNguoiDungType,
          dsNguoiDung: result.data,
        });
        success('Lấy danh sách người dùng thành công !')
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
      error(!error.response?.data?"error.response?.data":"Error !")
    }
  };
};

export const ChiTietNguoiDungAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDung.ChiTietNguoiDung(id);
      if (result.status === 200) {
        dispatch({
          type: ChiTieTNguoiDungType,
          user: result.data,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};
export const UploadAvaraNDAction = (formData, id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDung.UploadAvaraND(formData);
      if (result.status === 200) {
        console.log("success", result.data);
        dispatch({
          type: ChiTieTNguoiDungType,
          user: result.data,
        });
        success('Upload avatar thành công !')
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
      error(!error.response?.data?error.response?.data:"Upload avatar không thành công !")
    }
  };
};
//*** nhat

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDung.layDanhSachNguoiDung();
      let action = {
        type: layDanhSachNguoiDung,
        mangNguoiDung: result.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
