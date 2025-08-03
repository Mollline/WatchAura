"use client";

import Footer from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { BasketItem, useBasket } from "@/context/basletContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutUs() {
    const { state } = useBasket();
    const [basket, setBasket] = useState<BasketItem[]>(state.items);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col relative">
            <Header basket={basket} setBasket={setBasket} />

            <main className="flex-grow">
                <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-semibold tracking-tight text-black sm:text-7xl">
                                WatchAura-д тавтай морил
                            </h2>
                            <div className="mt-8 text-lg font-medium text-gray-800 sm:text-xl/8 space-y-4">
                                <p>Албан ёсны брэнд цагны онлайн худалдаа</p>
                                <p>
                                    Танд цаг хугацаа үнэтэй юу? Тэгвэл бид танд дэлхийн алдартай брэндүүдийн жинхэнэ, баталгаат цагнуудыг онлайнаар, хялбар захиалах боломжийг олгож байна!
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>🛍️ 100% оригинал</li>
                                    <li>📦 Хот дотор хүргэлт үнэгүй</li>
                                    <li>📱 Гар утсаараа хялбар захиалах</li>
                                </ul>
                                <p>
                                    Та өөртөө тохирсон загварыг сонгож, хэзээ ч, хаанаас ч захиалгаа өгөөрэй. Загварлаг, найдвартай, нэр хүндтэй — энэ бүхэн нэг дор!
                                </p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col-reverse gap-1">
                                    <dt className="text-base/7 text-gray-600">Нийт цаг</dt>
                                    <dd className="text-4xl font-semibold tracking-tight text-black">20+</dd>
                                </div>
                                <div className="flex flex-col-reverse gap-1">
                                    <dt className="text-base/7 text-gray-600">Захиалгын тоо</dt>
                                    <dd className="text-4xl font-semibold tracking-tight text-black">100+</dd>
                                </div>
                                <div className="flex flex-col-reverse gap-1">
                                    <dt className="text-base/7 text-gray-600">Хүргэлтийн дундаж хугацаа</dt>
                                    <dd className="text-4xl font-semibold tracking-tight text-black">2-24 цаг</dd>
                                </div>
                                <div className="flex flex-col-reverse gap-1">
                                    <dt className="text-base/7 text-gray-600">Сэтгэл ханамжийн баталгаа</dt>
                                    <dd className="text-4xl font-semibold tracking-tight text-black">100%</dd>
                                </div>
                            </dl>
                        </div>

                        {/* ✅ How to Order Section */}
                        <div className="mt-20 max-w-3xl mx-auto">
                            <h3 className="text-3xl font-bold text-black mb-6">Захиалга хэрхэн хийх вэ?</h3>
                            <ol className="list-decimal pl-6 space-y-4 text-lg text-gray-800">
                                <li>
                                    <strong>Цаг сонгох:</strong> Та хүссэн брэндийн цагийг сонгож, дэлгэрэнгүй мэдээллийг уншина уу.
                                </li>
                                <li>
                                    <strong>Сагсанд нэмэх:</strong> Сонгосон цагийг “Сагсанд нэмэх” товчоор сагсандаа хийнэ.
                                </li>
                                <li>
                                    <strong>Захиалга хийх:</strong> Сагс руу орж, хүргэлтийн мэдээллээ оруулан захиалгаа баталгаажуулна.
                                </li>
                                <li>
                                    <strong>Хүргэлт:</strong> Манай баг таны захиалгыг 2-24 цагийн дотор хүргэж өгөх болно.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
