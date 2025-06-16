import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Plus, Trash2 } from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B8E23', '#483D8B'];

const CATEGORIES = [
  'Housing', 'Transportation', 'Food', 'Utilities', 
  'Insurance', 'Healthcare', 'Entertainment', 'Personal',
  'Education', 'Debt', 'Savings', 'Other'
];

const ExpenseCalculator: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [category, setCategory] = useState('Housing');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  
  // Save expenses to localStorage when they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid category and amount');
      return;
    }
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      category,
      amount: Number(amount),
      description: description || category,
    };
    
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDescription('');
  };
  
  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate monthly income minus expenses
  const monthlyRemaining = Number(monthlyIncome) - totalExpenses;
  
  // Calculate future savings
  const calculateFutureSavings = () => {
    if (!monthlyIncome || !interestRate || !years || monthlyRemaining <= 0) {
      return 0;
    }
    
    const rate = Number(interestRate) / 100 / 12; // Monthly interest rate
    const months = Number(years) * 12; // Total months
    
    // Future value formula for monthly deposits
    const futureValue = monthlyRemaining * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
    
    return futureValue;
  };
  
  const futureSavings = calculateFutureSavings();
  
  // Prepare data for pie chart
  const pieData = expenses.reduce((acc: { [key: string]: number }, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});
  
  const pieChartData = Object.keys(pieData).map((category) => ({
    name: category,
    value: pieData[category],
  }));
  
  // Prepare data for bar chart (by category)
  const barData = CATEGORIES.map(cat => {
    const total = expenses
      .filter(expense => expense.category === cat)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      category: cat,
      amount: total,
    };
  }).filter(item => item.amount > 0);
  
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold mb-3">Expense Calculator</h1>
          <p className="lead">
            Track your expenses, analyze your spending patterns, and calculate future savings
            based on your current financial habits.
          </p>
          <hr />
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Add Expense</h3>
              
              <form onSubmit={handleAddExpense}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select 
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount ($)</label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description (Optional)</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Rent, Groceries, etc."
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                  <Plus size={18} className="me-2" />
                  Add Expense
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Future Savings Projection</h3>
              
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label htmlFor="monthlyIncome" className="form-label">Monthly Income ($)</label>
                  <input
                    type="number"
                    id="monthlyIncome"
                    className="form-control"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="5000"
                  />
                </div>
                
                <div className="col-md-4">
                  <label htmlFor="interestRate" className="form-label">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    id="interestRate"
                    className="form-control"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="5"
                  />
                </div>
                
                <div className="col-md-4">
                  <label htmlFor="years" className="form-label">Number of Years</label>
                  <input
                    type="number"
                    id="years"
                    className="form-control"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    min="1"
                    step="1"
                    placeholder="10"
                  />
                </div>
              </div>
              
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="calculator-result">
                    <h6>Total Monthly Expenses</h6>
                    <p className="fs-4 fw-bold text-danger mb-0">
                      ${totalExpenses.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="calculator-result">
                    <h6>Monthly Remaining</h6>
                    <p className={`fs-4 fw-bold mb-0 ${monthlyRemaining >= 0 ? 'text-success' : 'text-danger'}`}>
                      ${monthlyRemaining.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="calculator-result">
                    <h6>Projected Future Savings</h6>
                    <p className="fs-4 fw-bold text-primary mb-0">
                      ${futureSavings.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              {monthlyRemaining < 0 && (
                <div className="alert alert-warning" role="alert">
                  <strong>Warning:</strong> Your expenses exceed your income. Consider reducing expenses or increasing income.
                </div>
              )}
              
              {expenses.length > 0 && (
                <div className="row mt-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <h5>Expense Distribution</h5>
                    <div style={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h5>Expenses by Category</h5>
                    <div style={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={barData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" angle={-45} textAnchor="end" height={70} />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                          <Bar dataKey="amount" fill="#0088FE" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="card-title mb-4">Expense List</h3>
              
              {expenses.length === 0 ? (
                <div className="alert alert-info">
                  You haven't added any expenses yet. Use the form above to add your first expense.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.category}</td>
                          <td>{expense.description}</td>
                          <td>${expense.amount.toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveExpense(expense.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="table-active">
                        <th colSpan={2}>Total</th>
                        <th>${totalExpenses.toFixed(2)}</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCalculator;