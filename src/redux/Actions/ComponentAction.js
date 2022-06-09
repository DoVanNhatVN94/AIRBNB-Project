import { openComponent } from "../Types/Component"

export const add_component =(Component,id)=>{
    return dispatch =>{
        dispatch({
            type:openComponent,
            Component:Component,
            id:id
        })
    }
}