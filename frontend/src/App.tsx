import { useState, useEffect, useRef } from "react";
import UploadForm from "./components/UploadForm";
import ChatSidebar from "./components/ChatSidebar";
import ChatHistory from "./components/ChatHistory";
import AnswerForm, { AnswerFormHandle } from "./components/AnswerForm";

import {
  app__routers__document_router__DocumentOut as DocumentOut,
} from "./api-client/models/app__routers__document_router__DocumentOut";
import { ChatSessionOut } from "./api-client/models/ChatSessionOut";
import { ChatMessageOut } from "./api-client/models/ChatMessageOut";

import {
  ChatsService,
  DocumentsService,
} from "./api-client";

function App() {
  const answerFormRef = useRef<AnswerFormHandle>(null);
  const [documents, setDocuments] = useState<DocumentOut[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSessionOut[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageOut[]>([]);

  /* -------- fetch helpers -------- */
  const fetchChats = async () => {
    const data = await ChatsService.listChatSessionsChatsGet();
    setChatSessions(data);
    if (!selectedChatId && data.length > 0) setSelectedChatId(data[0].id);
  };

  const fetchDocuments = async () => {
    if (!selectedChatId) return;
    const data =
      await ChatsService.getDocumentsForChatChatsChatIdDocumentsGet(
        selectedChatId
      );
    setDocuments(data);
  };

  const fetchMessages = async () => {
    if (!selectedChatId) return;
    const data =
      await ChatsService.getMessagesForChatChatsChatIdMessagesGet(
        selectedChatId
      );
    setChatMessages(data);
  };

  /* -------- actions -------- */
  const handleDelete = async (id: string) => {
    await DocumentsService.deleteDocumentDocumentsDocIdDelete(id);
    fetchDocuments();
  };

  const handleNewChat = (newChat: ChatSessionOut) => {
    setChatSessions((prev) => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
  };

  const handleNewMessage = (newMsg: ChatMessageOut) => {
    setChatMessages((prev) => [...prev, newMsg]);
  };

  /* -------- life‑cycle -------- */
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      fetchDocuments();
      fetchMessages();
      answerFormRef.current?.reset();
    }
  }, [selectedChatId]);

  /* -------- UI -------- */
  return (
    <div className="h-screen flex overflow-hidden">
      <ChatSidebar
        chats={chatSessions}
        selectedChatId={selectedChatId}
        onSelect={setSelectedChatId}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChatId ? (
          <>
            {/* conversation area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatHistory messages={chatMessages} />
            </div>

            {/* bottom panel */}
            <div className="border-t p-4 bg-white space-y-2">
              {/* doc chips + plus button */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
                    >
                      <span className="truncate max-w-[150px]">
                        {doc.name}
                      </span>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <UploadForm
                  onUploadSuccess={fetchDocuments}
                  chatId={selectedChatId}
                />
              </div>

              <AnswerForm
                chatId={selectedChatId}
                ref={answerFormRef}
                onMessage={handleNewMessage}
              />
            </div>
          </>
        ) : (
          <div className="m-auto text-gray-600">
            Please select a chat session.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
