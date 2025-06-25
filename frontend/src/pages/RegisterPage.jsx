import React, { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    // Xử lý đăng ký ở đây
    alert("Đăng ký thành công!");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-6 left-6 px-4 py-2 border rounded bg-white hover:bg-gray-100 text-blue-600 font-semibold z-50"
      >
        ← Quay về
      </button>
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Đăng ký trở thành Member của Mobile City</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Họ và tên</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Ngày sinh</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1 text-base" />
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
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Hoàn tất đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
