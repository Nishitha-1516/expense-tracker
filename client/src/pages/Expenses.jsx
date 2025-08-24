import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import api from '../api/axios';
import { FaTrash } from 'react-icons/fa';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const { addExpense, deleteExpense: deleteExpenseFromContext } = useContext(GlobalContext);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sort, setSort] = useState('date_desc');
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    const fetchExpenses = async () => {
        try {
            const params = new URLSearchParams({ startDate, endDate, sort }).toString();
            const res = await api.get(`/transactions/expenses?${params}`);
            setExpenses(res.data);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [startDate, endDate, sort]);
    
    const handleAddExpense = async (e) => {
        e.preventDefault();
        await addExpense({ title, amount: +amount, date, category });
        fetchExpenses(); 
        setTitle(''); setAmount(''); setDate(''); setCategory('');
    };

    const handleDeleteExpense = async (id) => {
        await deleteExpenseFromContext(id);
        fetchExpenses();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 text-dark">Add New Expense</h2>
                    <form onSubmit={handleAddExpense} className="space-y-4">
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded-md"/>
                        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full p-2 border rounded-md"/>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded-md"/>
                        <input type="text" placeholder="Category (e.g., Food, Bills)" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border rounded-md"/>
                        <button type="submit" className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600">Add Expense</button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 text-dark">Filter & Sort</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Start Date</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">End Date</label>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Sort By</label>
                            <select value={sort} onChange={e => setSort(e.target.value)} className="w-full p-2 border rounded-md">
                                <option value="date_desc">Date (Newest First)</option>
                                <option value="date_asc">Date (Oldest First)</option>
                                <option value="amount_desc">Amount (Highest First)</option>
                                <option value="amount_asc">Amount (Lowest First)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-dark">Your Expenses</h2>
                {expenses.map(expense => (
                    <div key={expense._id} className="group bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg">
                        <div>
                            <h3 className="font-semibold text-lg">{expense.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()} &bull; {expense.category}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-red-500 font-bold text-lg">-${expense.amount.toFixed(2)}</span>
                            <button onClick={() => handleDeleteExpense(expense._id)} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {expenses.length === 0 && <p className="text-gray-500">No expenses match your filters.</p>}
            </div>
        </div>
    );
};

export default Expenses;