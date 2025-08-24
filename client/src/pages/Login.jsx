import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { GlobalContext } from '../context/GlobalState';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.post('/users/login', { email, password });
            login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary">ExpenseTracker</h1>
                <p className="text-slate-500 mt-2">Welcome back! Please sign in to your account.</p>
            </div>

            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
                {error && <p className="text-red-500 text-center bg-red-100 p-3 rounded-lg">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full mt-1 p-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors" 
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full mt-1 p-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary transition-colors" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 flex items-center justify-center gap-2 text-white font-semibold bg-primary rounded-lg hover:bg-secondary transition-all duration-300 group"
                    >
                        <span>Login</span>
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                </form>
            </div>
             <p className="text-sm text-center text-gray-500 mt-8">
                Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up now</Link>
            </p>
        </div>
    );
};

export default Login;