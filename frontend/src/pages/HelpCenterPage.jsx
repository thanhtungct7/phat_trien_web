import React from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const HelpCenterPage = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Trung tâm trợ giúp</h1>
        <p className="text-gray-700">
          Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua hotline hoặc email. Chúng tôi luôn sẵn sàng giúp đỡ bạn.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default HelpCenterPage;