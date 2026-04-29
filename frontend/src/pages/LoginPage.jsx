import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageSquare, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0f172a] selection:bg-cyan-500/30">
      <div className="relative w-full max-w-5xl">
        {/* Decorative background glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            
            {/* LEFT SIDE: LOGIN FORM */}
            <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">Welcome back</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Login to account</h2>
                <p className="text-slate-400 mt-2">Enter your credentials to access your dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-slate-300">Password</label>
                    <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* SIGN IN BUTTON */}
                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-6"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-400 text-sm">
                New to the platform?{" "}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {/* RIGHT SIDE: BRANDING/ILLUSTRATION */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-slate-800/20 relative">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-[0.03] invert" />
              
              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                  <img
                    src="/login.png"
                    alt="Login Illustration"
                    className="relative w-full max-w-[340px] h-auto object-contain transition-transform duration-1000 hover:rotate-1"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Connect anytime, anywhere</h3>
                <p className="text-slate-400 text-balance max-w-sm mx-auto leading-relaxed">
                  Access your workspace from any device and keep your projects in sync with real-time updates.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['Encrypted', 'High Speed', '24/7 Support'].map((item) => (
                    <span key={item} className="px-3 py-1 bg-blue-500/5 text-blue-300/80 text-[10px] uppercase tracking-widest font-bold rounded-lg border border-blue-500/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;