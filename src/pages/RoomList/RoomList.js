import { history } from '../../App'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { layDSPhongThueTheoViTri } from '../../redux/Actions/PhongThueAction'
import { layDanhSachViTri } from '../../redux/Actions/ViTriActon'
import { Rate } from 'antd';
export default function RoomList(props) {
    const [state, setState] = useState({
        value: 3
    })
    const { dsPhongTheoViTri } = useSelector(state => state.phongThueReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        const { id } = props.match.params
        dispatch(layDSPhongThueTheoViTri(id))
    }, [])
    const handleChange = value => {
        setState({ value });
    };
    const renderRoomlist = () => {
        return dsPhongTheoViTri.map(phong => {
            return (
                <div className="col-lg-12 col-md-12" key={phong._id}>
                    <div className="listing-item-container list-layout" data-marker-id={1}>
                        <div onClick={() => { history.push(`/roomdetail/${phong._id}`) }} className="listing-item">
                            {/* Image */}
                            <div className="listing-item-image">
                                <img src={phong.image} />
                            </div>
                            {/* Content */}
                            <div className="listing-item-content">
                                {/* <div className="listing-badge now-open">Now Open</div> */}
                                <div className="listing-item-inner">
                                    <h3>{phong.name}</h3>
                                    <span>{phong.locationId.province}, {phong.locationId.country}</span>
                                    <p>{phong.price.toLocaleString()} VND / Ngày</p>
                                    <p> {phong.guests} khách , {phong.bedRoom} phòng ngủ, {phong.bath} phòng tắm</p>
                                    <p>
                                        {phong.wifi ? 'Wifi- ' : '-'}
                                        {phong.elevator ? 'Thang máy- ' : '-'}
                                        {phong.hotTub ? 'Bồn nước nóng- ' : '-'}
                                        {phong.pool ? 'Hồ bơi- ' : '-'}
                                        {phong.gym ? 'Phòng gym ' : '-'}
                                    </p>

                                    {phong.valueate}

                                </div>
                                <div className="listing-rate">

                                </div>
                                <span className="like-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <div>
                <div id="titlebar" className="gradient">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className='pb-5'>Chỗ ở tại khu vực bản đồ đã chọn</h2><span></span>
                                {/* Breadcrumbs */}
                                {/* <nav id="breadcrumbs">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li>Listings</li>
                                    </ul>
                                </nav> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Content
    ================================================== */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                {/* Listing Item */}
                                {renderRoomlist()}

                            </div>
                            {/* Pagination */}
                            <div className="clearfix" />
                            <div className="row">
                                <div className="col-md-12">
                                    {/* Pagination */}
                                    <div className="pagination-container margin-top-20 margin-bottom-40">
                                        <nav className="pagination">
                                            <ul>
                                                <li><a href="#" className="current-page">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#"><i className="sl sl-icon-arrow-right" /></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            {/* Pagination / End */}
                        </div>
                    </div></div></div>


        </>
    )
}
