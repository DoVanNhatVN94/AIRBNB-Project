import { http } from "../util/settingAxios";

class QuanLyPhongChoThue {
  layDSPhongThueTheoViTri = (idViTri) => {
    return http.get(`/api/rooms?locationId=${idViTri}`)
  }
  ThongTinChiTietPhong = (id) => {
    return http.get(`/api/rooms/${id}`);
  };
  DatVe = (ve) => {
    return http.post(`/api/rooms/booking`, ve)

  }
}
export const quanLyPhongChoThue = new QuanLyPhongChoThue();
