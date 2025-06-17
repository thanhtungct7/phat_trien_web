import React from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const PrivacyPage = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Chính sách bảo mật</h1>
        <p className="text-gray-700 mb-4">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách bảo mật của chúng tôi bao gồm:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Thông tin cá nhân của bạn sẽ không được chia sẻ với bên thứ ba.</li>
          <li>Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để bảo vệ dữ liệu của bạn.</li>
          <li>Bạn có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân bất kỳ lúc nào.</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;