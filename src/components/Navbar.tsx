import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003366' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <DollarSign size={24} className="me-2" />
          <span className="fw-bold">Your Personal Financial Advisor</span>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/expense-calculator">Expense Calculator</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/chatbot">Financial Assistant</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/financial-calculator">Financial Calculators</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn" style={{ backgroundColor: '#FFD700', color: '#003366' }}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;