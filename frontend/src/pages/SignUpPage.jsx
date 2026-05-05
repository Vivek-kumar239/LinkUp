import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageSquare, Lock, Mail, User, Loader2, Rocket } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0f172a] selection:bg-cyan-500/30">
      <div className="relative w-full max-w-5xl">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            
            {/* LEFT SIDE: FORM */}
            <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-sm font-semibold tracking-wider text-cyan-500 uppercase">Join us</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Create your account</h2>
                <p className="text-slate-400 mt-2">Get started with LinkUP today.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-slate-600"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-slate-600"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSigningUp}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 mt-4"
                >
                  {isSigningUp ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Rocket className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors underline-offset-4 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* RIGHT SIDE: BRANDING */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-slate-800/30 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              
              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse" />
                  <img
                    src="/signup.png"
                    alt="Platform Preview"
                    className="relative w-full max-w-[320px] h-auto rounded-2xl drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Scale your workflow</h3>
                <p className="text-slate-400 text-balance max-w-sm mx-auto leading-relaxed">
                  Join thousands of developers building the future of the web with our unified platform.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['Secure', 'Optimized', 'Cloud Native'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full border border-slate-600">
                      {tag}
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

export default SignUpPage;