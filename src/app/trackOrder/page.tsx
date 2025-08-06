"use client";

import Footer from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { BasketItem, useBasket } from "@/context/basletContext";
import { useGetAllOrdersQuery, useGetAllWatchesQuery } from "@/generated";
import { useEffect, useState } from "react";

type OrderItem = {
  quantity: number;
  watch: string;
};

type Order = {
  id: string;
  deliveryPlace: string;
  phoneNumber: string;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
};

type Watch = {
  id: string;
  brand: string;
  type: string;
  image: string;
  price: number;
  onSale: boolean;
  discountPercent: number;
  saleEndsAt?: string | null;
  quantity: number;
};

export default function TrackOrderPage() {
  const { state } = useBasket();
  const [basket, setBasket] = useState<BasketItem[]>(state.items);
  const { data: orderData, loading, error, refetch } = useGetAllOrdersQuery();
  const { data: watchData } = useGetAllWatchesQuery();

  const [orders, setOrders] = useState<Order[]>([]);
  const [watches, setWatches] = useState<Watch[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searched, setSearched] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");

  useEffect(() => {
    const storedPhone = localStorage.getItem("trackOrderPhone");
    if (storedPhone) {
      setSearchPhone(storedPhone);
      handleSearch(storedPhone);
    }
  }, []);

  useEffect(() => {
    if (searchPhone.length === 8) {
      handleSearch(searchPhone);
    }
  }, [searchPhone]);

  const handleSearch = async (phone?: string) => {
    const phoneNumber = phone ?? searchPhone;
    await refetch();
    const filtered = orders.filter((order) => order.phoneNumber === phoneNumber);
    setFilteredOrders(filtered);
    setSearched(true);
    localStorage.setItem("trackOrderPhone", phoneNumber);
  };

  useEffect(() => {
    if (orderData?.getAllOrders) {
      const nonNullOrders = orderData.getAllOrders.filter((o): o is Order => o !== null);
      const sorted = nonNullOrders.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      setOrders(sorted);
    }

    if (watchData?.getAllWatches) {
      const nonNullWatches = watchData.getAllWatches.filter((w): w is Watch => w !== null);
      setWatches(nonNullWatches);
    }
  }, [orderData, watchData]);

  const findWatchById = (id: string) => watches.find((watch) => watch.id === id);

  return (
    <div className="relative bg-white min-h-screen w-full flex flex-col">
      <Header basket={basket} setBasket={setBasket} />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
          Захиалгын мэдээлэл шалгах
        </h1>

        {/* Search & Bank Info */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-12">
          <div className="flex-1 space-y-4">
            <p className="text-md text-gray-800">
              Утасны дугаар:
            </p>
            <input
              type="text"
              placeholder="Утасны дугаар (8 оронтой)"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              inputMode="tel"
              maxLength={8}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none text-lg"
              style={{ color: 'black' }}
            />
            <p className="text-sm text-gray-600">
              Та хайх товчийг дарснаар захиалгуудаа харах болно.
            </p>
            <button
              onClick={() => handleSearch()}
              className={`bg-black text-white w-full py-3 rounded-xl font-medium hover:bg-gray-800 transition ${searchPhone.length < 8 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={searchPhone.length < 8}
            >
              Хайх
            </button>
          </div>


          <div className="bg-gray-100 p-6 rounded-xl border text-gray-800 text-base space-y-2 w-full lg:w-[400px]">
            <p className="font-semibold">💳 Төлбөрийн мэдээлэл:</p>
            <p>🏦 <strong>Голомт Банк</strong></p>
            <p>
              IBAN: <strong>04001500</strong><br />
              Данс: <strong>1905141320</strong>
            </p>
            <p className="text-sm text-gray-600">
              Шилжүүлгийн утгад <strong>утасны дугаараа</strong> бичихээ мартуузай.
            </p>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-8">
          
          {loading && <p className="text-center text-gray-500">Ачааллаж байна...</p>}
          {error && <p className="text-center text-red-500">Алдаа гарлаа. Та дахин оролдоно уу.</p>}
          {searched && filteredOrders.length === 0 && (
            <p className="text-center text-gray-500">Тухайн утасны дугаарт захиалга олдсонгүй.</p>
          )}

          {searched &&
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-3xl p-6 bg-white shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Захиалга</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm sm:text-base mb-4">
                  <p>🏠 Хаяг: {order.deliveryPlace}</p>
                  <p>📞 Утас: {order.phoneNumber}</p>
                  <p>🕓 Огноо: {new Date(Number(order.createdAt)).toLocaleDateString()}</p>
                  <p>💰 Нийт: ₮ {order.totalPrice.toLocaleString()},000</p>
                </div>

                <ul className="space-y-4 border-t pt-4 mt-4">
                  {order.items.map((item, index) => {
                    const watch = findWatchById(item.watch);
                    return (
                      <li
                        key={index}
                        className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl"
                      >
                        {watch && (
                          <img
                            src={watch.image}
                            alt={watch.brand}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover border shadow-sm"
                          />
                        )}
                        <div className="text-gray-800">
                          <p className="font-medium">{watch?.brand ?? "Цаг олдсонгүй"}</p>
                          <p className="text-sm text-gray-600">Тоо ширхэг: {item.quantity}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
