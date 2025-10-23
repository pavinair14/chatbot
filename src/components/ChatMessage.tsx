import type { ChatHistoryType } from "./types"

export const ChatMessage = ({ chat }: { chat: ChatHistoryType }) => (
    <div className="flex items-end gap-2">
        {chat.role === "model" && <p className="material-symbols-rounded bg-purple-700 rounded-full p-1 text-white">support_agent</p>}

        <div className={`p-3 max-w-[250px] rounded-t-xl my-2.5 whitespace-pre-wrap ${chat.role === "user" ? "bg-purple-700 text-white rounded-l-xl ml-auto" : "bg-purple-100 rounded-r-xl"}`}
        >
            {chat.text}
        </div>
    </div>
)