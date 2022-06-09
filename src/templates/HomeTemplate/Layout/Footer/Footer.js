import React from 'react'
import './footer.css'
import logo from '../../../../assets/images/logo.png'
export default function Footer() {
    return (
        <>
            <div id="footer">
                {/* Main */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-6">
                            <img className="footer-logo" src={logo}  />
                            <br /><br />
                            <p>Là một thị trường cộng đồng cho việc đặt và cho thuê phòng, căn hộ, có trụ sở tại Silicon Valley, California được thành lập trong năm 2008, tương tự như một hệ thống đặt hàng trực tuyến</p>
                        </div>
                        <div className="col-md-4 col-sm-6 ">
                            <h4>Helpful Links</h4>
                            <ul className="footer-links">
                                <li><a href="#">Đăng nhập</a></li>
                                <li><a href="#">Đăng kí</a></li>
                                <li><a href="#">Tài khoản</a></li>
                                <li><a href="#">Địa điểm</a></li>
                                <li><a href="#">Định giá</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                            </ul>
                            <ul className="footer-links">
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Cộng sự</a></li>
                                <li><a href="#">How It Works</a></li>
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                            <div className="clearfix" />
                        </div>
                        <div className="col-md-3  col-sm-12">
                            <h4>Liên hệ với chúng tôi</h4>
                            <div className="text-widget">
                                <span>12345 Little Lonsdale St, Melbourne</span> <br />
                                Phone: <span>(123) 123-456 </span><br />
                                E-Mail:<span> <a href="#">office@example.com</a> </span><br />
                            </div>
                            <ul className="social-icons margin-top-20">
                                <li><a className="facebook" href="#"><i className="icon-facebook" /></a></li>
                                <li><a className="twitter" href="#"><i className="icon-twitter" /></a></li>
                                <li><a className="gplus" href="#"><i className="icon-gplus" /></a></li>
                                <li><a className="vimeo" href="#"><i className="icon-vimeo" /></a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyrights">© 2021 Listeo. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Back To Top Button */}
            <div id="backtotop"><a href="#" /></div>
        </>

    )
}
