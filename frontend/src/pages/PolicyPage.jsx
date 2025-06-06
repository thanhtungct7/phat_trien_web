import React from "react";
import { FaGift, FaRegCheckSquare } from "react-icons/fa";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const Policy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 mt-8">
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow text-left">
          {/* ƯU ĐÃI MUA HÀNG */}
          <div className="mb-8">
            <div className="flex items-center bg-blue-50 py-2 px-3 rounded-t">
              <FaGift className="text-blue-500 mr-2" />
              <span className="font-semibold text-base text-blue-600">ƯU ĐÃI MUA HÀNG</span>
            </div>
            <ul className="bg-white border border-t-0 rounded-b p-4 space-y-3">
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b>Ưu đãi thu cũ</b> (áp dụng theo cấp bậc MEMBER hiện tại của khách hàng) cho các sản phẩm mua tại Mobile City
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm đến 3% tới đa 400K</b> khi mua Laptop
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm đến 6%</b> khi mua Điện Thoại
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm 3% tới đa 500K</b> khi mua Macbook
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm đến 5%</b> khi mua Camera
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm 5% tới đa 350K</b> khi mua Điện thọa SamSung
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm 10% tới đa 500K</b> khi mua Máy Cũ
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b>Các sản phẩm còn lại</b> áp dụng theo cấp bậc MEMBER hiện tại của khách hàng
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegCheckSquare className="text-black-600 mt-1" />
                <span>
                  <b className="text-black-700">Giảm thêm 10% tới đa 300K</b> khi sửa chữa tại Mobile City
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaGift className="text-black-600 mt-1" />
                <span>
                  Tặng gói <b>Ai Hay Pro 6 tháng</b> trị giá <b className="text-pink-600">1.590.000đ</b>
                </span>
              </li>
            </ul>
          </div>
          {/* CHÍNH SÁCH PHỤC VỤ */}
          <div className="mt-8">
            <div className="flex items-center bg-blue-50 py-2 px-3 rounded-t">
              <FaGift className="text-blue-500 mr-2" />
              <span className="font-semibold text-base text-blue-600">CHÍNH SÁCH PHỤC VỤ</span>
            </div>
            <ul className="bg-white border border-t-0 rounded-b p-4 space-y-3">
              <li className="flex items-start gap-2">
                <FaGift className="text-black-600 mt-1" />
                <span>
                  Áp dụng ưu đãi theo cấp bậc SMEMBER hiện tại của khách hàng
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policy;
