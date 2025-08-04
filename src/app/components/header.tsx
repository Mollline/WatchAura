"use client";

import { useBasket } from "@/context/basletContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FiShoppingCart, FiX, FiMenu } from "react-icons/fi";
import { BasketItem } from "@/types";

type ProductProps = {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
};

export const Header = ({ basket, setBasket }: ProductProps) => {
  const { state, dispatch } = useBasket();
  const basketItems = state.items;
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const prevBasketRef = useRef<BasketItem[]>([]);
  const handleRemoveFromBasket = (id: string) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: { id } });
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  const totalPrice = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setBasket(state.items);
  }, [state.items]);

  return (
    <>
      {/* Толгой хэсэг */}
      <header className="w-full bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Зүүн тал: Лого + Ширээний навигаци */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <button onClick={() => setIsMobileNavOpen(true)}>
                <FiMenu size={24} className="text-gray-700" />
              </button>
            </div>
            <div
              onClick={() => router.push("/")}
              className="cursor-pointer flex items-center gap-2"
            >
              <img
                src="https://res.cloudinary.com/djy2x9wmg/image/upload/v1751607029/att.z0C0mEFbb79fRSSS6SA8QXyGqOqxwiIXREbovc_DrkU_1_eitaax.png"
                alt="WatchAura Лого"
                className="w-12 h-12 rounded-full"
              />
              <img
                src="https://res.cloudinary.com/djy2x9wmg/image/upload/v1753254133/Screenshot_2025-07-23_at_14.59.52-removebg-preview_lepgtu.png"
                alt="WatchAura Текст"
                className="w-32 h-12 rounded-full"
              />
            </div>

            {/* Ширээний навигаци */}
            <nav className="hidden md:flex items-center gap-5 ml-6">
              <div
                onClick={() => router.push("/")}
                className="text-gray-800 text-lg cursor-pointer"
              >
                Нүүр
              </div>
              <div
                onClick={() => router.push("/details/payment")}
                className="text-gray-800 text-lg cursor-pointer"
              >
                Сагс
              </div>
              <div
                onClick={() => router.push("/about")}
                className="text-gray-800 text-lg cursor-pointer"
              >
                Бидний тухай
              </div>
              <div
                onClick={() => router.push("/trackOrder")}
                className="text-gray-800 text-lg cursor-pointer"
              >
                Захиалга
              </div>
            </nav>
          </div>

          {/* Баруун тал: Гар утасны меню дүрс + Сагс */}
          <div className="flex items-center gap-4">
            {/* Сагс */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-600 hover:text-indigo-600 relative"
            >
              <FiShoppingCart size={22} />
              <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {basket.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Сагсны хөшиг */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Сагсны хажуу талын цонх */}
      <aside
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold" style={{ color: 'black' }}>Таны сагс</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-indigo-600"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {basketItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Сагс хоосон байна.</p>
          ) : (
            <div className="space-y-6">
              {basket.map(({ id, brand, price, image, quantity }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-center gap-4" >
                    <img
                      src={image}
                      alt={brand}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <div className="flex items-center gap-4 flex-col">
                      <div>
                        <p className="font-semibold text-lg text-gray-800">{brand}</p>
                        <p className="text-sm text-gray-600">
                          ₮{price.toLocaleString()},000
                        </p>
                        <p className="text-sm text-gray-600">
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecreaseQuantity(id)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-lg font-bold text-black"
                        >
                          −
                        </button>
                        <span className="text-gray-800 text-base w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(id)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-lg font-bold text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleRemoveFromBasket(id)}
                      className="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all duration-200 shadow-sm"
                    >
                       Устгах
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {basket.length > 0 && (
          <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-lg z-50">
            <div className="flex justify-between mb-3 px-1">
              <span className="text-gray-700 font-medium">Нийт дүн:</span>
              <span className="text-gray-900 font-semibold">
                ₮{totalPrice.toLocaleString()},000
              </span>
            </div>
            <button
              onClick={() => router.replace("/details/payment")}
              className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition"
            >
              Төлбөр төлөх
            </button>
          </div>
        )}
      </aside>

      {/* Гар утасны навигацийн хөшиг */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Гар утасны хажуу талын меню */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[300px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold" style={{ color: 'black' }}>Меню</h2>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="text-gray-600 hover:text-indigo-600"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6 p-6 text-gray-800 text-lg">
          <div
            onClick={() => {
              router.push("/");
              setIsMobileNavOpen(false);
            }}
            className="cursor-pointer"
          >
            Нүүр
          </div>
          <div
            onClick={() => {
              router.push("/details/payment");
              setIsMobileNavOpen(false);
            }}
            className="cursor-pointer"
          >
            Сагс
          </div>
          <div
            onClick={() => {
              router.push("/about");
              setIsMobileNavOpen(false);
            }}
            className="cursor-pointer"
          >
            Бидний тухай
          </div>
          <div
            onClick={() => {
              router.push("/trackOrder");
              setIsMobileNavOpen(false);
            }}
            className="cursor-pointer"
          >
            Захиалга
          </div>
        </div>
      </aside>

    </>
  );
};
