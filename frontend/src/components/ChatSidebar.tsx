import { useState } from "react";
import { ChatSessionOut } from "../api-client/models/ChatSessionOut";


type ChatSidebarProps = {
  chats: ChatSessionOut[];
  selectedChatId: string | null;
  onSelect: (id: string) => void;
  onNewChat: (chat: ChatSessionOut) => void; // callback when a chat is created
};

function ChatSidebar({ chats, selectedChatId, onSelect, onNewChat }: ChatSidebarProps) {
  const [creating, setCreating] = useState(false);
  const [chatName, setChatName] = useState("");

  const handleCreateChat = async () => {
    if (!chatName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("http://localhost:8000/chats/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: chatName }),
      });

      const newChat = await res.json();
      onNewChat(newChat);
      onSelect(newChat.id);
      setChatName("");
    } catch (err) {
      console.error("Failed to create chat", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>

      <ul className="flex-1 space-y-2 overflow-auto">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`cursor-pointer p-2 rounded ${
              chat.id === selectedChatId
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {chat.name}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="New chat name"
          className="w-full px-2 py-1 border rounded text-sm mb-2"
          disabled={creating}
        />
        <button
          onClick={handleCreateChat}
          className="w-full bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700"
          disabled={creating}
        >
          + New Chat
        </button>
      </div>
    </div>
  );
}

export default ChatSidebar;
