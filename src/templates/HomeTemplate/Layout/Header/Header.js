import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../../assets/images/logo.png'
import './header.css'
import { Acces_stoken } from '../../../../util/setting'
import { history } from '../../../../App'
import { ChiTietNguoiDungAction } from '../../../../redux/Actions/NguoiDungAction'
export default function Header() {
    const { user } = useSelector(state => state.nguoiDungReducer);
    const dispatch = useDispatch();
    const userID = localStorage.getItem('id')
    useEffect(() => {
        dispatch(ChiTietNguoiDungAction(userID))
    }, [])
    const renderUserLogin = () => {
        if (localStorage.getItem('accessToken')) {
            return (
                <div className="dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" >
                        <img style={{ width: 35, height: 35, objectfit: 'cover', borderRadius: '50%', margin: '0 10px' }} src={user.avatar} />
                        <span className="text-dark">
                            {user.name}
                        </span>
                    </a>
                    <div className="dropdown-menu" style={{ left: '20px' }}>
                        <button style={{ fontSize: '15px' }} className="dropdown-item" onClick={() => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('comment');
                            localStorage.removeItem('type');
                            localStorage.removeItem('id');
                            window.location.reload();
                            window.location.pathname = ('/home')
                        }}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )

        } else {
            return (
                <>
                    <div className="header__login">
                        <NavLink to="/login">
                            <i className="fa-solid fa-arrow-right-to-bracket" />
                            Đăng nhập
                        </NavLink>
                    </div>
                    <div className="header__register">
                        <NavLink to="/register">
                            <i className="fa-solid fa-pen-to-square"></i>
                            Đăng ký
                        </NavLink>

                    </div>
                </>
            )
        }
    }
    return (
        <div className="header py-3">
            <div className="container">
                <nav className="navbar navbar-expand-lg ">
                    <NavLink className="navbar-brand" to="/home">
                        <img className="w-75" src={logo} alt="" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i style={{ fontSize: '20px' }} className="fa fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto header__list">
                            <li className="nav-item active header__item">
                                <a className="nav-link" href="#">Trang chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên hệ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => { history.push('/profile') }}>Thông tin</a>
                            </li>
                        </ul>
                        <div className="header__right">
                            {renderUserLogin()}
                        </div>
                    </div>

                </nav>

            </div>
        </div>

    )
}
