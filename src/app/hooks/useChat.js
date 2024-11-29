
import jwt from "jsonwebtoken";
import { useState } from "react";
//import { generateToken} from "../utils/decrypted";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Add fetching state
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const createJWT = (payload) => {
    try {
      const secretKey = 'sadia12345'; // Your secret key
      const token = jwt.sign(payload, secretKey, {
        expiresIn: '2h', // Token validity
      });
      console.log('Generated JWT:', token);
      return token;
    } catch (error) {
      console.error('Error generating JWT:', error);
      return null;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    // const newToken = jwt.sign({role:'user'},"sadia12345", {
    //   expiresIn: "2h",
    // });

    const payload = { role: 'user', id: 123 }; // Example payload
    const newToken = createJWT(payload);
    
    console.log('JWT Token:', newToken);
    





    console.log(">>>>>>>>>>>>>>>",newToken);

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsFetching(true); // Start loader
  


    console.log("the token is" + token);
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":   `Bearer ${newToken}`,       },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log(data)
      // if (!response.ok) {
      //   throw new Error(data.error || "Failed to fetch AI response");
      // }

      // const botMessage = {
      //   id: Date.now() + 1,
      //   role: "bot",
      //   content: data.message?.parts?.[0]?.text || "No response from AI.",
      // };

      // setMessages((prevMessages) => [...prevMessages, botMessage]);
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



