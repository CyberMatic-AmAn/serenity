import { useState } from "react";
import { motion } from "framer-motion";
import img from "@/components/ui/fm.jpg";

function CallPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-5 w-80">
        <input
          className="w-full mb-3 border rounded px-3 py-2"
          placeholder="Your Name"
        />
        <input
          className="w-full mb-4 border rounded px-3 py-2"
          placeholder="Phone Number"
        />
        <button
          className="w-full py-2 rounded bg-primary text-primary-foreground"
          onClick={onClose}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default function VideoRoom() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden"
        >
          <img
            src={img}
            alt="Counselor"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl font-bold mb-4">
              Talk to counselor
            </h1>

            <button
              onClick={() => setPopupOpen(true)}
              className="px-6 py-3 rounded-lg bg-lime-400 text-black font-semibold hover:bg-lime-300 transition"
            >
              Start Conversation
            </button>

          </div>
        </motion.div>
      </div>

      <CallPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
