import { layDSVeTheoPhongType,LayChiTietVeCuaNDType } from "../Types/VeType"

const VeState = {
  dsVeIdroom:[],
  dsVeTheoND:[]
}

export const VeReducer = (state = VeState, action) => {
  switch (action.type) {
    case layDSVeTheoPhongType:
    state.dsVeIdroom=[...action.dsVeIdroom]

    return {...state}

    case LayChiTietVeCuaNDType:
      let dsVeCapNhap = [...state.dsVeTheoND]
      dsVeCapNhap.push(action.ve)
      state.dsVeTheoND=[...dsVeCapNhap]
    return {...state}
  default:
    return {...state}
  }
}
