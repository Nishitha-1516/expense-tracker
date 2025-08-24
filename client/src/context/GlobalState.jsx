import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api/axios';
import AppReducer from './AppReducer';

const initialState = {
    incomes: [],
    expenses: [],
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    error: null,
    loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        if (state.user) {
            fetchTransactions();
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [state.user]);

    const fetchTransactions = async () => {
        try {
            const [incomeRes, expenseRes] = await Promise.all([
                api.get('/transactions/incomes'),
                api.get('/transactions/expenses'),
            ]);
            dispatch({ type: 'GET_INCOMES', payload: incomeRes.data });
            dispatch({ type: 'GET_EXPENSES', payload: expenseRes.data });
        } catch (err) {
            dispatch({ type: 'TRANSACTION_ERROR', payload: err.response?.data?.message });
        }
    };

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        dispatch({ type: 'LOGIN_USER', payload: userData });
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        dispatch({ type: 'LOGOUT_USER' });
    };

    const addIncome = async (income) => {
        const res = await api.post('/transactions/incomes', income);
        dispatch({ type: 'ADD_INCOME', payload: res.data });
    };

    const deleteIncome = async (id) => {
        await api.delete(`/transactions/incomes/${id}`);
        dispatch({ type: 'DELETE_INCOME', payload: id });
    };

    const addExpense = async (expense) => {
        const res = await api.post('/transactions/expenses', expense);
        dispatch({ type: 'ADD_EXPENSE', payload: res.data });
    };

    const deleteExpense = async (id) => {
        await api.delete(`/transactions/expenses/${id}`);
        dispatch({ type: 'DELETE_EXPENSE', payload: id });
    };

    return (
        <GlobalContext.Provider value={{ ...state, login, logout, addIncome, deleteIncome, addExpense, deleteExpense }}>
            {children}
        </GlobalContext.Provider>
    );
};