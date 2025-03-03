import React from "react";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center p-4 border-b">
      <input type="checkbox" className="w-5 h-5 mr-3" />
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
      <div className="ml-3 flex-1">
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-red-500 font-bold">{item.price} đ</p>
      </div>
      <div className="flex items-center border rounded-lg">
        <button className="px-3 py-1 border-r">-</button>
        <span className="px-4">{item.quantity}</span>
        <button className="px-3 py-1 border-l">+</button>
      </div>
      <button className="ml-4 text-red-500">
        <FaTrash />
      </button>
    </div>
  );
};

const Cart = () => {
  const items = [
    {
      id: 1,
      name: "Máy giặt Panasonic cửa trên 8.2kg",
      price: "4.990.000",
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Nước hoa MFK Baccarat Rouge 540",
      price: "459.000",
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 flex gap-6">
      {/* Danh sách sản phẩm */}
      <div className="flex-1 bg-white shadow-md p-4 rounded-lg">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Thông tin đơn hàng */}
      <div className="w-1/3 bg-white shadow-md p-4 rounded-lg">
        <h2 className="font-semibold text-lg border-b pb-2 mb-3">Thông tin đơn hàng</h2>
        <p className="text-gray-600">Tạm tính: <span className="font-bold">4.367.000 đ</span></p>
        <p className="text-gray-600">Phí vận chuyển: <span className="font-bold">Free</span></p>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600">
          XÁC NHẬN GIỎ HÀNG (1)
        </button>
      </div>
    </div>
  );
};

export default Cart;
