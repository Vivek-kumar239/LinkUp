import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-slate-800/40 p-1.5 rounded-xl m-4 border border-slate-700/50 shadow-inner">
      {["chats", "contacts"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-300 ease-out ${
            activeTab === tab 
              ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20" 
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}


export default ActiveTabSwitch;
