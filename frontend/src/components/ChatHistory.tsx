import { ChatMessageOut } from "../api-client/models/ChatMessageOut";

type ChatHistoryProps = {
  messages: ChatMessageOut[];
};

function ChatHistory({ messages }: ChatHistoryProps) {
    console.log("Browser time zone:", Intl.DateTimeFormat().resolvedOptions().timeZone);
    

  return (
    <div className="bg-white p-4 rounded-2xl shadow max-w-md mx-auto my-6 h-96 overflow-y-auto space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Conversation</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-sm">No messages yet. Ask something!</p>
      ) : (
        messages.map((msg) => (
            <div key={msg.id} className="bg-gray-50 border rounded p-3">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Q:</span> {msg.question}
              </div>
          
              <div className="text-sm text-green-700 mt-1">
                <span className="font-medium">A:</span> {msg.answer}
              </div>
          
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  Source{msg.sources.length > 1 ? "s" : ""}: {msg.sources.join(", ")}
                </div>
              )}
          
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.created_at).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    })
                    }

                
                
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default ChatHistory;
