"use client";

import Footer from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { BasketItem, useBasket } from "@/context/basletContext";
import { useCreateOrderMutation } from "@/generated";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PaymentPage() {
  const { state, dispatch } = useBasket();
  const [basket, setBasket] = useState<BasketItem[]>(state.items);
  const router = useRouter();

  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [createOrderMutation, { loading, error }] = useCreateOrderMutation();
  const [confirmationLoading, setConfirmationLoading] = useState(false);

  useEffect(() => {
    setBasket(state.items);
  }, [state.items]);

  useEffect(() => {
    const total = basket.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
  }, [basket]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalPrice === 0) {
      alert("Таны сагс хоосон байна.");
      return;
    }

    setConfirmationLoading(true);

    try {
      await createOrderMutation({
        variables: {
          input: {
            items: basket.map((item) => ({
              watch: item.id.toString(),
              quantity: item.quantity,
            })),
            phoneNumber: number,
            deliveryPlace: address,
            totalPrice,
          },
        },
      });

      dispatch({ type: "RESET_BASKET" });
      localStorage.setItem("trackOrderPhone", number);
      router.push("/trackOrder");

      alert("Таны захиалга амжилттай илгээгдлээ!");
    } catch (err) {
      console.error("Захиалга үүсгэхэд алдаа гарлаа:", err);
      alert("Захиалга үүсгэхэд алдаа гарлаа.");
    } finally {
      setConfirmationLoading(false);
    }
  };

  const increaseQuantity = (id: string) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });

  const decreaseQuantity = (id: string) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });

  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_FROM_BASKET", payload: { id } });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Header basket={basket} setBasket={setBasket} />

      {/* Loading Blur Overlay */}
      {confirmationLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent" />
        </div>
      )}

      <main className="flex-grow max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Төлбөр төлөх</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Payment Form Section */}
          <section className="bg-white rounded-lg shadow p-8 max-w-md w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Төлбөр төлөх мэдээлэл</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                  Гэрийн хаяг
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Гэрийн хаяг"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  autoComplete="street-address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                  Утасны дугаар
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={number}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    setNumber(numericValue);
                  }}
                  inputMode="numeric"
                  pattern="\d{8}"
                  maxLength={8}
                  placeholder="Утасны дугаар"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  autoComplete="tel"
                />
              </div>

              <div className="text-black space-y-2 bg-gray-50 rounded-lg p-4 border">
                <p>
                  Та <strong>₮{totalPrice.toLocaleString()},000</strong>-г Голомт банкны:
                </p>
                <p>
                  IBAN дугаар: <strong>04001500</strong><br />
                  Дансны дугаар: <strong>1905141320</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Шилжүүлгийн утгад <strong>утасны дугаараа</strong> заавал бичээрэй.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md font-semibold shadow-md transition bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={loading || confirmationLoading}
              >
                {loading || confirmationLoading
                  ? "Боловсруулж байна..."
                  : "Мэдээлэл оруулах"}
              </button>

              {error && (
                <p className="text-red-600 mt-2 text-center">
                  Захиалга үүсгэхэд алдаа гарлаа.
                </p>
              )}
            </form>
          </section>

          {/* Basket Sidebar Section */}
          <section className="bg-white rounded-lg shadow p-6 max-w-lg w-full mx-auto border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Таны сагс</h2>
            {basket.length === 0 ? (
              <p className="text-gray-500">Таны сагс хоосон байна.</p>
            ) : (
              <ul className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {basket.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center">
                    <div className="w-24 h-24 overflow-hidden rounded border border-gray-300">
                      <img
                        src={item.image}
                        alt={item.brand}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.brand}</h3>
                        <p className="text-sm text-gray-500">₮{item.price.toLocaleString()},000</p>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className={`px-3 py-1 text-sm rounded ${item.quantity <= 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                            } transition`}
                        >
                          −
                        </button>
                        <span className="text-black font-semibold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-6 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all duration-200 shadow-sm"
                        >
                          🗑️ Устгах
                        </button>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
