/** @format */

import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  ChiTietNguoiDungAction,
  LayDSNguoiDungAction,
} from "../../redux/Actions/NguoiDungAction";

const { Option } = Select;

function UpdateND(props) {
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("id");
  const { user, dsNguoiDung } = useSelector((state) => state.nguoiDungReducer);
  const { address, birthday, email, gender, phone, name } = user;
  const [turnOn, setTurnOn] = useState(true);

  useEffect(() => {
    dispatch(ChiTietNguoiDungAction(idUser));
    dispatch(LayDSNguoiDungAction());
  }, []);

  const listDSEmailND = dsNguoiDung.map((nd) => nd.email);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
      email: email,
      phone: phone,
      birthday: birthday,
      gender: gender,
      address: address,
      type: "CLIENT",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email khong duoc de trong")
        .email("Email ko đúng định dạng email")
        .notOneOf(listDSEmailND, "Email đã được sử dụng"),
      phone: Yup.string().required("Số điện thoai khong duoc de trong")
      .matches(/^[0-9]+$/,"Đây là trường số bạn ơi !")
      ,
      //matches : kiểm tra biểu thức

      name: Yup.string()
        .required("Họ Tên khong duoc de trong")
        .matches(
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
          "Tên chỉ có ký tự chữ hoy"
        ),
      address: Yup.string().required("Địa chỉ không được để trống"),
      birthday: Yup.string().required("Chưa Nhập Ngày Sinh"),

      gender: Yup.string().required("Chưa chọn giới tính"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeDatePicker = (value) => {
    
      console.log("value",value);
      let birthday = moment(value);
      formik.setFieldValue('birthday', birthday);
      console.log(formik.values.birthday);
   
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <div>
      <div className="UpdateND py-2">
        <button
          onClick={() => {
            setTurnOn(!turnOn);
          }}
          className={`${turnOn ? "" : "d-none"} custom-btn btn_updateInfor`}
        >
          Cập Nhập Thông tin
        </button>
      </div>
      <Form {...formItemLayout} onSubmitCapture={formik.handleSubmit}>
        <Form.Item label="E-mail">
          <Input
            disabled={turnOn}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </Form.Item>

        <Form.Item
          type="text"
          label="Tên Người dùng"
          tooltip="Tên Khai sinh của bạn "
        >
          <Input
            disabled={turnOn}
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <InputNumber
            disabled={turnOn}
            name="phone"
            style={{
              width: "100%",
            }}
            onChange={handleChangeSwitch("phone")}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <DatePicker
            disabled={turnOn}
            format={"YYYY/MM/DD"}
            name="birthday"
            onChange={handleChangeDatePicker}
            onBlur={formik.handleBlur}
            value={moment(formik.values.birthday)}
          />
          {formik.touched.birthday && formik.errors.birthday ? (
            <div className="alert alert-danger">{formik.errors.birthday}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Địa chỉ">
          <Input.TextArea
            disabled={turnOn}
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            showCount
            maxLength={150}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="alert alert-danger">{formik.errors.address}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Giới tính">
          <Select
            disabled={turnOn}
            name="gender"
            onChange={handleChangeSwitch('gender')}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
          >
            <Option value={true}>Boy</Option>
            <Option value={false}>Girl</Option>
          </Select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="alert alert-danger d-none">
              {formik.errors.gender}
            </div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <div className="w-100 text-center">
            <button
              disabled={turnOn}
              className="btn btn-outline-success w-25 py-3"
              type="submit"
            >
              Update
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
export const formUp = UpdateND;
