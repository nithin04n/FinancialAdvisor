import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExpenseCalculator from './pages/ExpenseCalculator';
import ChatBot from './pages/ChatBot';
import FinancialCalculator from './pages/FinancialCalculator';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/expense-calculator" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ExpenseCalculator />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chatbot" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChatBot />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/financial-calculator" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <FinancialCalculator />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;