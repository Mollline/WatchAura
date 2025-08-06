"use client";

import Footer from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { useBasket } from "@/context/basletContext";
import { useGetAllWatchesQuery } from "@/generated";
import { BasketItem } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

const Toast = ({
  message,
  duration = 1000,
  onClose,
}: {
  message: string;
  duration?: number;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 shadow-lg backdrop-blur-sm"
      style={{
        borderTopRightRadius: 0,
        borderTopLeftRadius: "0.75rem",
        borderBottomRightRadius: "0.75rem",
        borderBottomLeftRadius: "0.75rem",
        opacity: 0.95,
      }}
    >
      {message}
    </div>
  );
};

export default function Page() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = params.id;
  const { dispatch } = useBasket();
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const { data, loading, error } = useGetAllWatchesQuery();
  const [isNavigating, setIsNavigating] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [watches, setWatches] = useState<
    {
      __typename?: "Watch";
      id: string;
      brand: string;
      type: string;
      image: string;
      price: number;
      onSale: boolean;
      discountPercent: number;
      saleEndsAt?: string | null;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    if (data?.getAllWatches) {
      setWatches(
        data.getAllWatches.filter(
          (watch): watch is NonNullable<typeof watch> => watch !== null
        )
      );
    }
  }, [data]);

  const filteredWatch = watches.find((watch) => watch.id === productId);

  // ✅ Loading overlay with blurred background
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-transparent" />
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Цагуудыг авахад алдаа гарлаа: {error.message}
      </p>
    );
  if (!filteredWatch)
    return <p className="text-center mt-10">Цаг олдсонгүй.</p>;

  const handleAddToBasket = (watch: {
    id: string;
    brand: string;
    price: number;
    image: string;
  }) => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: {
        ...watch,
        quantity: 1,
      },
    });

    setActiveButtons((prev) => [...prev, watch.id]);
    setShowToast(true);

    setTimeout(() => {
      setActiveButtons((prev) => prev.filter((activeId) => activeId !== watch.id));
    }, 300);
  };

  const {
    brand,
    type,
    image,
    price,
    onSale,
    discountPercent,
    saleEndsAt,
    quantity,
  } = filteredWatch;

  const discountedPrice = onSale ? price * (1 - discountPercent / 100) : price;
  const saleEndDate = saleEndsAt
    ? new Date(Number(saleEndsAt)).toLocaleDateString()
    : null;

  const sameBrandWatches = watches.filter(
    (watch) => watch.brand === brand && watch.id !== productId
  );

  const handleClick = (id: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/details/${id}`);
    }, 300);
  };

  const isActive = activeButtons.includes(filteredWatch.id);

  return (
    <div
      className="relative"
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    >
      <Header basket={basket} setBasket={setBasket} />
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Зураг */}
          <div className="flex justify-center items-center bg-gray-50 p-0 m-0">
            <img
              src={image}
              alt={`${brand} ${type}`}
              className="object-contain w-full h-auto max-h-[34rem]"
            />
          </div>

          {/* Дэлгэрэнгүй */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-gray-800">{brand}</h1>
              <p className="text-gray-700 mb-4">{type}</p>
              {onSale ? (
                <div className="mb-2">
                  <span className="inline-block mb-2 px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-semibold">
                    {discountPercent}% ХЯМДРАЛ
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-600">
                      ₮{Math.floor(discountedPrice - 1)},000
                    </span>
                    <span className="line-through text-gray-500">
                      ₮{price},000
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xl font-bold mb-2 text-gray-600">
                  ₮{Math.floor(price - 1)},000
                </p>
              )}
              {onSale ? (
                saleEndDate ? (
                  <div>
                    <p className="text-sm text-gray-500 mb-4">
                      Хямдрал дуусах хугацаа: {saleEndDate}
                    </p>
                  </div>
                ) : null
              ) : (
                <p className="text-xl font-bold mb-2"></p>
              )}

              <p className="text-sm text-gray-500 mb-4">Япон үйлдвэрлэл</p>
              <p className="text-gray-700 mb-4">
                Үлдсэн тоо: <span className="font-medium">{quantity}</span>
              </p>

              {sameBrandWatches.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Бусад {brand} цагнууд
                  </h2>
                  <div className="flex space-x-2 overflow-x-auto">
                    {sameBrandWatches.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => handleClick(w.id)}
                        className="flex-shrink-0 w-20 h-20 border rounded overflow-hidden transform transition-transform duration-150 hover:scale-105 focus:outline-none"
                      >
                        <img
                          src={w.image}
                          alt={w.type}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToBasket({
                    id: filteredWatch.id,
                    brand: filteredWatch.brand,
                    price: Math.floor(discountedPrice - 1),
                    image: filteredWatch.image,
                  });
                }}
                className={`w-full mt-3 flex items-center justify-center gap-2
                  font-medium py-2 px-4 rounded-2xl transition-all duration-300
                  ${isActive ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}
                `}
              >
                <FiShoppingCart className="text-lg" />
                <span className="text-sm font-medium">Сагсанд нэмэх</span>
              </button>
            </div>
          </div>
        </div>

        {/* Бусад цагнууд */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Өөр цагнуудыг үзэх</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {watches
              .filter((e) => e.id !== productId)
              .map((e) => {
                const watchDiscountedPrice = e.onSale
                  ? Math.floor(e.price * (1 - e.discountPercent / 100) - 1)
                  : Math.floor(e.price - 1);

                return (
                  <div
                    key={e.id}
                    className="bg-white shadow-md rounded-3xl p-4 cursor-pointer flex-shrink-0 w-64 sm:w-72 md:w-80 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
                    onClick={() => handleClick(e.id)}
                  >
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        className="h-48 w-full object-cover rounded-2xl"
                        src={e.image}
                        alt={`${e.brand} цаг`}
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{e.brand}</p>
                        <p className="text-md text-gray-800">₮{watchDiscountedPrice},000</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

      </div>
      <Footer />

      {/* Навигацийн ачааллын бүрхүүл */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      {/* Toast Мессеж */}
      {showToast && (
        <Toast
          message="Захиалга амжилттай сагсанд нэмэгдлээ"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
