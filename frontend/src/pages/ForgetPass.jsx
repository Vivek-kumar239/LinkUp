import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router';


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/sendOtp', { email: formData.email });
      setMessage({ type: 'success', text: res.data.message });
      setStep(2);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error sending OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/verifyOtp', {
        email: formData.email,
        otp: formData.otp
      });
      setMessage({ type: 'success', text: res.data.message });
      setStep(3);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Invalid OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/changePassword', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      setMessage({ type: 'success', text: res.data.message });
      // Logic for redirecting to /login could go here
      navigate('/login');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        {step === 1 && "Forgot Password"}
        {step === 2 && "Verify OTP"}
        {step === 3 && "Reset Password"}
      </h2>

      {message.text && (
        <div className={`p-3 mb-4 rounded-xl text-sm border ${
          message.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-slate-400 mb-2 text-sm">Email Address</label>
            <input
              type="email"
              name="email" // Added name attribute
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800/40 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50 transition-all"
              placeholder="name@company.com"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {/* Step 2 & 3 remain structurally the same, just ensure styling matches the dark theme of App.js */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <p className="text-sm text-slate-400 mb-4 text-center">OTP sent to {formData.email}</p>
          <input
            type="text"
            name="otp"
            required
            maxLength="6"
            className="w-full bg-slate-800/40 border border-slate-700 text-white px-4 py-3 rounded-xl text-center tracking-widest text-lg outline-none focus:border-blue-500/50"
            value={formData.otp}
            onChange={handleChange}
          />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
            className="w-full bg-slate-800/40 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full bg-slate-800/40 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500/50"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;