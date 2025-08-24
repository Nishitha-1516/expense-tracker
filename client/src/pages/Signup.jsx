import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { GlobalContext } from '../context/GlobalState';
import { FaArrowRight } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/users/register', { name, email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        {/* Decorative gradient blur */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-30"></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-md">ExpenseTracker</h1>
          <p className="text-slate-500 mt-2">Create an account to start your journey 🚀</p>
        </div>

        {error && (
          <p className="text-red-600 text-center bg-red-100 p-3 rounded-lg mb-4 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 text-white font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group"
          >
            <span>Create Account</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6 relative z-10">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline hover:text-secondary transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
