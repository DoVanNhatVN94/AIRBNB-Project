/** @format */

import {
  GET_DSPHONGTHUE_VITRI,
  ThongTinChiTietPhongType,
} from "../Types/PhongThueType";

const phongThueState = {
  dsPhongTheoViTri: [],
  chiTietPhong: {},
};

export const phongThueReducer = (state = phongThueState, action) => {
  switch (action.type) {
    case GET_DSPHONGTHUE_VITRI: {
      state.dsPhongTheoViTri = action.dsPhongTheoViTri;
      return { ...state };
    }
    //nhat
    case ThongTinChiTietPhongType:
      state.chiTietPhong = action.chiTietPhong;

      return { ...state };
    //nhat
    default: return { ...state }
    
  }
};
