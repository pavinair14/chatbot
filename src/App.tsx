import { useEffect, useRef, useState } from "react";
import { ChatForm } from "./components/chatForm";
import { ChatMessage } from "./components/ChatMessage";
import type { ChatHistoryType } from "./components/types";

function App() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);
  const chatBodyRef = useRef<HTMLInputElement | null>(null);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    chatBodyRef?.current?.scrollTo?.({ top: chatBodyRef.current?.scrollHeight, behavior: "smooth" })
  }, [chatHistory])

  const generateBotResponse = async (history: ChatHistoryType[]) => {
    const historyData = history.map(({ role, text }) => ({ role, parts: [{ text }] }))
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: historyData })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const responseTxt = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      setChatHistory((prevState: ChatHistoryType[]) => [...prevState.filter(item => item.text !== "Thinking..."), { role: "model", text: responseTxt }])

    } catch (e) {
      console.error(e);
      setChatHistory((prevState: ChatHistoryType[]) => [
        ...prevState.filter((item) => item.text !== "Thinking..."),
        { role: "model", text: "⚠️ Gemini API took too long or failed to respond." },
      ]);
    }
  }

  return (
    <div className="w-full md:w-md rounded-xl shadow-lg bg-white fixed bottom-0 right-0 transition-transform">

      <div className="bg-purple-700 rounded-t-xl flex text-white p-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="material-symbols-rounded bg-white rounded-full p-1 text-purple-700">support_agent</p>
          <h2 className="text-xl font-medium">Chatbot</h2>
        </div>
        <button className={`material-symbols-rounded cursor-pointer ${openChat ? "" : "rotate-180"}`} onClick={() => setOpenChat(!openChat)}>keyboard_arrow_down</button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${openChat ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div ref={chatBodyRef} className={`p-6 h-[68vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent`}>
          <div className="flex items-end gap-2">
            <p className="material-symbols-rounded bg-purple-700 rounded-full p-1 text-white">support_agent</p>
            <div className="bg-purple-100 p-3 max-w-[400px] rounded-t-xl rounded-r-xl"><p>Hi there, How can I help you today</p></div>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="p-4">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>

    </div>
  )
}

export default App
