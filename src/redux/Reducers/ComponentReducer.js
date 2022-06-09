import { openComponent } from "../Types/Component";

const component = {
    Component: <p>Default</p>,
    id: "",
  };
  
  export const ComponentReducer = (state = component, action) => {
    switch (action.type) {
      case openComponent:
        state.Component = action.Component;
        state.id = action.id;
  
        return { ...state };
  
      default:
        return { ...state };
    }
  };
  