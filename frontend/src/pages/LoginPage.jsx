import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { OAuthConfig } from "../configuration/configuaration.js";

const LoginPage = () => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.phone || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setError("");
    alert("Đăng nhập thành công!");

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left: Info/Promotion */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 w-1/2 p-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">
            Nhập hội khách hàng thành viên{" "}
            <span className="text-blue-600">Mobile City</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Để không bỏ lỡ các ưu đãi hấp dẫn từ Mobile City
          </p>
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 w-full max-w-md mb-6">
            <ul className="space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Chiết khấu <b>đến 5%</b> khi mua các sản phẩm mua tại Mobile City
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Miễn phí giao hàng cho thành viên, VIP và cho đơn hàng từ
                  300.000đ
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Tặng voucher sinh nhật <b>đến 500.000đ</b> cho khách hàng thành
                  viên
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Trợ giá thu cũ lên đổi <b>đến 1 triệu</b>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Thăng hạng nhận voucher <b>đến 300.000đ</b>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">🎁</span>
                <span>
                  Đặc quyền S-Student/S-Teacher <b>ưu đãi thêm đến 10%</b>
                </span>
              </li>
            </ul>
            <a
              href="/policy"
              className="block text-center text-blue-600 mt-3 text-sm font-semibold hover:underline"
            >
              Xem chi tiết chính sách ưu đãi thành viên &gt;
            </a>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12">
          <button
            onClick={() => window.location.href = '/'}
            className="fixed top-6 left-6 px-4 py-2 border rounded bg-white hover:bg-gray-100 text-blue-600 font-semibold z-50"
          >
            ← Quay về
          </button>
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Trở thành thành viên của Mobile City
          </h1>
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full border rounded px-3 py-2 mt-1 text-base"
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1">Mật khẩu</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full border rounded px-3 py-2 mt-1 text-base"
                    autoComplete="current-password"
                  />
                  {form.password && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-4">
              </div>
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 mb-2"
              >
                Đăng nhập
              </button>
              <div className="text-center mb-4">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">
                Hoặc đăng nhập bằng
              </span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 mb-4" onClick={handleContinueWithGoogle}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
            <div className="text-center text-gray-500 text-sm">
              Bạn chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
