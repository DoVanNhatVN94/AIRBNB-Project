/** @format */

import { quanLyDanhGia } from "../../services/DanhGiaServices";
import { DanhSachDanhGiaPhongType } from "../Types/DanhGiaType";

//nhat head
export const DSDanhGiaTheoPhongAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDanhGia.DSDanhGiaTheoPhong(id);
      if (result.status === 200) {
        console.log(result);
        console.log(result.data);
        dispatch({
          type: DanhSachDanhGiaPhongType,
          dsDanhGia: result.data,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const TaoDanhGiaTheoPhongAction = (idPhong, comment) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDanhGia.TaoDanhGiaTheoPhong(idPhong, comment);
      if (result.status === 200) {
        console.log(result);
        console.log(result.data);
        dispatch(DSDanhGiaTheoPhongAction(idPhong));
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const XoaDanhGiaAction = (idDanhGia, idPhong) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDanhGia.XoaDanhGiaTheoPhong(idDanhGia);
      if (result.status === 200) {
        console.log(result);
        console.log(result.data);
        dispatch(DSDanhGiaTheoPhongAction(idPhong));
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};
//nhat final
