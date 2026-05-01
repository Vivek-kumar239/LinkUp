import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
  <div className="flex flex-col space-y-1">
    {chats.map((chat) => {
      const isOnline = onlineUsers.includes(chat._id);
      const isSelected = selectedUser?._id === chat._id;

      return (
        <button
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`
            w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative
            ${isSelected 
              ? "bg-cyan-500/15 ring-1 ring-cyan-500/30" 
              : "hover:bg-slate-800/60 active:bg-slate-800/80"}
          `}
        >
          {/* Selected Indicator Bar */}
          {isSelected && (
            <div className="absolute left-0 w-1 h-8 bg-cyan-500 rounded-r-full shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
          )}

          {/* Avatar Section */}
          <div className="relative flex-shrink-0">
            <div className={`
              size-12 rounded-full overflow-hidden border-2 transition-colors
              ${isSelected ? "border-cyan-500/50" : "border-slate-700 group-hover:border-slate-500"}
            `}>
              <img 
                src={chat.profilePic || "/avatar.png"} 
                alt={chat.fullName} 
                className="size-full object-cover"
              />
            </div>
            
            {/* Status Dot */}
            <span className={`
              absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-slate-900
              ${isOnline ? "bg-emerald-500" : "bg-slate-600"}
            `} />
            
            {/* Online Pulse Effect */}
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 rounded-full animate-ping opacity-75" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className={`
                text-sm font-semibold truncate transition-colors
                ${isSelected ? "text-cyan-400" : "text-slate-200 group-hover:text-white"}
              `}>
                {chat.fullName}
              </h4>
              <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">
                12:45 PM
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 truncate italic pr-2">
                {isOnline ? "Active now" : "Click to view chat"}
              </p>
              
              {/* Optional: Unread Message Badge */}
              {/* <div className="size-2 bg-cyan-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" /> */}
            </div>
          </div>
        </button>
      );
    })}
  </div>
);
}
export default ChatsList;
