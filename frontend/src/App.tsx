import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import ChatSidebar from "./components/ChatSidebar";
import ChatHistory from "./components/ChatHistory";
import AnswerForm, { AnswerFormHandle } from "./components/AnswerForm";
import { useRef } from "react";






// OpenAPI client imports
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

  

  const fetchChats = async () => {
    try {
      const data = await ChatsService.listChatSessionsChatsGet();
      setChatSessions(data);
      if (!selectedChatId && data.length > 0) {
        setSelectedChatId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch chat sessions", err);
    }
  };

  const fetchDocuments = async () => {
    if (!selectedChatId) return;
    try {
      const data = await ChatsService.getDocumentsForChatChatsChatIdDocumentsGet(selectedChatId);
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents for chat:", err);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChatId) return;
    const data = await ChatsService.getMessagesForChatChatsChatIdMessagesGet(selectedChatId);
    setChatMessages(data);
  };

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

  

  return (
    <div className="flex gap-4">
      <ChatSidebar
        chats={chatSessions}
        selectedChatId={selectedChatId}
        onSelect={setSelectedChatId}
        onNewChat={handleNewChat}
      />

      <div className="flex-1">
        {selectedChatId ? (
          <>
            <UploadForm onUploadSuccess={fetchDocuments} chatId={selectedChatId} />
            <DocumentList documents={documents} onDelete={handleDelete} />
            <ChatHistory messages={chatMessages} />
            <AnswerForm
            chatId={selectedChatId}
            ref={answerFormRef}
            onMessage={handleNewMessage}
            />



          </>
        ) : (
          <p className="text-gray-600">Please select a chat session.</p>
        )}
      </div>
    </div>
  );
}

export default App;
