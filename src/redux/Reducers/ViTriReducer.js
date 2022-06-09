import { GET_VITRI, layDanhSachViTri } from "../Types/ViTriType"

const viTriState = {
  danhSachViTri: [],
  danhSachViTriSearch : [],
  mangViTri: [
    { id: 1, name: 'Đà Nẵng' },
    { id: 2, name: 'Đà lạt' }
  ],
}

export const viTriReducer = (state = viTriState, action) => {
  switch (action.type) {
    case GET_VITRI: {
      state.danhSachViTri = action.danhSachViTri;
      state.danhSachViTriSearch = action.danhSachViTri;
      return { ...state }
    }
    case layDanhSachViTri:
      state.mangViTri = action.mangViTri
      return { ...state }
    default:
      return state


  }
}
