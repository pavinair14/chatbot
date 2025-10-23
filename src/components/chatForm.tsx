import { useRef } from "react"
import type { ChatFormType, ChatHistoryType } from "./types";

export const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }: ChatFormType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = inputRef.current?.value.trim();
        if (!value) return;

        if (inputRef.current) inputRef.current.value = "";

        setChatHistory((prevState: ChatHistoryType[]) => ([...prevState, { role: "user", text: value }]))

        setTimeout(() => setChatHistory((prevState: ChatHistoryType[]) => ([...prevState, { role: "model", text: "Thinking..." }])), 600)
        generateBotResponse([...chatHistory, { role: "user", text: value as string }])
    }

    return (
        <form action="#" className="flex items-center border border-slate-400 justify-between rounded-full px-2 py-1" onSubmit={handleFormSubmit}>
            <input type="text" ref={inputRef} placeholder="Ask Anything" required className="border-slate-300 border-0 outline-0 w-full px-2" />
            <button className="material-symbols-rounded bg-purple-700 rounded-full text-white p-1 transition ease-in cursor-pointer delay-150">arrow_upward</button>
        </form>
    )
}