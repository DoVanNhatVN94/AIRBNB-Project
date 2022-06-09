import { http } from "../util/settingAxios"


class QuanLyDanhGia {
    //nhat head
    DSDanhGiaTheoPhong=(id)=>{
        return http.get(`/api/reviews/byRoom?roomId=${id}`)
    }
    TaoDanhGiaTheoPhong=(idPhong,comment)=>{
        return http.post(`https://airbnb.cybersoft.edu.vn/api/reviews?roomId=${idPhong}`,comment)
    }
    XoaDanhGiaTheoPhong=(idDanhGia)=>{
        return http.delete(`/api/reviews/${idDanhGia}`)
    }
    //nhat final
}
export const quanLyDanhGia = new QuanLyDanhGia()