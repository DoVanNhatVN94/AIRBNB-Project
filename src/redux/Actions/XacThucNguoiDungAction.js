/** @format */

import { message } from "antd";
import { history } from "../../App";
import { xacThucNguoiDung } from "../../services/XacThucNguoiDungService";

//nhat code
const success = (content) => {
  message.loading(`${content} in progress..`, 2.5).then(() =>
    message.success(`${content} Success`, 2.5, () => {
      const type = localStorage.getItem("type");
      if (type === "ADMIN") history.push("/admin");
      else history.goBack();
    })
  );
};
const errorS = (content) => {
  message.error(`${content} error! Please check all input value`, 3);
};

export const LoginAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await xacThucNguoiDung.Login(nd);

      if (result.status === 200) {
        console.log(result.data.message);
        console.log(result.data);
        console.log(result.data.user._id);
        console.log(result.data.user.type);
        await localStorage.setItem("accessToken", result.data.token);
        await localStorage.setItem("type", result.data.user.type);
        await localStorage.setItem("id", result.data.user._id);
        await success("SignIn");
        
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
      errorS("SignIn");
    }
  };
};
export const RegisterAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await xacThucNguoiDung.Register(nd);
      if (result.status === 200) {
        console.log(result.data);
        success("SignUp");
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
      errorS("SignUp");
    }
  };
};
//nhat
