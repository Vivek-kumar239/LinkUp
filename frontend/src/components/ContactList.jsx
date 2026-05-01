import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
  <div className="flex flex-col">
    {allContacts.map((contact) => {
      const isOnline = onlineUsers.includes(contact._id);
      
      return (
        <button
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group hover:bg-white/[0.05] active:scale-[0.98]"
        >
          {/* Avatar with Status Ring */}
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 rounded-full blur-sm transition-opacity ${
              isOnline ? "bg-emerald-500/40 opacity-100" : "opacity-0"
            }`} />
            <div className={`relative size-12 rounded-full p-[2px] ${
              isOnline ? "bg-gradient-to-tr from-emerald-500 to-cyan-400" : "bg-slate-700"
            }`}>
              <img 
                src={contact.profilePic || "/avatar.png"} 
                alt={contact.fullName}
                className="size-full rounded-full object-cover bg-slate-800 border-2 border-slate-900"
              />
            </div>
            
            {/* Status Indicator Dot */}
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg" />
            )}
          </div>

          {/* Contact Info */}
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-slate-200 font-semibold truncate group-hover:text-white transition-colors">
                {contact.fullName}
              </h4>
              <span className="text-[10px] text-slate-500 font-medium">
                {isOnline ? "Online" : "Away"}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {isOnline ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </button>
      );
    })}
  </div>
);
}
export default ContactList;
