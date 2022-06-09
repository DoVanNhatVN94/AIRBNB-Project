import { http } from "../util/settingAxios"


class QuanLyDatVe {
    //nHAT **
    layDSVeTheoPhong=(idRoom)=>{
        return http.get(`/api/tickets/by-room?roomId=${idRoom}`)
    }
    layChiTietVe=(idVe)=>{
        return http.get(`https://airbnb.cybersoft.edu.vn/api/tickets/${idVe}`)
    }
    // ** nHAT  

}
export const quanLyDatVe = new QuanLyDatVe()