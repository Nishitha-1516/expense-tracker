import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { FaTachometerAlt, FaCoins, FaCreditCard, FaSignOutAlt, FaChartPie } from 'react-icons/fa';

const Sidebar = () => {
    const { logout } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${isActive
            ? 'bg-secondary text-white'
            : 'text-gray-700 hover:bg-blue-100 hover:text-primary'
        }`;

    return (
        <aside className="w-64 bg-white shadow-md flex-col hidden sm:flex">
            <div className="p-6 text-2xl font-bold text-primary border-b">
                ExpenseTracker
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/" className={navLinkClasses}>
                    <FaTachometerAlt className="mr-3" /> Dashboard
                </NavLink>
                <NavLink to="/incomes" className={navLinkClasses}>
                    <FaCoins className="mr-3" /> Incomes
                </NavLink>
                <NavLink to="/expenses" className={navLinkClasses}>
                    <FaCreditCard className="mr-3" /> Expenses
                </NavLink>
                <NavLink to="/analytics" className={navLinkClasses}>
                    <FaChartPie className="mr-3" /> Analytics
                </NavLink>
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
                >
                    <FaSignOutAlt className="mr-3" /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;