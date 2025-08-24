import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import DoughnutChart from '../components/charts/DoughnutChart';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/transactions/analytics');
                setAnalyticsData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return <p>Loading analytics...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-dark mb-6">Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-dark">Expense Breakdown by Category</h2>
                    {analyticsData && analyticsData.expenseByCategory.length > 0 ? (
                        <DoughnutChart data={analyticsData.expenseByCategory} />
                    ) : (
                        <p>No expense data available to display.</p>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-dark">Category Totals</h2>
                    <ul>
                        {analyticsData && analyticsData.expenseByCategory.map(item => (
                            <li key={item._id} className="flex justify-between items-center border-b py-2">
                                <span className="font-medium">{item._id}</span>
                                <span className="font-bold text-red-500">-${item.totalAmount.toFixed(2)}</span>
                            </li>
                        ))}
                        {(!analyticsData || analyticsData.expenseByCategory.length === 0) && (
                            <p className="text-gray-500">Add an expense to see totals.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Analytics;