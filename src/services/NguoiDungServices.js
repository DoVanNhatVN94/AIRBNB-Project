/** @format */

import { http } from "../util/settingAxios";

class QuanLyNguoiDung {
  //Nhat***
  DSNguoiDung = () => {
    return http.get(`/api/users/pagination`);
  };
  ChiTietNguoiDung = (id) => {
    return http.get(`/api/users/${id}`);
  };
  UploadAvaraND = (formData) => {
    return http.post('/api/users/upload-avatar', formData);
  };
  //***Nhat

  layDanhSachNguoiDung = () => {
    return http.get(`/api/users`);
  };
}
export const quanLyNguoiDung = new QuanLyNguoiDung();
