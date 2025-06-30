import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    setLoading(true);
    setError("");

    try {
        // THAY ĐỔI: Thay đổi URL để gọi đúng endpoint backend
        const response = await fetch("http://localhost:8080/api/users/", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
                firstname: form.firstname,
                lastname: form.lastname,
                phone: form.phone,
                email: form.email,
            }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok && data.code === 1000) { 
            alert("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
            navigate("/login");
        } else {
            setError(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
        }

    } catch (apiError) {
        console.error("Registration error:", apiError);
        setError("Có lỗi xảy ra khi kết nối đến server. Vui lòng thử lại sau.");
    } finally {
        setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      <button
        onClick={handleGoBack}
        className="fixed top-6 left-6 px-4 py-2 border rounded bg-white hover:bg-gray-100 text-blue-600 font-semibold z-50"
        disabled={loading}
      >
        ← Quay về
      </button>
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Đăng ký trở thành Member của Mobile City</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Tên đăng nhập</label>
            <input name="username" value={form.username} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Họ</label>
            <input name="lastname" value={form.lastname} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Tên</label>
            <input name="firstname" value={form.firstname} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Email <span className="text-gray-400">(Không bắt buộc)</span></label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-base" />
            <span className="text-xs text-green-600">✔ Hóa đơn VAT khi mua hàng sẽ được gửi qua email này</span>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Mật khẩu</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} className="w-full border rounded px-3 py-2 mt-1 text-base" />
            <span className="text-xs text-green-600">✔ Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ số và 1 số</span>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Nhập lại mật khẩu</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex justify-between mt-6">
            <a href="/login" className="px-4 py-2 border rounded bg-white hover:bg-gray-100">Quay lại đăng nhập</a>
            <button 
                type="submit" 
                className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;