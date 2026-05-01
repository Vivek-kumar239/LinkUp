import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
  <div className="p-4 bg-slate-900/50 backdrop-blur-lg border-t border-white/5">
    {/* Refined Image Preview Area */}
    {imagePreview && (
      <div className="max-w-3xl mx-auto mb-4 animate-in fade-in slide-in-from-bottom-2">
        <div className="relative inline-block group">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-xl border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-200 hover:bg-red-500 hover:text-white transition-all shadow-xl"
            type="button"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-end gap-2">
      <div className="relative flex-1 flex items-center bg-slate-800/40 border border-white/10 rounded-2xl focus-within:border-cyan-500/50 focus-within:bg-slate-800/60 transition-all px-2 py-1.5 shadow-inner">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Attachment Button Nested Inside */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-xl transition-all ${
            imagePreview 
              ? "text-cyan-400 bg-cyan-500/10" 
              : "text-slate-400 hover:text-cyan-400 hover:bg-white/5"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Improved Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 py-2 px-2 text-sm"
          placeholder="Message..."
        />
      </div>

      {/* Primary Send Button */}
      <button
        type="submit"
        disabled={!text.trim() && !imagePreview}
        className="flex items-center justify-center w-11 h-11 bg-cyan-500 text-slate-900 rounded-xl hover:bg-cyan-400 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100 shadow-lg shadow-cyan-500/20"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  </div>
);
}
export default MessageInput;
