import { useState, useRef } from "react";
import { CameraIcon, LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

 return (
  <div className="p-5 border-b border-white/[0.05] bg-slate-900/40 backdrop-blur-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Avatar with Interactive Ring */}
        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <button
            className="relative size-14 rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-cyan-500/50 transition-all duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300">
              <CameraIcon className="size-4 text-white mb-0.5" />
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Edit</span>
            </div>
          </button>

          {/* Status Badge */}
          <span className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-4 border-slate-900 rounded-full" />
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* User Identity */}
        <div className="flex flex-col">
          <h3 className="text-slate-100 font-bold text-sm tracking-tight truncate max-w-[150px]">
            {authUser.fullName}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Active Now
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center bg-white/[0.03] p-1 rounded-xl border border-white/[0.05]">
        {/* Sound Toggle */}
        <button
          className={`p-2 rounded-lg transition-all ${
            isSoundEnabled 
              ? "text-cyan-400 bg-cyan-500/10" 
              : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
          }`}
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch(() => {});
            toggleSound();
          }}
          title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {isSoundEnabled ? <Volume2Icon className="size-4" /> : <VolumeOffIcon className="size-4" />}
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Logout */}
        <button
          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          onClick={logout}
          title="Logout"
        >
          <LogOutIcon className="size-4" />
        </button>
      </div>
    </div>
  </div>
);
}
export default ProfileHeader;
