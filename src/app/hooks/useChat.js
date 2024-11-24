import { useState } from "react";

 //Custom hook to manage chat functionality.

export const useChat = () => {
  // State for storing chat messages
  const [messages, setMessages] = useState([]);

  // State for managing the user's input
  const [input, setInput] = useState("");

  // Handle input field changes
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle form submission (simulates API response)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    // Add user's message to the chat
    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear the input field
    setInput("");



    try {
        const response = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }), // Send the user's message to the backend
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch AI response");
        }
      
        // Extract AI response text from the API response
        const botMessageText = data.message?.parts?.[0]?.text || "No response from AI.";
      
        // Add AI's response to the chat
        const botResponse = {
          id: Date.now() + 1,
          role: "bot",
          content: botMessageText.trim(), // Use only the relevant text
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage = {
          id: Date.now() + 2,
          role: "bot",
          content: "Error: Unable to fetch AI response. Try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
      
      
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  };
};


