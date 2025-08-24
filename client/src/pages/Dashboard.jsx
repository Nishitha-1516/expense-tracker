import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import LineChart from '../components/charts/LineChart';
import api from '../api/axios';
import { saveAs } from 'file-saver';


const Dashboard = () => {
    const { incomes, expenses, user } = useContext(GlobalContext);

    const totalIncome = useMemo(() => incomes.reduce((acc, item) => acc + item.amount, 0), [incomes]);
    const totalExpenses = useMemo(() => expenses.reduce((acc, item) => acc + item.amount, 0), [expenses]);
    const totalBalance = totalIncome - totalExpenses;

    const recentTransactions = [...incomes, ...expenses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const handleExport = async () => {
        try {
            const response = await api.get('/transactions/export', {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'transactions.xlsx');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-dark">Hello, {user?.name}!</h1>
                <button onClick={handleExport} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors w-full sm:w-auto">
                    Export to Excel
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Balance</p>
                        <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>${totalBalance.toFixed(2)}</p>
                    </div>
                    <FaWallet className="text-4xl text-primary" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Income</p>
                        <p className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
                    </div>
                    <FaArrowUp className="text-4xl text-green-500" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Expenses</p>
                        <p className="text-3xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
                    </div>
                    <FaArrowDown className="text-4xl text-red-500" />
                </div>
            </div>

            {/* Charts and Recent History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-dark">Cash Flow (Last 7 Days)</h2>
                    <LineChart incomes={incomes} expenses={expenses} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-dark">Recent History</h2>
                    <ul className="space-y-4">
                        {recentTransactions.map(t => (
                            <li key={t._id} className="flex justify-between items-center border-b pb-2">
                                <span className="font-medium">{t.title}</span>
                                <span className={`font-bold ${t.source ? 'text-green-500' : 'text-red-500'}`}>
                                    {t.source ? `+$${t.amount.toFixed(2)}` : `-$${t.amount.toFixed(2)}`}
                                </span>
                            </li>
                        ))}
                        {recentTransactions.length === 0 && <p className="text-gray-500">No recent transactions.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;