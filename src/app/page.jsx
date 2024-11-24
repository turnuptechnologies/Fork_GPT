"use client";
import Link from "next/link";
//import Chat from './components/(pages)/chatbot/page'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Fork GPT
      </h1>
      <Link
        href="/chatbot"
        className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        Click to Chat
      </Link>
    </div>
  );
}
