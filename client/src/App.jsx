import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalContext, GlobalProvider } from './context/GlobalState';
import Dashboard from './pages/Dashboard';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/layout/Layout';
import Analytics from './pages/Analytics';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(GlobalContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/incomes" element={<PrivateRoute><Layout><Incomes /></Layout></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute><Layout><Expenses /></Layout></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Layout><Analytics /></Layout></PrivateRoute>} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;