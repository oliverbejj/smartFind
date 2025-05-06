import { useState } from "react";
import { ChatsService } from "../api-client";
import { ChatSessionOut } from "../api-client/models/ChatSessionOut";
import { ChatSessionCreate } from "../api-client/models/ChatSessionCreate";

type Props = {
  chats: ChatSessionOut[];
  selectedChatId: string | null;
  onSelect: (id: string | null) => void;
  onNewChat: (chat: ChatSessionOut) => void;
  onDeleteChat: (id: string) => void;
};

function ChatSidebar({
  chats,
  selectedChatId,
  onSelect,
  onNewChat,
  onDeleteChat,
}: Props) {
  const [creating, setCreating] = useState(false);
  const [chatName, setChatName] = useState("");

  const handleCreateChat = async () => {
    if (!chatName.trim()) return;
    setCreating(true);
    try {
      const newChat = await ChatsService.createChatSessionChatsPost({
        name: chatName,
      } as ChatSessionCreate);
      onNewChat(newChat);
      onSelect(newChat.id);
      setChatName("");
    } catch (err) {
      console.error("Failed to create chat", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await ChatsService.deleteChatSessionChatsChatIdDelete(id);
      onDeleteChat(id);
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>

      <ul className="flex-1 space-y-2 overflow-auto">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`group p-2 rounded flex justify-between items-center cursor-pointer ${
              chat.id === selectedChatId
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            <span
              onClick={() => onSelect(chat.id)}
              className="truncate flex-1"
            >
              {chat.name}
            </span>
            <button
              onClick={() => handleDeleteChat(chat.id)}
              className="text-red-500 hover:text-red-700 ml-2 text-xs hidden group-hover:inline"
              title="Delete chat"
            >
              ✕
            </button>
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
