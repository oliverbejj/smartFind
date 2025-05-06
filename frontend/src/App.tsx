import { useState, useEffect, useRef } from "react";
import UploadForm from "./components/UploadForm";
import ChatSidebar from "./components/ChatSidebar";
import ChatHistory from "./components/ChatHistory";
import AnswerForm, { AnswerFormHandle } from "./components/AnswerForm";

import { ChatsService, DocumentsService } from "./api-client";
import { ChatSessionOut } from "./api-client/models/ChatSessionOut";
import { ChatMessageOut } from "./api-client/models/ChatMessageOut";
import { app__routers__chat_router__DocumentOut as DocumentOut } from "./api-client/models/app__routers__chat_router__DocumentOut";

function App() {
  const answerFormRef = useRef<AnswerFormHandle>(null);

  const [chats, setChats] = useState<ChatSessionOut[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentOut[]>([]);
  const [messages, setMessages] = useState<ChatMessageOut[]>([]);

  /* ---------- data fetch ---------- */
  const loadChats = async () => {
    const data = await ChatsService.listChatSessionsChatsGet();
    setChats(data);
    if (!selectedChatId && data.length) setSelectedChatId(data[0].id);
  };

  const loadDocuments = async () => {
    if (selectedChatId)
      setDocuments(
        await ChatsService.getDocumentsForChatChatsChatIdDocumentsGet(
          selectedChatId,
        ),
      );
  };

  const loadMessages = async () => {
    if (selectedChatId)
      setMessages(
        await ChatsService.getMessagesForChatChatsChatIdMessagesGet(
          selectedChatId,
        ),
      );
  };

  /* ---------- handlers ---------- */
  const handleNewChat = (chat: ChatSessionOut) => {
    setChats((c) => [chat, ...c]);
    setSelectedChatId(chat.id);
  };

  const handleDeleteChat = (id: string) => {
    setChats((c) => c.filter((chat) => chat.id !== id));
    if (selectedChatId === id) setSelectedChatId(null);
  };

  const handleNewMessage = (msg: ChatMessageOut) =>
    setMessages((m) => [...m, msg]);

  const handleDeleteDocument = async (docId: string) => {
    await DocumentsService.deleteDocumentDocumentsDocIdDelete(docId);
    loadDocuments();
  };

  /* ---------- effects ---------- */
  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (!selectedChatId) {
      setDocuments([]);
      setMessages([]);
      return;
    }
    loadDocuments();
    loadMessages();
    answerFormRef.current?.reset();
  }, [selectedChatId]);

  /* ---------- UI ---------- */
  return (
    <div className="h-screen flex overflow-hidden">
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelect={setSelectedChatId}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChatId ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatHistory messages={messages} />
            </div>

            <div className="border-t p-4 bg-white space-y-2">
              {/* document chips + “+” upload */}
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
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <UploadForm
                  onUploadSuccess={loadDocuments}
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
            Please select or create a chat.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
