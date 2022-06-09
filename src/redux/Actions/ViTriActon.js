import { quanLyViTri } from "../../services/ViTriServices"
import { GET_VITRI, layDanhSachViTri } from "../Types/ViTriType";

export const layDanhSachViTri_1 = (keyWord = '') => {
    return async (dispatch) => {
        try{
            let result = await quanLyViTri.layDanhSachViTri(keyWord)
            dispatch({
                type: GET_VITRI,
                danhSachViTri : result.data
            })
        }catch(err){
            console.log(err.response.data)
        }
    }
}



export const layDanhSachViTriAction = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyViTri.layDanhSachViTri();
            console.log(result)
            let action = {
                type: layDanhSachViTri,
                mangViTri: result.data
            }
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}
