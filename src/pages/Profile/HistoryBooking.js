/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayChiTietVeCuaNDAction } from "../../redux/Actions/VeAction";
import { Card, Image } from "antd";
import moment from "moment";
const { Meta } = Card;

function HistoryBooking() {
  const { user } = useSelector((state) => state.nguoiDungReducer);
  const { dsVeTheoND } = useSelector((state) => state.VeReducer);
  const [more, setMore] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const layDSVeNguoiDung = (user) => {
    return user.tickets?.map((ve) => dispatch(LayChiTietVeCuaNDAction(ve)));
  };
  useEffect(() => {
    layDSVeNguoiDung(user);

    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [user]);

  useEffect(() => {
    if (width <= 1024) setMore(6);
    else setMore(8);
  }, [width]);

  const rederDanhSachVe = () => {
    return dsVeTheoND?.slice(0, more).map((ve, index) => {
      return (
        <div key={index} className="historyBooking_content_item">
          <Card cover={<Image alt={ve?.roomId.name} src={ve?.roomId.image} />}>
            <Meta
              title={ve?.roomId.name}
              style={{ textAlign: "center" }}
              // description={dsVeTheoND[0]?.roomId.description}
            />
            <div className="">
              <div className="d-flex justify-content-between py-1">
                <span>Ngày Đến: </span>{" "}
                <span>{moment(ve?.checkIn).format("DD/MM/YYYY")}</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span>Ngày Đi: </span>{" "}
                <span>{moment(ve?.checkOut).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          </Card>
        </div>
      );
    });
  };

  return (
    <div className="HistoryBooking">
      <div className="historyBooking_head text-center py-4">
        <h4>Danh sách vé bạn đặt</h4>
      </div>
      <div className="historyBooking_content">{rederDanhSachVe()}</div>
      {more < dsVeTheoND.length ? (
        <div className="w-100 text-center p-3">
          <button
            onClick={() => {
              setMore(more + more);
            }}
            className="custom-btn btn_addBook"
          >
            Hiển Thị Thêm Đánh Giá
          </button>
        </div>
      ) : more > dsVeTheoND.length&&dsVeTheoND.length >8 ? (
        <div className="w-100 text-center p-3">
          <button
            onClick={() => {
              if (width <= 1024) setMore(6);
              else setMore(8);
            }}
            className="custom-btn btn_addBook"
          >
            Ẩn Bớt Đánh Giá
          </button>
        </div>
      ):""}
    </div>
  );
}
export const Booking = HistoryBooking;
