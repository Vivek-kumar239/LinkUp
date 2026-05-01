import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-transparent">
    {/* Icon Container with Pulsing Ring */}
    <div className="relative mb-6">
      <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
      <div className="relative w-20 h-20 bg-slate-900 border border-white/10 shadow-2xl rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
        <MessageCircleIcon className="size-10 text-cyan-400" />
      </div>
    </div>

    {/* Typography Section */}
    <div className="space-y-2 mb-8">
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        Chat with <span className="text-cyan-400">{name}</span>
      </h3>
      <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed mx-auto">
        Break the ice! This is the very beginning of your story together.
      </p>
    </div>

    {/* Suggestion Chips */}
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
        Quick Actions
      </p>
      <div className="grid grid-cols-1 gap-2">
        {[
          { label: "Say Hello", emoji: "👋" },
          { label: "How's your day?", emoji: "☀️" },
          { label: "Meet up soon?", emoji: "📅" }
        ].map((action) => (
          <button
            key={action.label}
            className="group flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-200"
          >
            <span>{action.label}</span>
            <span className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform">
              {action.emoji}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);
};

export default NoChatHistoryPlaceholder;
