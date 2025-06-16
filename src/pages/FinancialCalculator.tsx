import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { Calculator, Briefcase, Home, PiggyBank } from 'lucide-react';

const FinancialCalculator: React.FC = () => {
  // Retirement Calculator States
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [annualContribution, setAnnualContribution] = useState('6000');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [retirementResults, setRetirementResults] = useState<any>(null);
  
  // Loan Calculator States
  const [loanAmount, setLoanAmount] = useState('250000');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanResults, setLoanResults] = useState<any>(null);
  
  // Investment Calculator States
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [investmentYears, setInvestmentYears] = useState('20');
  const [annualReturnRate, setAnnualReturnRate] = useState('8');
  const [investmentResults, setInvestmentResults] = useState<any>(null);
  
  // Active calculator tab
  const [activeCalc, setActiveCalc] = useState('retirement');
  
  // Calculate retirement savings
  const calculateRetirement = (e: React.FormEvent) => {
    e.preventDefault();
    
    const current = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const initialAmount = parseFloat(currentSavings);
    const yearlyContribution = parseFloat(annualContribution);
    const returnRate = parseFloat(expectedReturn) / 100;
    
    const years = retirement - current;
    
    if (years <= 0) {
      alert('Retirement age must be greater than current age');
      return;
    }
    
    let data = [];
    let totalContributions = initialAmount;
    let balance = initialAmount;
    
    for (let i = 0; i <= years; i++) {
      if (i > 0) {
        balance = balance * (1 + returnRate) + yearlyContribution;
        totalContributions += yearlyContribution;
      }
      
      data.push({
        age: current + i,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        growth: Math.round(balance - totalContributions)
      });
    }
    
    setRetirementResults({
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(balance - totalContributions),
      years,
      data
    });
  };
  
  // Calculate loan payments
  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const principal = parseFloat(loanAmount);
    const years = parseInt(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = years * 12;
    
    // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyPayment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    
    let data = [];
    let remainingBalance = principal;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let yearlyTotalPayment = 0;
    
    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      yearlyTotalPayment += monthlyPayment;
      
      // Add yearly data points
      if (month % 12 === 0 || month === months) {
        data.push({
          year: Math.ceil(month / 12),
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          remainingBalance: Math.round(remainingBalance < 0 ? 0 : remainingBalance)
        });
        
        yearlyPrincipal = 0;
        yearlyInterest = 0;
        yearlyTotalPayment = 0;
      }
    }
    
    setLoanResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      data
    });
  };
  
  // Calculate investment growth
  const calculateInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution);
    const years = parseInt(investmentYears);
    const returnRate = parseFloat(annualReturnRate) / 100 / 12;
    const months = years * 12;
    
    let data = [];
    let balance = initial;
    let totalContributions = initial;
    
    for (let i = 0; i <= months; i++) {
      // Add data points yearly
      if (i % 12 === 0 || i === months) {
        data.push({
          year: Math.floor(i / 12),
          balance: Math.round(balance),
          contributions: Math.round(totalContributions),
          growth: Math.round(balance - totalContributions)
        });
      }
      
      if (i < months) {
        balance = balance * (1 + returnRate) + monthly;
        totalContributions += monthly;
      }
    }
    
    setInvestmentResults({
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(balance - totalContributions),
      years,
      data
    });
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold mb-3">Financial Calculators</h1>
          <p className="lead">
            Plan your financial future with our suite of financial calculators.
            Estimate retirement savings, calculate loan payments, and project investment growth.
          </p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 mb-4">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeCalc === 'retirement' ? 'active' : ''}`}
                onClick={() => setActiveCalc('retirement')}
                style={{ backgroundColor: activeCalc === 'retirement' ? '#003366' : '' }}
              >
                <PiggyBank size={18} className="me-2" />
                Retirement Calculator
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeCalc === 'loan' ? 'active' : ''}`}
                onClick={() => setActiveCalc('loan')}
                style={{ backgroundColor: activeCalc === 'loan' ? '#003366' : '' }}
              >
                <Home size={18} className="me-2" />
                Loan Calculator
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeCalc === 'investment' ? 'active' : ''}`}
                onClick={() => setActiveCalc('investment')}
                style={{ backgroundColor: activeCalc === 'investment' ? '#003366' : '' }}
              >
                <Briefcase size={18} className="me-2" />
                Investment Calculator
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Retirement Calculator */}
      <div className={`calculator-section ${activeCalc === 'retirement' ? '' : 'd-none'}`}>
        <div className="row mb-4">
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  <PiggyBank size={20} className="me-2" />
                  Retirement Calculator
                </h3>
                
                <form onSubmit={calculateRetirement}>
                  <div className="mb-3">
                    <label htmlFor="currentAge" className="form-label">Current Age</label>
                    <input
                      type="number"
                      id="currentAge"
                      className="form-control"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      min="18"
                      max="80"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="retirementAge" className="form-label">Retirement Age</label>
                    <input
                      type="number"
                      id="retirementAge"
                      className="form-control"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(e.target.value)}
                      min="40"
                      max="100"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="currentSavings" className="form-label">Current Savings ($)</label>
                    <input
                      type="number"
                      id="currentSavings"
                      className="form-control"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="annualContribution" className="form-label">Annual Contribution ($)</label>
                    <input
                      type="number"
                      id="annualContribution"
                      className="form-control"
                      value={annualContribution}
                      onChange={(e) => setAnnualContribution(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="expectedReturn" className="form-label">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      id="expectedReturn"
                      className="form-control"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)}
                      min="1"
                      max="20"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100">
                    <Calculator size={18} className="me-2" />
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-7">
            {retirementResults ? (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Retirement Projection</h3>
                  
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Estimated Balance at Retirement</h6>
                        <p className="fs-4 fw-bold text-primary mb-0">
                          {formatCurrency(retirementResults.finalBalance)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Total Contributions</h6>
                        <p className="fs-4 fw-bold text-success mb-0">
                          {formatCurrency(retirementResults.totalContributions)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Investment Growth</h6>
                        <p className="fs-4 fw-bold text-info mb-0">
                          {formatCurrency(retirementResults.totalGrowth)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={retirementResults.data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                        <YAxis 
                          tickFormatter={(value) => `$${(value / 1000)}k`}
                          label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                          labelFormatter={(label) => `Age: ${label}`}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Contributions" />
                        <Area type="monotone" dataKey="growth" stackId="1" stroke="#8884d8" fill="#8884d8" name="Growth" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">
                  <PiggyBank size={60} className="text-primary mb-3" />
                  <h4>Retirement Projection</h4>
                  <p className="text-muted mb-0">
                    Fill out the form and click Calculate to see your projected retirement savings.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Loan Calculator */}
      <div className={`calculator-section ${activeCalc === 'loan' ? '' : 'd-none'}`}>
        <div className="row mb-4">
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  <Home size={20} className="me-2" />
                  Loan Calculator
                </h3>
                
                <form onSubmit={calculateLoan}>
                  <div className="mb-3">
                    <label htmlFor="loanAmount" className="form-label">Loan Amount ($)</label>
                    <input
                      type="number"
                      id="loanAmount"
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      min="1000"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="loanTerm" className="form-label">Loan Term (years)</label>
                    <input
                      type="number"
                      id="loanTerm"
                      className="form-control"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      min="1"
                      max="50"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
                    <input
                      type="number"
                      id="interestRate"
                      className="form-control"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      min="0.1"
                      max="30"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100">
                    <Calculator size={18} className="me-2" />
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-7">
            {loanResults ? (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Loan Payment Summary</h3>
                  
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Monthly Payment</h6>
                        <p className="fs-4 fw-bold text-primary mb-0">
                          ${loanResults.monthlyPayment}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Total Payment</h6>
                        <p className="fs-4 fw-bold text-danger mb-0">
                          ${loanResults.totalPayment}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Total Interest</h6>
                        <p className="fs-4 fw-bold text-warning mb-0">
                          ${loanResults.totalInterest}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={loanResults.data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="principal" name="Principal Payment" fill="#0088FE" />
                        <Bar dataKey="interest" name="Interest Payment" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">
                  <Home size={60} className="text-primary mb-3" />
                  <h4>Loan Payment Summary</h4>
                  <p className="text-muted mb-0">
                    Fill out the form and click Calculate to see your loan payment details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Investment Calculator */}
      <div className={`calculator-section ${activeCalc === 'investment' ? '' : 'd-none'}`}>
        <div className="row mb-4">
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h3 className="card-title mb-4">
                  <Briefcase size={20} className="me-2" />
                  Investment Calculator
                </h3>
                
                <form onSubmit={calculateInvestment}>
                  <div className="mb-3">
                    <label htmlFor="initialInvestment" className="form-label">Initial Investment ($)</label>
                    <input
                      type="number"
                      id="initialInvestment"
                      className="form-control"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="monthlyContribution" className="form-label">Monthly Contribution ($)</label>
                    <input
                      type="number"
                      id="monthlyContribution"
                      className="form-control"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="investmentYears" className="form-label">Time Period (years)</label>
                    <input
                      type="number"
                      id="investmentYears"
                      className="form-control"
                      value={investmentYears}
                      onChange={(e) => setInvestmentYears(e.target.value)}
                      min="1"
                      max="50"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="annualReturnRate" className="form-label">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      id="annualReturnRate"
                      className="form-control"
                      value={annualReturnRate}
                      onChange={(e) => setAnnualReturnRate(e.target.value)}
                      min="1"
                      max="20"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100">
                    <Calculator size={18} className="me-2" />
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-7">
            {investmentResults ? (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Investment Growth Projection</h3>
                  
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Future Value</h6>
                        <p className="fs-4 fw-bold text-primary mb-0">
                          {formatCurrency(investmentResults.finalBalance)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Total Contribution</h6>
                        <p className="fs-4 fw-bold text-success mb-0">
                          {formatCurrency(investmentResults.totalContributions)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="calculator-result">
                        <h6>Total Growth</h6>
                        <p className="fs-4 fw-bold text-info mb-0">
                          {formatCurrency(investmentResults.totalGrowth)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={investmentResults.data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                        <YAxis 
                          tickFormatter={(value) => `$${(value / 1000)}k`}
                          label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="balance" stroke="#0088FE" name="Total Balance" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="contributions" stroke="#82ca9d" name="Total Contributions" />
                        <Line type="monotone" dataKey="growth" stroke="#8884d8" name="Investment Growth" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">
                  <Briefcase size={60} className="text-primary mb-3" />
                  <h4>Investment Growth Projection</h4>
                  <p className="text-muted mb-0">
                    Fill out the form and click Calculate to see your investment growth projections.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;