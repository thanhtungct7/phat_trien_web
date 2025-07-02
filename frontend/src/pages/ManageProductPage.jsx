import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { Listbox } from "@headlessui/react";

const CATEGORY_OPTIONS = [
  { value: "laptop", label: "Laptop" },
  { value: "camera", label: "Camera" },
  { value: "phone", label: "Điện thoại" },
];

const ManageProductPage = () => {
  // State cho form thêm sản phẩm
  const [addForm, setAddForm] = useState({
    category: "laptop",
    name: "",
    brand: "",
    description: "",
    price: "",
    quantity: "",
    year: "",
    image: "",
  });
  // State cho form xóa sản phẩm
  const [deleteId, setDeleteId] = useState("");
  // State cho form sửa sản phẩm
  const [editForm, setEditForm] = useState({
    id: "",
    category: "laptop",
    name: "",
    brand: "",
    description: "",
    price: "",
    quantity: "",
    year: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  // Xử lý thêm sản phẩm (giả lập)
  const handleAddProduct = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu lên backend
    setMessage(`Đã thêm sản phẩm: ${addForm.name}`);
    setAddForm({
      category: "laptop",
      name: "",
      brand: "",
      description: "",
      price: "",
      quantity: "",
      year: "",
      image: "",
    });
  };

  // Xử lý xóa sản phẩm (giả lập)
  const handleDeleteProduct = (e) => {
    e.preventDefault();
    // TODO: Gửi yêu cầu xóa lên backend
    setMessage(`Đã xóa sản phẩm với ID hoặc tên: ${deleteId}`);
    setDeleteId("");
  };

  // Xử lý sửa sản phẩm (giả lập)
  const handleEditProduct = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu sửa lên backend
    setMessage(`Đã sửa sản phẩm ID: ${editForm.id}`);
    setEditForm({
      id: "",
      category: "laptop",
      name: "",
      brand: "",
      description: "",
      price: "",
      quantity: "",
      year: "",
      image: "",
    });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Quản lý sản phẩm</h1>

          {/* Form thêm sản phẩm */}
          <form onSubmit={handleAddProduct} className="mb-8 pb-4">
            <h2 className="text-xl font-semibold mb-3">Thêm sản phẩm mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-sm">Thể loại</label>
                <Listbox value={addForm.category} onChange={val => setAddForm({ ...addForm, category: val })}>
                  <div className="relative mb-3">
                    <Listbox.Button className="w-full border rounded px-3 py-2 text-left cursor-pointer flex items-center justify-between">
                      <span>
                        {CATEGORY_OPTIONS.find(opt => opt.value === addForm.category)?.label}
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white border rounded shadow z-10">
                      {CATEGORY_OPTIONS.map(opt => (
                        <Listbox.Option
                          key={opt.value}
                          value={opt.value}
                          className={({ active }) =>
                            `px-4 py-2 cursor-pointer transition ${active ? "bg-gray-100 text-blue-500" : ""}`
                          }
                        >
                          {opt.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <Input
                label="Tên sản phẩm"
                value={addForm.name}
                onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                required
                className="mb-3"
              />
              <Input
                label="Nhãn hiệu"
                value={addForm.brand}
                onChange={e => setAddForm({ ...addForm, brand: e.target.value })}
                required
                className="mb-3"
              />
              <Input
                label="Giá ($)"
                type="number"
                value={addForm.price}
                onChange={e => setAddForm({ ...addForm, price: e.target.value })}
                required
                className="mb-3"
              />
              <Input
                label="Số lượng"
                type="number"
                value={addForm.quantity}
                onChange={e => setAddForm({ ...addForm, quantity: e.target.value })}
                required
                className="mb-3"
              />
              <Input
                label="Năm sản xuất"
                type="number"
                value={addForm.year}
                onChange={e => setAddForm({ ...addForm, year: e.target.value })}
                required
                className="mb-3"
              />
            </div>
            <Input
              label="Giới thiệu"
              value={addForm.description}
              onChange={e => setAddForm({ ...addForm, description: e.target.value })}
              required
              className="mb-3"
            />
            <Input
              label="Link ảnh"
              value={addForm.image}
              onChange={e => setAddForm({ ...addForm, image: e.target.value })}
              required
              className="mb-3"
            />
            <Button type="submit" variant="primary" className="w-full">Thêm sản phẩm</Button>
          </form>

          {/* Separator */}
          <div className="my-12 border-t border-gray-200" />

          {/* Form sửa sản phẩm */}
          <form onSubmit={handleEditProduct} className="mb-8 pb-4">
            <h2 className="text-xl font-semibold mb-3">Sửa sản phẩm</h2>
            <Input
              label="ID sản phẩm"
              value={editForm.id}
              onChange={e => setEditForm({ ...editForm, id: e.target.value })}
              required
              className="mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-sm">Thể loại</label>
                <Listbox value={editForm.category} onChange={val => setEditForm({ ...editForm, category: val })}>
                  <div className="relative mb-3">
                    <Listbox.Button className="w-full border rounded px-3 py-2 text-left cursor-pointer flex items-center justify-between">
                      <span>
                        {CATEGORY_OPTIONS.find(opt => opt.value === editForm.category)?.label}
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white border rounded shadow z-10">
                      {CATEGORY_OPTIONS.map(opt => (
                        <Listbox.Option
                          key={opt.value}
                          value={opt.value}
                          className={({ active }) =>
                            `px-4 py-2 cursor-pointer ${active ? "bg-gray-200 text-blue-700" : ""}`
                          }
                        >
                          {opt.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <Input
                label="Tên mới"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                className="mb-3"
              />
              <Input
                label="Nhãn hiệu mới"
                value={editForm.brand}
                onChange={e => setEditForm({ ...editForm, brand: e.target.value })}
                className="mb-3"
              />
              <Input
                label="Giá mới ($)"
                type="number"
                value={editForm.price}
                onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                className="mb-3"
              />
              <Input
                label="Số lượng mới"
                type="number"
                value={editForm.quantity}
                onChange={e => setEditForm({ ...editForm, quantity: e.target.value })}
                className="mb-3"
              />
              <Input
                label="Năm sản xuất mới"
                type="number"
                value={editForm.year}
                onChange={e => setEditForm({ ...editForm, year: e.target.value })}
                className="mb-3"
              />
            </div>
            <Input
              label="Giới thiệu"
              value={editForm.description}
              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              className="mb-3"
            />
            <Input
              label="Link ảnh mới"
              value={editForm.image}
              onChange={e => setEditForm({ ...editForm, image: e.target.value })}
              className="mb-3"
            />
            <Button type="submit" variant="warning" className="w-full bg-blue-600 text-white">Sửa sản phẩm</Button>
          </form>

          {/* Separator */}
          <div className="my-12 border-t border-gray-200" />

          {/* Form xóa sản phẩm */}
          <form onSubmit={handleDeleteProduct}>
            <h2 className="text-xl font-semibold mb-3">Xóa sản phẩm</h2>
            <Input
              label="ID hoặc tên sản phẩm"
              value={deleteId}
              onChange={e => setDeleteId(e.target.value)}
              required
              className="mb-3"
            />
            <Button type="submit" variant="danger" className="w-full bg-blue-600 text-white">Xóa sản phẩm</Button>
          </form>
          
          {message && <div className="mt-6 text-green-600 font-semibold">{message}</div>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ManageProductPage;