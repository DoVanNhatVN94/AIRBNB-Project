/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { DatPhongAction, ThongTinChiTietPhongAction } from "../../../redux/Actions/PhongThueAction";
import { Affix, Image, Popconfirm } from "antd";

import "../../../asset/css/cart.css";
import moment from "moment";

export default function Cart(props) {
  const dispatch = useDispatch();
  const { chiTietPhong } = useSelector((state) => state.phongThueReducer);
  const { Component, id } = useSelector((state) => state.ComponentReducer);

  const roomId = localStorage.getItem("roomId");
  const token = localStorage.getItem("accessToken");
  const { item } = props;

  const [width, setWidth] = useState(window.innerWidth);
  const [checkIn, setCheckIn] = useState(localStorage.getItem("checkIn"));
  const [checkOut, setCheckOut] = useState(localStorage.getItem("checkOut"));

  const [exchange, setExchange] = useState(1);

  useEffect(() => {
    dispatch(ThongTinChiTietPhongAction(roomId));
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const countDate = () => {
    let count = 0;
    const endDay = new Date(checkOut);
    const startDay = new Date(checkIn);
    while (endDay > startDay) {
      count++;
      startDay.setDate(startDay.getDate() + 1);
    }
    return count;
  };

  const handleChange = (e) => {
    setExchange(e.target.value);
  };

  const confirm = () => {
    let ve = {
      roomId: roomId,
      checkIn: checkIn,
      checkOut: checkOut,
    };
    console.log(ve);
    // dispatch(DatPhongAction(ve))
  };

  return (
    <Fragment>
      <div className="cart">
        <div className="cart_head">
          {width >= 1024 ? (
            <Affix offsetTop={100}>
              <div className="cart_head_fit">
                <div className="row py-4">
                  <div className="col-5">
                    <Image
                      style={{
                        width: "200px",
                        maxHeight: "150px",
                        borderRadius: "10px",
                      }}
                      src={chiTietPhong?.image}
                    />
                  </div>
                  <div className="col-7">
                    <h6 className="text text-black py-1">
                      {chiTietPhong?.name}
                    </h6>
                    <p className="pb-1 text text-black-50">
                      {chiTietPhong?.description}
                    </p>
                  </div>
                </div>
                <div className="cart_certification py-4">
                  <p className="py-1">
                    ?????t ph??ng c???a b???n ???????c ch???p nh???n v?? b???o v??? t???{" "}
                    <span style={{ color: "red", fontWeight: 700 }}>air</span>
                    <span style={{ fontWeight: 700 }}>BnB</span>
                  </p>
                </div>
              </div>
            </Affix>
          ) : (
            <div className="cart_head_fit">
              <div className="row py-4">
                <div className="col-5">
                  <Image
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                      borderRadius: "10px",
                    }}
                    src={chiTietPhong?.image}
                  />
                </div>
                <div className="col-7">
                  <h6 className="text text-black py-2">{chiTietPhong?.name}</h6>
                  <p className="pb-2 text text-black-50">
                    {chiTietPhong?.description}
                  </p>
                </div>
              </div>
              <div className="cart_certification py-4">
                <p className="py-1">
                  ?????t ph??ng c???a b???n ???????c ch???p nh???n v?? b???o v??? t???{" "}
                  <span style={{ color: "red", fontWeight: 700 }}>air</span>
                  <span style={{ fontWeight: 700 }}>BnB</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="cart_celendar">
          <h5 className="text text-black py-2 ">
            Th???i gian cho chuy???n ??i c???a b???n
          </h5>
          <div className="d-flex justify-content-between py-4">
            <div>
              <h6>Ng??y ?????n : </h6>
              <h6 className="py-2">{moment(checkIn).format("DD/MM/YYYY")}</h6>
            </div>
            <a className="btn_setting  ">Ch???nh S???a</a>
          </div>
          <div className="d-flex justify-content-between py-2">
            <div>
              <h6>Ng??y ??i</h6>
              <h6 className="py-2">{moment(checkOut).format("DD/MM/YYYY")}</h6>
            </div>
            <a className="btn_setting  ">Ch???nh S???a</a>
          </div>
        </div>
        <div className="cart_detail">
          {width >= 1024 ? (
            <Affix offsetTop={400}>
              <div className="cart_detail_fit">
                <h5 className="text text-black py-2">Chi ti???t gi??</h5>
                <div className="d-flex justify-content-between py-2">
                  <h6>
                    ${chiTietPhong.price} x {countDate()}
                  </h6>
                  <span>${chiTietPhong.price * countDate()}</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <h6>Ph?? V??? Sinh</h6>
                  <span>${(chiTietPhong.price * countDate() * 2) / 100}</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <h6>Ph?? d???ch v???</h6>
                  <span>${(chiTietPhong.price * countDate() * 5) / 100}</span>
                </div>
                <div className="d-flex justify-content-between py-3">
                  <h5 className="pr-4">
                    T???ng Chi Ph?? l?? {exchange === 1 ? "" : "(Discount 50%)"} :{" "}
                  </h5>
                  <span className="text-danger">
                    $
                    {(chiTietPhong.price * countDate() +
                      (chiTietPhong.price * countDate() * 5) / 100 +
                      (chiTietPhong.price * countDate() * 2) / 100) *
                      exchange}
                  </span>
                </div>
                <div className="w-100 text-right py-2 ">
                  <a className="btn_setting  ">Th??ng tin th??m</a>
                </div>
              </div>
            </Affix>
          ) : (
            <div className="cart_detail_fit">
              <h5 className="text text-black py-2">Chi ti???t gi??</h5>
              <div className="d-flex justify-content-between py-2">
                <h6>
                  ${chiTietPhong.price} x {countDate()}
                </h6>
                <span>${chiTietPhong.price * countDate()}</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h6>Ph?? V??? Sinh</h6>
                <span>${(chiTietPhong.price * countDate() * 2) / 100}</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h6>Ph?? d???ch v???</h6>
                <span>${(chiTietPhong.price * countDate() * 5) / 100}</span>
              </div>
              <div className="d-flex justify-content-between py-3">
                <h5 className="pr-4">
                  T???ng Chi Ph?? l?? {exchange === 1 ? "" : "(Discount 50%)"} :{" "}
                </h5>
                <span className="text-danger">
                  $
                  {(chiTietPhong.price * countDate() +
                    (chiTietPhong.price * countDate() * 5) / 100 +
                    (chiTietPhong.price * countDate() * 2) / 100) *
                    exchange}
                </span>
              </div>
              <div className="w-100 text-right py-2 ">
                <a className="btn_setting  ">Th??ng tin th??m</a>
              </div>
            </div>
          )}
        </div>
        <div className="cart_payment">
          <h5 className="text text-black py-4">Ch???n c??ch thanh to??n</h5>
          <div>
            <div className="form-check py-2 ">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="payment1"
                // defaultValue="option1"
                value={1}
                defaultChecked
                onChange={handleChange}
              />
              <label className="form-check-label px-2" htmlFor="payment1">
                Tr??? To??n B??? Chi Ph??
              </label>
            </div>
            <div className="form-check py-2">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="payment2"
                // defaultValue="option2"
                value={50 / 100}
                onChange={handleChange}
              />
              <label className="form-check-label px-2" htmlFor="payment2">
                Tr??? tr?????c 50% chi ph??, ph???n c??n l???i tr??? sau
              </label>
              <div className="p-2">
                <a className="btn_setting ">Th??ng tin th??m</a>
                <p className="py-2">
                  B???n ph???i thanh to??n tr?????c 50% gi?? tr??? ph??ng thu??, ph???n c??n l???i
                  b???n c?? th??? tr??? sau khi nh???n ph??ng, nh??ng ??i k??m th??m ph??? ph??
                  t??? 2-5% gi?? tr??? c??n l???i c???a ph??ng thu??
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="empty "></div>
        {!token ? (
          <div className="cart_login_or_register">
            <h5 className="text text-black pt-4 text-center">
              ????ng nh???p ho???c ????ng k?? ????? ?????t ph??ng/ ?????t ch???
            </h5>
            <div className="cart_login_or_register_content">{item}</div>
          </div>
        ) : (
          <div className="cart_submit">
            <div className="d-flex justify-content-center py-3">
                <h5 className="pr-4">
                  T???ng Chi Ph?? l?? {exchange === 1 ? "" : "(Discount 50%)"} :{" "}
                </h5>
                <h5 className="text-danger">
                  $
                  {(chiTietPhong.price * countDate() +
                    (chiTietPhong.price * countDate() * 5) / 100 +
                    (chiTietPhong.price * countDate() * 2) / 100) *
                    exchange}
                </h5>
              </div>
            <h5 className="text text-success text-center py-2">
              B???n Mu???n Thanh To??n Ch???
            </h5>

            <div className="cart_sudmit_btn w-100 text-center py-4">
              <Popconfirm
                className="w-50"
                title={<div className="pb-2"><h5>B???n Ch???n Ch???n Ch???</h5></div>}
                okText={<p>V??ng</p>}
                cancelText='????? Khi Kh??c'
                onConfirm={confirm}
              >
                <button className="btn btn-success">V??ng</button>
              </Popconfirm>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
