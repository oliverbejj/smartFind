import { ChatMessageOut } from "../api-client/models/ChatMessageOut";

type ChatHistoryProps = {
  messages: ChatMessageOut[];
};

function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-6 py-4 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Conversation</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-base">No messages yet. Ask something!</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="text-base text-gray-900 whitespace-pre-wrap">
              <span className="font-semibold text-gray-700">Q:</span> {msg.question}
            </div>

            <div className="text-base text-green-800 mt-4 whitespace-pre-wrap">
              <span className="font-semibold text-green-700">A:</span> {msg.answer}
            </div>

            {msg.sources && msg.sources.length > 0 && (
              <div className="text-sm text-gray-500 mt-2">
                Source{msg.sources.length > 1 ? "s" : ""}: {msg.sources.join(", ")}
              </div>
            )}

            <div className="text-xs text-gray-400 mt-2">
              {new Date(msg.created_at).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatHistory;
