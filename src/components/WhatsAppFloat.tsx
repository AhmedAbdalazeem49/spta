import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phoneNumber = "+966541812433";
  const message = "";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
        <FaWhatsapp className="text-white text-3xl" />

        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 blur-md group-hover:opacity-60 transition" />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20" />
      </div>
    </a>
  );
}
