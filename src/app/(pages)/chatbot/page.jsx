"use client";
import { useChat } from "@/app/hooks/useChat";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});
  const chatContainer = useRef(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg shadow-inner bg-white">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            } items-start space-x-3 animate-fade-in`}
          >
            {m.role === "bot" && (
              <img
                //src="/images/bot-avatar.png"
                src="https://www.pngitem.com/pimgs/m/122-1223088_one-bot-discord-avatar-hd-png-download.png"
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full mr-3 shadow-sm object-cover"
              />
            )}
            <div
              className={`${
                m.role === "user"
                  ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
              } rounded-2xl p-4 shadow-lg max-w-md transition-transform transform hover:scale-105`}
            >
              <p>{m.content}</p>
            </div>
            {m.role === "user" && (
              <img
                //src="/images/user-avatar.png"
                src="https://th.bing.com/th/id/R.3fc564e161b13a2dec701a60948e7fec?rik=ilDXUp%2bvxMVDvQ&riu=http%3a%2f%2fwww.upgradeclass.com%2fwelcome%2fwp-content%2fuploads%2f2021%2f08%2f1.png&ehk=nj5A%2bUbNf2kyAQPX4abEB9mpSgGoXHm6NmJN3r4Nl98%3d&risl=&pid=ImgRaw&r=0"
                alt="User Avatar"
                className="w-8 h-8 rounded-full ml-3 shadow-sm object-cover overflow-hidden"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={chatContainer}
      className="flex flex-col justify-between h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-6 scroll-smooth"
    >
      <div className="sticky top-0 z-10 p-4 mx-auto w-fit">
        <div className="flex items-center space-x-3">
          {/* Avatar/Icon */}
          <img
            //src="/images/bot-avatar.png"
            src="https://www.pngitem.com/pimgs/m/122-1223088_one-bot-discord-avatar-hd-png-download.png"
            alt="Chatbot Icon"
            className="w-10 h-10 rounded-full shadow-md object-cover"
          />
          {/* Header Title */}
          <h1 className="text-lg font-semibold text-gray-700">Chat with AI</h1>
        </div>
      </div>

      {/* Render chat messages */}
      {renderResponse()}

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-4 mt-4"
      >
        <input
          name="input-field"
          type="text"
          placeholder="Type your message..."
          onChange={handleInputChange}
          value={input}
          className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
        >
          Send
        </button>
      </form>
    </div>
  );
}
