import React from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const ContactPage = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Liên hệ</h1>
        <p className="text-gray-700">
          Địa chỉ: 123 Đường Chiến Thắng, huyện Thanh Trì, thành phố Hà Nội<br />
          Hotline: <a href="tel:0123456789" className="text-blue-600">0123 456 789</a><br />
          Email: <a href="mailto:support@mobilecity.com" className="text-blue-600">support@mobilecity.com</a>
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default ContactPage;