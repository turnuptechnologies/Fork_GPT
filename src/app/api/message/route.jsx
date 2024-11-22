
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    // Parse the request body
    const { message } = await req.json();

    // Validate that a message is provided
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Fetch the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with the provided message
    const result = await model.generateContent(message);

    // Debug: Log the full result structure
    console.log("Result from Generative AI API:", result);

    // Extract the text from the first candidate in the response
    const aiMessage =
      result.response?.candidates?.[0]?.content || "No response from AI";

    // Send the AI response back
    return NextResponse.json(
      { message: aiMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error with Google Generative AI API:", error.message);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

