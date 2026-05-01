import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
 return (
  <div className="relative flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900/10 overflow-hidden">
    {/* Atmospheric Background Glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full" />

    {/* Illustration / Icon Section */}
    <div className="relative mb-8">
      {/* Decorative Outer Ring */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 rotate-6 scale-110" />
      <div className="absolute inset-0 rounded-[2.5rem] border border-cyan-500/10 -rotate-3 scale-105" />
      
      {/* Main Icon Container */}
      <div className="relative size-24 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-cyan-500/5 rounded-[2rem] animate-pulse" />
        <MessageCircleIcon className="size-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
      </div>
    </div>

    {/* Content Section */}
    <div className="relative z-10 max-w-sm">
      <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
        Your inbox is ready
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-8">
        Select a contact from the sidebar to start a new thread or pick up where you left off.
      </p>

      {/* Optional: Visual Cue / Hint */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
        <div className="size-1.5 rounded-full bg-cyan-500 animate-bounce" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Waiting for selection
        </span>
      </div>
    </div>

    {/* Aesthetic Bottom Detail */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
      <div className="w-8 h-1 rounded-full bg-white/5" />
      <div className="w-2 h-1 rounded-full bg-white/5" />
      <div className="w-2 h-1 rounded-full bg-white/5" />
    </div>
  </div>
);
};

export default NoConversationPlaceholder;
