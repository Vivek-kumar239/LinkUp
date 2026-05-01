import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              // Inside the messages.map loop
              <div className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"} mb-4`}>
                <div
                  className={`chat-bubble max-w-[85%] sm:max-w-[70%] p-3 shadow-md ${msg.senderId === authUser._id
                      ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-2xl rounded-tr-none"
                      : "bg-slate-800 border border-slate-700/50 text-slate-200 rounded-2xl rounded-tl-none"
                    }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-xl mb-2 w-full h-auto max-h-64 object-cover border border-white/10"
                    />
                  )}
                  {msg.text && <p className="text-[15px] leading-relaxed">{msg.text}</p>}
                  <div className={`text-[10px] mt-1.5 flex items-center gap-1 font-medium ${msg.senderId === authUser._id ? "text-cyan-100/70" : "text-slate-400"
                    }`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
