import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md border-b border-slate-800 h-20 px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-700 shadow-sm">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="object-cover w-full h-full" />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          )}
        </div>
        <div>
          <h3 className="text-white font-bold tracking-tight">{selectedUser.fullName}</h3>
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">
            {isOnline ? "Active Now" : "Offline"}
          </span>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-800 rounded-full transition-all">
        <XIcon className="w-5 h-5 text-slate-500" />
      </button>
    </div>
  );
}
export default ChatHeader;
