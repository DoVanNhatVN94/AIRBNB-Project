import { http } from "../util/settingAxios";

class QuanLyViTri {
    layDanhSachViTri = (keyWord) => {
        if(keyWord === ''){
            return http.get(`/api/locations`)
        }
        return http.get(`/api/locations?location=${keyWord}`)

    }
}
export const quanLyViTri = new QuanLyViTri()