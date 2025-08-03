import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-10 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-10">
        
        {/* Бидний тухай хэсэг */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-4 text-white">Бидний тухай</h3>
          <p className="text-sm leading-relaxed">
            Манай онлайн дэлгүүрт тавтай морилно уу! Бид чанартай бугуйн цагийг боломжийн үнээр санал болгодог. Судлаад, сонирхоод, итгэлтэйгээр худалдан авалт хийгээрэй.
          </p>
        </div>

        {/* Хурдан холбоосууд */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold mb-4 text-white">Хурдан холбоосууд</h3>
          <ul className="text-sm space-y-3">
            <li>
              <a href="/" className="hover:underline hover:text-indigo-500 transition">
                Нүүр
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline hover:text-indigo-500 transition">
                Бидний тухай
              </a>
            </li>
            <li>
              <a href="/details/payment" className="hover:underline hover:text-indigo-500 transition">
                Сагс
              </a>
            </li>
            <li>
              <a href="/trackOrder" className="hover:underline hover:text-indigo-500 transition">
                Захиалга Баталгаажуулах
              </a>
            </li>
          </ul>
        </div>

        {/* Нийгмийн сүлжээ ба холбоо барих */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-semibold mb-6 text-white">Дагах ба Холбоо барих</h3>
          <div className="flex flex-col gap-4">

            <a
              href="https://www.facebook.com/profile.php?id=61568834480429"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-indigo-500 transition"
            >
              <FaFacebookF size={20} />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/_watchaura_/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>

            <a
              href="tel:+97695889688"
              className="flex items-center gap-3 hover:text-green-500 transition"
            >
              <FaPhoneAlt size={20} />
              <div>
                <div className="font-semibold text-white text-md">9588 9688</div>
              </div>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            © 2025 WatchAura. Watches reflect your worth
          </p>
        </div>
      </div>
    </footer>
  );
}
