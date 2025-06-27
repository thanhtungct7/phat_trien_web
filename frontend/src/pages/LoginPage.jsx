import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { OAuthConfig } from "../configuration/configuaration.js";
import { jwtDecode } from "jwt-decode";
// Dùng như sau:

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/homepage";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userInfo = urlParams.get('userInfo');

    if (token && userInfo) {
      try {
        const decodedUserInfo = JSON.parse(decodeURIComponent(userInfo));
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userInfo", JSON.stringify(decodedUserInfo));
        navigate(from, { replace: true });
        window.location.reload();
      } catch (error) {
        console.error("Error processing OAuth callback:", error);
        setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
      }
    }
  }, [navigate, from]);

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log("Redirecting to Google OAuth:", targetUrl);
    window.location.href = targetUrl;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.code === 1000 && data.result) {
        console.log('API Response:', data);

        if (data.result.token) {
          localStorage.setItem("accessToken", data.result.token);
          // Tạo userInfo với các trường phù hợp
          const payload = jwtDecode(data.result.token);
          // payload.scope có thể là string hoặc array, tùy backend
          const scope = payload.scope;
          // Nếu scope là dạng "ADMIN USER" thì tách thành mảng
          const roles = typeof scope === "string" ? scope.split(" ") : (scope || []);

          const userInfo = {
            username: form.username,
            name: form.username, // Header đang tìm field 'name'
            authenticated: data.result.authenticated,
            roles: roles,
            // Thêm các trường khác nếu API trả về
            ...(data.result.user || {})
          };

          console.log('Saving userInfo:', userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          // Kiểm tra role để điều hướng
          if (roles.includes("ADMIN")) {
            navigate("/admin");
          } else {
            navigate("/homepage");
          }

          // Reload để header cập nhật
          window.location.reload();
        } else {
          setError("Không nhận được token từ server");
        }
      } else {
        setError(data.message || "Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleGoBack = () => {
    navigate(-1);
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
                onClick={handleGoBack}
                className="fixed top-6 left-6 px-4 py-2 border rounded bg-white hover:bg-gray-100 text-blue-600 font-semibold z-50 transition-colors"
                disabled={loading}
            >
              ← Quay về
            </button>

            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
              Trở thành thành viên của Mobile City
            </h1>

            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Tài khoản
                  </label>
                  <input
                      name="username"
                      type="text"
                      value={form.username}
                      onChange={handleChange}
                      required
                      placeholder="Nhập tên tài khoản của bạn"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-gray-700 mb-1 font-medium">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mật khẩu của bạn"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    {form.password && (
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                            disabled={loading}
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

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                )}

                <button
                    type="submit"
                    className={`w-full py-2.5 rounded-lg font-semibold text-lg transition-colors mb-3 ${
                        loading
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                    }`}
                    disabled={loading}
                >
                  {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang đăng nhập...
                      </div>
                  ) : (
                      "Đăng nhập"
                  )}
                </button>

                <div className="text-center mb-4">
                  <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-blue-600 hover:underline text-sm transition-colors"
                      disabled={loading}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-sm">
                Hoặc đăng nhập bằng
              </span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>

              <button
                  className={`w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2.5 font-medium transition-colors mb-4 ${
                      loading
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={handleContinueWithGoogle}
                  disabled={loading}
              >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                />
                {loading ? "Đang xử lý..." : "Google"}
              </button>

              <div className="text-center text-gray-500 text-sm">
                Bạn chưa có tài khoản?{" "}
                <button
                    onClick={() => navigate("/register")}
                    className="text-blue-600 font-semibold hover:underline transition-colors"
                    disabled={loading}
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;