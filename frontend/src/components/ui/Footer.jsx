import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-100 border-t mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
      {/* Hệ thống cửa hàng - Phần bấm được là "Xem bản đồ" */}
      <div>
        <h4 className="font-semibold text-yellow-600 mb-4">📍 HỆ THỐNG CỬA HÀNG</h4>
        <div className="text-sm text-gray-700 space-y-4">
          <div>
            <strong>Hà Nội</strong>
            <p>120 Thái Hà, Q. Đống Đa | <a href="https://www.google.com/maps/place/MobileCity+Th%C3%A1i+H%C3%A0/@21.0119347,105.8188591,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab7dbc584289:0x67ad89a2aa290186!8m2!3d21.0119347!4d105.821434!16s%2Fg%2F11b63rj_6q?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
          <div>
            <p>398 Cầu Giấy, Q. Cầu Giấy | <a href="https://www.google.com/maps/place/S%E1%BB%ADa+%C4%91i%E1%BB%87n+tho%E1%BA%A1i+iPhone+C%E1%BA%A7u+Gi%E1%BA%A5y+(MobileCity+Care)/@21.036368,105.7880147,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab49d66d6f0d:0x8706a412aad866b3!8m2!3d21.036368!4d105.7905896!16s%2Fg%2F11css0qc9r?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
          <div>
            <p>42 Phố Vọng, Hai Bà Trưng | <a href="https://www.google.com/maps/place/42+P.+V%E1%BB%8Dng,+Ph%C6%B0%C6%A1ng+%C4%90%C3%ACnh,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i+100000,+Vi%E1%BB%87t+Nam/@20.9991754,105.8391721,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ac706465cef3:0xc9ba89873239e694!8m2!3d20.9991754!4d105.841747!16s%2Fg%2F11hkpn11rf?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
          <div>
            <p>300 Đ. Nguyễn Trãi, Thanh Xuân, Hà Nội | <a href="https://www.google.com/maps/place/cellphone+S/@20.986139,105.7878504,16z/data=!4m6!3m5!1s0x3135ad05eb2ddcff:0x340eff9708bb25dd!8m2!3d20.9970579!4d105.8108377!16s%2Fg%2F11fmrpp2tx?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
          <div>
            <strong>Hồ Chí Minh</strong>
            <p>123 Trần Quang Khải, Q.1 | <a href="https://www.google.com/maps/place/123+%C4%90.+Tr%E1%BA%A7n+Quang+Kh%E1%BA%A3i,+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+%C4%90%E1%BB%8Bnh,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7918837,106.6896406,17z/data=!3m1!4b1!4m6!3m5!1s0x317528ccf1629e1d:0xd4c38c1cf125fd3!8m2!3d10.7918837!4d106.6922155!16s%2Fg%2F11c2g80kw0?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
          <div>
            <p>602 Lê Hồng Phong, P.10 | <a href="https://www.google.com/maps/place/MobileCity+602+L%C3%AA+H%E1%BB%93ng+Phong/@10.7692706,106.6713544,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f7704d5a065:0x92ae8fc1d586ac40!8m2!3d10.7692706!4d106.6739293!16s%2Fg%2F11fm184hsb?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"
              target="blank" className="text-blue-600 hover:underline hover:text-yellow-700 transition-colors duration-300">Xem bản đồ</a></p>
            <p>Điện thoại: 0123.456.789 - 0987.654.321</p>
          </div>
        </div>
      </div>

      {/* Quy định - Chính sách - Toàn bộ các mục trong danh sách này đều bấm được */}
      <div>
        <h4 className="font-semibold text-yellow-600 mb-4">📜 QUY ĐỊNH - CHÍNH SÁCH</h4>
        <ul className="text-sm text-gray-700 space-y-3">
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Chính sách bảo hành</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Chính sách vận chuyển</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Chính sách đổi trả hàng</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Chính sách bảo mật thông tin</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Hướng dẫn thanh toán</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Hướng dẫn mua hàng Online</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Dịch vụ Ship COD Toàn quốc</a></li>
          <li><a href="/policy" className="hover:underline hover:text-yellow-700 transition-colors duration-300">Chính sách đại lý linh, phụ kiện</a></li>
        </ul>
      </div>

      {/* Tổng đài hỗ trợ - Phần này không có gì để bấm */}
      <div>
        <h4 className="font-semibold text-yellow-600 mb-4">📞 TỔNG ĐÀI HỖ TRỢ MIỄN PHÍ</h4>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Mua hàng - bảo hành <strong>1800.2097</strong> (7h30 - 22h00)</p>
          <p>Kiếu nại <strong>1800.2063</strong> (8h00 - 21h30)</p>
        </div>
      </div>

      {/* Liên kết - Toàn bộ các mục trong danh sách này đều bấm được */}
      <div>
        <h4 className="font-semibold text-yellow-600 mb-4">🔗 LIÊN KẾT</h4>
        <ul className="text-sm text-gray-700 space-y-3">
          <li><a href="https://www.facebook.com/" target="blank" className="flex items-center space-x-2 hover:text-yellow-700 transform hover:-translate-y-1 transition-all duration-300"><FaFacebook className="text-blue-600" /> <span>Facebook</span></a></li>
          <li><a href="https://www.youtube.com/" target="blank" className="flex items-center space-x-2 hover:text-yellow-700 transform hover:-translate-y-1 transition-all duration-300"><FaYoutube className="text-red-500" /> <span>Youtube</span></a></li>
          <li><a href="https://www.instagram.com/" target="blank" className="flex items-center space-x-2 hover:text-yellow-700 transform hover:-translate-y-1 transition-all duration-300"><FaInstagram className="text-pink-500" /> <span>Instagram</span></a></li>
          <li><a href="https://www.tiktok.com/" target="blank" className="flex items-center space-x-2 hover:text-yellow-700 transform hover:-translate-y-1 transition-all duration-300"><FaTiktok className="text-black" /> <span>Tiktok</span></a></li>
          <li><a href="https://x.com/X." target="blank" className="flex items-center space-x-2 hover:text-yellow-700 transform hover:-translate-y-1 transition-all duration-300"><FaTwitter className="text-blue-400" /> <span>Twitter</span></a></li>
        </ul>
      </div>
      
    </div>
    <div className="text-center text-xs text-gray-400 py-4 border-t">
      © {new Date().getFullYear()} ShopHub. All rights reserved.
    </div>
  </footer>
);

export default Footer;