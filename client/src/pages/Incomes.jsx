import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FaTrash } from 'react-icons/fa';

const Incomes = () => {
    const { incomes, addIncome, deleteIncome } = useContext(GlobalContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [source, setSource] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addIncome({ title, amount: +amount, date, source });
        setTitle(''); setAmount(''); setDate(''); setSource('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-xl font-bold mb-4 text-dark">Add New Income</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded-md" />
                    <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full p-2 border rounded-md" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded-md" />
                    <input type="text" placeholder="Source (e.g., Salary)" value={source} onChange={(e) => setSource(e.target.value)} required className="w-full p-2 border rounded-md" />
                    <button type="submit" className="w-full py-2 text-white bg-primary rounded-md hover:bg-secondary">Add Income</button>
                </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-dark">Your Incomes</h2>
                {incomes.map(income => (
                    <div key={income._id} className="group bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-shadow hover:shadow-lg">
                        <div>
                            <h3 className="font-semibold text-lg">{income.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()} &bull; {income.source}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-green-500 font-bold text-lg">${income.amount.toFixed(2)}</span>
                            <button onClick={() => deleteIncome(income._id)} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Incomes;