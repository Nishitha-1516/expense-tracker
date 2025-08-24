export default (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, user: action.payload, loading: false };
        case 'LOGOUT_USER':
            return { ...state, user: null, incomes: [], expenses: [] };
        case 'GET_INCOMES':
            return { ...state, incomes: action.payload, loading: false };
        case 'ADD_INCOME':
            return { ...state, incomes: [action.payload, ...state.incomes] };
        case 'DELETE_INCOME':
            return { ...state, incomes: state.incomes.filter(inc => inc._id !== action.payload) };
        case 'GET_EXPENSES':
            return { ...state, expenses: action.payload, loading: false };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [action.payload, ...state.expenses] };
        case 'DELETE_EXPENSE':
            return { ...state, expenses: state.expenses.filter(exp => exp._id !== action.payload) };
        case 'TRANSACTION_ERROR':
            return { ...state, error: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};