import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <DollarSign size={28} className="me-2" />
              <h5 className="mb-0 fw-bold">Your Personal Financial Advisor</h5>
            </div>
            <p className="mb-4">
              Your trusted partner in financial planning and wealth management.
              We're dedicated to helping you achieve financial freedom through
              smart planning and informed decisions.
            </p>
            <div className="d-flex">
              <a href="#" className="text-white me-3"><Facebook size={20} /></a>
              <a href="#" className="text-white me-3"><Twitter size={20} /></a>
              <a href="#" className="text-white me-3"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-accent mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/expense-calculator" className="text-white text-decoration-none">Expense Calculator</Link></li>
              <li className="mb-2"><Link to="/chatbot" className="text-white text-decoration-none">Financial Assistant</Link></li>
              <li className="mb-2"><Link to="/financial-calculator" className="text-white text-decoration-none">Financial Calculators</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-accent mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Financial Tips</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Retirement Guide</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Investment Strategies</a></li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h5 className="text-accent mb-3">Contact Us</h5>
            <div className="d-flex align-items-center mb-3">
              <Mail size={18} className="me-2" />
              <span>contact@yourfinancialadvisor.com</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <Phone size={18} className="me-2" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-light" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">© {new Date().getFullYear()} Your Personal Financial Advisor. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li className="list-inline-item mx-3">|</li>
              <li className="list-inline-item"><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;