export type ChatHistoryType = {
    role: string;
    text: string;
}

export type ChatFormType = {
    chatHistory: ChatHistoryType[];
    setChatHistory: React.Dispatch<React.SetStateAction<ChatHistoryType[]>>;
    generateBotResponse: (value: ChatHistoryType[]) => void
}