/** @format */

import React, { createElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "./Map";

import {
  Affix,
  Avatar,
  Button,
  Comment,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Progress,
  Select,
  Tooltip,
} from "antd";
import Icon, {
  CalendarOutlined,
  HeartOutlined,
  HomeOutlined,
  SafetyOutlined,
  ShareAltOutlined,
  StarOutlined,
  TrophyOutlined,
  WifiOutlined,
  LikeFilled,
  DislikeFilled,
  LikeOutlined,
  DislikeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  TvOutlined,
  AcUnit,
  Hvac,
  Elevator,
  Restaurant,
} from "@mui/icons-material";

import {
  DSDanhGiaTheoPhongAction,
  TaoDanhGiaTheoPhongAction,
  XoaDanhGiaAction,
} from "../../redux/Actions/DanhGiaAction";
import {
  DatPhongAction,
  ThongTinChiTietPhongAction,
} from "../../redux/Actions/PhongThueAction";
import { ChiTietNguoiDungAction } from "../../redux/Actions/NguoiDungAction";
import { layDSVeTheoPhongAction } from "../../redux/Actions/VeAction";
import { add_component } from "../../redux/Actions/ComponentAction";

import Login from "../Login/Login";

import moment from "moment";

import "../../asset/css/roomdetail.css";
import { history } from "../../App";

export default function RoomDetail(props) {
  const dispatch = useDispatch();
  const { dsDanhGia } = useSelector((state) => state.danhGiaReducer);
  const { chiTietPhong } = useSelector((state) => state.phongThueReducer);
  const { locationId } = chiTietPhong;

  const idUser = localStorage.getItem("id");
  const { user } = useSelector((state) => state.nguoiDungReducer);

  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  let countDate = 0;

  const key = "AIzaSyA3HUkpN5-tSw68taF-syOrFnDp2rhDKZY"; //map

  const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [more, setMore] = useState(6);
  const [add, setAdd] = useState(6);
  const [container, setContainer] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(ThongTinChiTietPhongAction(props.match.params.id));
      dispatch(DSDanhGiaTheoPhongAction(props.match.params.id));
      dispatch(layDSVeTheoPhongAction(props.match.params.id));
    }

    if (idUser) dispatch(ChiTietNguoiDungAction(idUser));

    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      // setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(
        e.target.documentElement.scrollTop > 830 &&
          e.target.documentElement.scrollTop < 1125
      );
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  //comment
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const renderDanhGia = (more) => {
    return dsDanhGia?.slice(0, more).map((danhGia, index) => {
      const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {createElement(
              action === "disliked" ? DislikeFilled : DislikeOutlined
            )}
            <span className="comment-action">{dislikes}</span>
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,

        <Tooltip key="delete-comment" title="Delete">
          {idUser === danhGia?.userId?._id ? (
            <span
              onClick={() => {
                dispatch(XoaDanhGiaAction(danhGia?._id, props.match.params.id));
              }}
              className="DeleteOutlined"
            >
              <DeleteOutlined />
            </span>
          ) : (
            ""
          )}
        </Tooltip>,
      ];
      return (
        <Comment
          className={width < 768 ? "col-12" : "col-6"}
          key={index}
          actions={actions}
          author={<a>{danhGia.userId?.name}</a>}
          avatar={
            <Avatar
              src={<Image src={danhGia.userId?.avatar} />}
              alt={danhGia.userId?.name}
            />
          }
          content={<p>{danhGia.content}</p>}
          datetime={
            <Tooltip
              title={moment(danhGia.created_at).format("YYYY-MM-DD HH:mm:ss")}
            >
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      );
    });
  };

  //user comment

  const [submitting, setSubmitting] = useState(false);
  let [valueComment, setValueComment] = useState("");

  const { TextArea } = Input;

  const handleSubmit = () => {
    if (!valueComment) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      dispatch(
        TaoDanhGiaTheoPhongAction(props.match.params.id, {
          content: valueComment,
        })
      );
    }, 1125);
  };

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };
  //Form setting

  const disableDate = (current) => {
    if (!dates || dates.length === 0) {
      return current && current < moment().endOf("day");
    }
    //S??? ng??y ??at it nhat 3 ngay
    const tooLate = dates[0] && current.diff(dates[0], "days") < 3;
    const tooEarly =
      (current && current < moment().endOf("day")) ||
      (dates[1] && dates[1].diff(current, "days") < 3);
    return tooEarly || tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  const renderTienNghi = (add) => {
    const tienNghi = [];
    if (chiTietPhong.kitchen)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={1}>
          <i className="m-2">
            <Restaurant />
          </i>{" "}
          <p>B???p</p>
        </div>
      );
    if (chiTietPhong.cableTV)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={2}>
          <i className="m-2">
            <TvOutlined />
          </i>{" "}
          <p>TV v???i truy???n h??nh c??p ti??u chu???n</p>
        </div>
      );

    if (chiTietPhong.heating)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={3}>
          <i className="m-2">
            <AcUnit />
          </i>{" "}
          <p>??i???u H??a Nhi???t ?????</p>
        </div>
      );
    if (chiTietPhong.indoorFireplace)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={4}>
          <i className="m-2">
            <Hvac />
          </i>{" "}
          <p>L?? S?????i trong nh??</p>
        </div>
      );

    if (chiTietPhong.wifi)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={5}>
          <i className="m-2">
            <WifiOutlined />
          </i>{" "}
          <p>Wifi</p>
        </div>
      );
    if (chiTietPhong.elevator)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={6}>
          <i className="m-2">
            <Elevator />
          </i>{" "}
          <p>Thang m??y</p>
        </div>
      );
    if (chiTietPhong.pool)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={7}>
          <i className="fa fa-swimming-pool m-2"></i> <p>B??? b??i s???ch ?????p</p>
        </div>
      );
    if (chiTietPhong.hotTub)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={8}>
          <i className="fa fa-hot-tub m-2"></i>{" "}
          <p>C?? b???n n?????c n??ng ????? th?? gi???n</p>
        </div>
      );
    if (chiTietPhong.dryer)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={9}>
          <i className="fa fa-wind m-2"></i> <p>C?? m??y s???y ????? l??m kh?? t??c</p>
        </div>
      );
    if (chiTietPhong.gym)
      tienNghi.push(
        <div className="col-6 d-flex py-2" key={10}>
          <i className="fa fa-dumbbell m-2"></i>{" "}
          <p>C?? ph??ng t???p ho???c khu t???p gym</p>
        </div>
      );

    return tienNghi.slice(0, add);
  };

  const renderReducer = () => {
    if (value?.length === 0 || !value)
      return (
        <h5 className="w-100 text-danger text-center py-2">
          Vui l??ng th???c hi???n h???t thao t??c ?????t ph??ng
        </h5>
      );
    else {
      const endDay = new Date(value[1]);
      const startDay = new Date(value[0]);
      while (endDay > startDay) {
        countDate++;
        startDay.setDate(startDay.getDate() + 1);
      }

      return (
        <div className="col-12 text-center py-2">
          <div className="d-flex justify-content-between">
            <p>
              {chiTietPhong.price} x {countDate} ????m
            </p>{" "}
            <span>${chiTietPhong.price * countDate}</span>
          </div>
          <div className="d-flex justify-content-between  py-3 border-bottom">
            <p>Ph?? d???ch v???</p>{" "}
            <span>${(chiTietPhong.price * countDate) / 20}</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <p>T???ng</p>{" "}
            <span>${(chiTietPhong.price * countDate * 105) / 100}</span>
          </div>
        </div>
      );
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const warning = () => {
    message.warning(
      <p className="text text-danger py-2">
        B???n Ch??a Thi???t L???p Ng??y ??i V?? ?????n
      </p>,
      5
    );
  };

  return (
    <div className={width >= 1024 ? `container roomDetail` : " roomDetail"}>
      <div className="roomDetail_head">
        <div className="roomDetail_head_tittle pb-3">
          <h2>{chiTietPhong.name}</h2>
          <div
            className={`${
              width <= 1024 ? "" : "d-flex"
            } justify-content-between`}
          >
            <div>
              <div className={`${width <= 768 ? "" : "d-flex"}`}>
                <h5
                  onClick={showModal}
                  className="cursor h_located text-decoration-text-decoration-underline py-3 "
                >
                  {" "}
                  {locationId?.name}, {locationId?.province},{" "}
                  {locationId?.country}
                </h5>
              </div>
            </div>

            <div className="d-flex">
              <button
                className="btn_head m-1"
                style={{ borderRadius: "50%", height: "30px", width: "30px" }}
              >
                <i className="d-flex align-items-center justify-content-center">
                  <ShareAltOutlined />
                </i>
              </button>
              <button
                className="btn_head m-1"
                style={{ borderRadius: "50%", height: "30px", width: "30px" }}
              >
                <i className="d-flex align-items-center justify-content-center">
                  <HeartOutlined />
                </i>
              </button>
            </div>
          </div>
        </div>
        <div className="roomDetail_head_photos">
          <Image
            src={chiTietPhong?.image}
            className={`img-fluid roomDetail_head_photos_image`}
            alt="photos"
          />
        </div>
      </div>

      <div className="roomDetail_book row">
        <div className={width <= 1024 ? "col-12" : "col-6"}>
          <div className="roomDetail_book_detail">
            <div className="roomDetail_book_detail_head py-3 border-top">
              <h5 className="h_located cursor py-1" onClick={showModal}>
                Ch??? ??? ?????p V?? Ti???n Nghi T???i {locationId?.name},{" "}
                {locationId?.province}, {locationId?.country}
              </h5>
              <p className="text-secondary pt-3">
                {chiTietPhong.guests ? `${chiTietPhong.guests} kh??ch` : ""}{" "}
                {chiTietPhong.bedRoom
                  ? `${chiTietPhong.bedRoom} ph??ng ng???`
                  : ""}{" "}
                {chiTietPhong.bath ? `${chiTietPhong.bath} ph??ng t???m` : ""}
              </p>
            </div>
            <div className="roomDetail_book_detail_mid py-4 border-top border-bottom">
              <div className="d-flex py-2">
                <i className="m-2">
                  <HomeOutlined />
                </i>
                <div>
                  <h6>To??n B??? Nh??</h6>
                  <span>B???n s??? c?? chung c?? cao c???p cho ri??ng m??nh</span>
                </div>
              </div>
              <div className="d-flex py-2">
                <i className="m-2">
                  <SafetyOutlined />
                </i>
                <div>
                  <h6>V??? Sinh T??ng C?????ng</h6>
                  <span>Cam k??t vs s???ch</span>
                </div>
              </div>
              <div className="d-flex py-2">
                <i className="m-2">
                  <TrophyOutlined />
                </i>
                <div>
                  <h6>Phong L?? Ch??? Nh?? Siu c???p</h6>
                  <span>B???n s??? c?? chung c?? cao c???p cho ri??ng m??nh</span>
                </div>
              </div>
              <div className="d-flex py-2">
                <i className="m-2">
                  <CalendarOutlined />
                </i>
                <div>
                  <h6>Mi???n Ph?? H???y Trong 48 Gi???</h6>
                  <span>C?? th??? h???y ????n n???u kh??ng v???a ?? trong 2 ng??y</span>
                </div>
              </div>
            </div>
            <div className="roomDetail_book_detail_bot py-4">
              {chiTietPhong.description}
            </div>
            <div className="roomDetail_book_detail_last py-4 border-top border-bottom">
              <h5 className="mb-2">Ti???n Nghi</h5>
              <div className="row">
                {renderTienNghi(add)}
                <div className="col-12 text-center p-2">
                  {add < 7 ? (
                    <button
                      onClick={() => {
                        setAdd(10);
                      }}
                      className="custom-btn btn_Add"
                    >
                      Hi???n Th??? T???t C??? Ti???n ??ch
                    </button>
                  ) : add > 6 ? (
                    <button
                      onClick={() => {
                        setAdd(6);
                      }}
                      className="custom-btn btn_Add"
                    >
                      ???n B???t Ti???n ??ch
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={width <= 1024 ? "col-12" : "col-6"}>
          <div className={"roomDetail_book_booking bg-white py-4"}>
            <div
              className={
                scrolling ? `fixed` : scrollTop > 1125 ? "absolute" : ""
              }
            >
              <Form
                className="m-auto form_book"
                layout="vertical"
                size={
                  width <= 400 ? "small" : width <= 800 ? "default" : "large"
                }
              >
                {width >= 1024 ? (
                  <div className=" d-flex justify-content-between">
                    <span>
                      <span>${chiTietPhong.price}</span> / ????m
                    </span>
                    {locationId ? (
                      <div className="d-flex">
                        <StarOutlined style={{ color: "pink" }} />{" "}
                        <span style={{ color: "black" }}>
                          {locationId?.valueate}{" "}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div className="row">
                  <div className="col-12">
                    <Form.Item>
                      <h5 className="w-100 text-center p-3">
                        Ng??y ?????n V?? Ng??y ??i
                      </h5>
                      <RangePicker
                        className="w-100 text-center p2"
                        value={hackValue || value}
                        format="YYYY-MM-DD"
                        disabledDate={disableDate}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={(val) => setValue(val)}
                        onOpenChange={onOpenChange}
                      />
                      {/* <RangePicker
                    format="YYYY-MM-DD"
                    disabledDate={disableDateRanges({
                      endDate: checkOut,
                      startDate: checkIn,
                    })}
                  /> */}
                    </Form.Item>
                    <Form.Item label="B???n ??i Bao Nhi??u Ng?????i">
                      <Select
                        onChange={(a) => {}}
                        defaultValue={{ value: "1" }}
                      >
                        <Select.Option value="1">1 Ng?????i</Select.Option>
                        <Select.Option value="2">2 Ng?????i</Select.Option>
                        <Select.Option value="3">3 Ng?????i</Select.Option>
                        <Select.Option value="4">4 Ng?????i</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-12 text-center  py-2">
                    <Button
                      onClick={() => {
                        if (value?.length === 2) {
                          localStorage.setItem("roomId", props.match.params.id);
                          localStorage.setItem(
                            "checkIn",
                            moment(value[0]).format()
                          );
                          localStorage.setItem(
                            "checkOut",
                            moment(value[1]).format()
                          );

                          
                          // dispatch(add_component(<Login />, "Login"));
                          history.push(`/cart/login`);
                        } else warning();
                      }}
                      className=" btn_submit"
                    >
                      Submit
                    </Button>
                  </div>
                  {renderReducer()}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="roomdetail_map ">
        <h5 className="px-5 py-4">V??? Tr?? C???a B???n L??</h5>
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                height: `90vh`,
                margin: `auto`,
                border: "2px solid black",
              }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div className="roomDetail_reviews py-4">
        <div className="roomDetail_reviews_rank" id="rank">
          <div className="d-flex">
            <Icon style={{ color: "hotpink" }} component={HeartOutlined} />{" "}
            <h5 className="py-3">
              {dsDanhGia.length === 0
                ? "Hi???n T???i Ch??a C?? ????nh Gi??"
                : `C?? ${dsDanhGia.length} ????nh gi??`}
            </h5>
          </div>
          <div className="row py-2">
            <div className={width < 768 ? "col-12" : "col-6"}>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">M???c ????? S???ch S???</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">Li??n L???c</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">Nh???n Ph??ng</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
            </div>
            <div className={width < 768 ? "col-12" : "col-6"}>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">M???c ????? Ch??nh X??c</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">V??? Tr??</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className="w-50 p-1">Gi?? Tr???</span>
                <Progress
                  className="w-50"
                  strokeColor={{
                    from: "#E233FF",
                    to: "#FF6B00",
                  }}
                  percent={`${locationId ? locationId.valueate : 10}0`}
                  status="active"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="roomDetail_reviews_comment py-4" id="comment">
          <div className="roomDetail_reviews_user_comment">
            <Comment
              avatar={<Avatar src={user.avatar} alt={user.name} />}
              content={
                <>
                  <Form.Item>
                    <TextArea
                      disabled={!idUser ? true : false}
                      showCount
                      placeholder={
                        !idUser
                          ? "Khi b???n ????ng nh???p th??nh c??ng m???i ???????c ????nh gi?? ph??ng n??y !"
                          : "Xin cho bi???t c???m ngh?? c???a b???n v??? ph??ng n??y"
                      }
                      maxLength={100}
                      rows={4}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={value}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={!idUser ? true : false}
                      loading={submitting}
                      onClick={handleSubmit}
                      type="primary"
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                </>
              }
            />
          </div>
          <div className="row">
            {dsDanhGia?.length !== 0 ? (
              renderDanhGia(more)
            ) : (
              <span className="col-12 py-3 text-center text-success">
                Hi???n T???i Ch??a C?? ????nh Gi??
              </span>
            )}
          </div>
          {dsDanhGia?.length !== 0 && dsDanhGia.length > more ? (
            <div className="w-100 text-center p-2">
              <button
                onClick={() => {
                  setMore(more + 6);
                }}
                className="custom-btn btn_Add"
              >
                Hi???n Th??? Th??m ????nh Gi??
              </button>
            </div>
          ) : dsDanhGia?.length < more && dsDanhGia?.length > 6 ? (
            <div className="w-100 text-center p-2">
              <button
                onClick={() => {
                  setMore(6);
                }}
                className="custom-btn btn_Add"
              >
                ???n B???t ????nh Gi??
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        title={`${locationId?.name}, ${locationId?.province}, ${locationId?.country}`}
        width="80%"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Wellcome"
        cancelText={<i className="fab fa-angellist"></i>}
      >
        <Image
          src={locationId?.image}
          className={`img-fluid`}
          style={{ height: "100%", width: "100vw" }}
          alt="photos vitri"
        />
      </Modal>
    </div>
  );
}
