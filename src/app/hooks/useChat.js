
import { useState } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Add fetching state

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsFetching(true); // Start loader

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch AI response");
      }

      const botMessage = {
        id: Date.now() + 1,
        role: "bot",
        content: data.message?.parts?.[0]?.text || "No response from AI.",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 2, role: "bot", content: "Error fetching response." },
      ]);
    } finally {
      setIsFetching(false); // Stop loader
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isFetching, // Return isFetching state
  };
};
