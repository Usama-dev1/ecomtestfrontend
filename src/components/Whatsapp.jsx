import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
const Whatsapp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-10 right-5 z-100">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="relative bg-white shadow-2xl rounded-lg text-center p-5 mb-20 max-w-xs">
          <button
            className="absolute top-2 right-2 text-red-500 text-3xl"
            onClick={handleChatToggle}>
            <FaWindowClose />
          </button>
          <h2 className="text-lg font-bold">WhatsApp Chat</h2>
          <p>How can we help you?</p>
          <textarea
            className="w-full p-2 border rounded mt-2"
            rows="3"
            placeholder="Type your message..."></textarea>

          <Link to="https://web.whatsapp.com/">
            <button className="bg-gray-500 text-white py-2 px-4 rounded mt-2">
              Send
            </button>
          </Link>
        </div>
      )}
      {/* Toggle Button */}
      <div className="bg-gray-500 rounded-full text-center p-3 fixed bottom-0 right-0 mb-5 mr-5 z-30">
        {isChatOpen ? (
          <button onClick={handleChatToggle}>
            <MdClose className="inline-block text-white text-5xl" />
          </button>
        ) : (
          <button onClick={handleChatToggle}>
            <RiMessage2Fill className="inline-block text-white text-5xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Whatsapp;
