"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetAllWatchesQuery } from "@/generated";
import { FiShoppingCart } from "react-icons/fi";
import { useBasket } from "@/context/basletContext";

// ✅ Toast Component
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

// ✅ Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <svg
      className="animate-spin h-8 w-8 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Ачааллаж байна"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

// ✅ Main Product Component
export const Product = () => {
  const router = useRouter();
  const { data, loading, error } = useGetAllWatchesQuery();
  const { dispatch, state } = useBasket();

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

  const [isPressed, setIsPressed] = useState(false);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.getAllWatches) {
      setWatches(
        data.getAllWatches.filter(
          (watch): watch is NonNullable<typeof watch> => watch !== null
        )
      );
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        Цагуудыг авахад алдаа гарлаа: {error.message}
      </p>
    );

  const handleClick = (id: string) => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      router.push(`/details/${id}`);
    }, 150);
  };

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

    setShowToast(true);

    setActiveButtons((prev) => [...prev, watch.id]);
    setTimeout(() => {
      setActiveButtons((prev) =>
        prev.filter((activeId) => activeId !== watch.id)
      );
    }, 300);
  };

  return (
    <>
      {watches.map((e) => {
        const discountedPrice = e.onSale
          ? e.price * (1 - e.discountPercent / 100)
          : e.price;

        const isActive = activeButtons.includes(e.id);

        return (
          <div
            key={e.id}
            className={`
              bg-white shadow-md rounded-3xl p-4 cursor-pointer
              w-full sm:w-[320px] md:w-[340px] lg:w-[300px] xl:w-[320px]
              transform transition-transform duration-200 ease-in-out
              ${isPressed ? "scale-95 shadow-lg" : "hover:scale-105 hover:shadow-xl"}
            `}
            onClick={() => handleClick(e.id)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                className="h-80 w-full object-cover rounded-2xl"
                src={e.image}
                alt={`${e.brand} цаг`}
              />
            </div>

            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900">{e.brand}</p>

              {e.onSale ? (
                <div className="mb-2 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-600">
                      ₮{Math.floor(discountedPrice - 1)},000
                    </span>
                    <span className="line-through text-gray-500">
                      ₮{e.price},000
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-xl font-bold mb-2 mt-1">
                  ₮{Math.floor(e.price - 1)},000
                </p>
              )}

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToBasket({
                    id: e.id,
                    brand: e.brand,
                    price: Math.floor(discountedPrice - 1),
                    image: e.image,
                  });
                }}
                className={`w-full mt-3 flex items-center justify-center gap-2
                  font-medium py-2 px-4 rounded-2xl transition-all duration-300
                  ${isActive
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                  }
                `}
              >
                <FiShoppingCart className="text-lg" />
                <span className="text-sm font-medium">Сагсанд нэмэх</span>
              </button>
            </div>
          </div>
        );
      })}

      {showToast && (
        <Toast
          message="Захиалга амжилттай сагсанд нэмэгдлээ"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};
