import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, PieChart, MessageCircle, Calculator, ShieldCheck, BarChart2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Plan Your Financial Future With Confidence</h1>
              <p className="lead mb-4">
                Your Personal Financial Advisor helps you make smarter financial decisions
                with professional tools, personalized insights, and expert guidance.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-lg btn-accent">Get Started</Link>
                <a href="#features" className="btn btn-lg btn-outline-light">Learn More</a>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg" 
                alt="Financial Planning" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How We Can Help You</h2>
            <p className="lead text-muted">
              Comprehensive tools and features designed to empower your financial decisions
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <TrendingUp size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">Expense Tracking</h4>
                  <p className="card-text">
                    Track your expenses, identify spending patterns, and calculate potential savings
                    with our intuitive expense calculator.
                  </p>
                  <Link to="/expense-calculator" className="btn btn-outline-primary mt-3">Try It</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <MessageCircle size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">AI Financial Assistant</h4>
                  <p className="card-text">
                    Get personalized financial advice and answers to your questions from our
                    intelligent chatbot powered by Gemini AI.
                  </p>
                  <Link to="/chatbot" className="btn btn-outline-primary mt-3">Chat Now</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Calculator size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">Financial Calculators</h4>
                  <p className="card-text">
                    Plan for retirement, calculate loan payments, and analyze investments
                    with our comprehensive calculator suite.
                  </p>
                  <Link to="/financial-calculator" className="btn btn-outline-primary mt-3">Calculate</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <ShieldCheck size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">Secure & Private</h4>
                  <p className="card-text">
                    Your financial data is protected with industry-standard security.
                    We prioritize your privacy and data protection.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <PieChart size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">Budget Planning</h4>
                  <p className="card-text">
                    Create and manage budgets based on your income and expenses.
                    Set financial goals and track your progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <BarChart2 size={28} className="text-primary" />
                  </div>
                  <h4 className="card-title">Financial Reports</h4>
                  <p className="card-text">
                    Get detailed reports and visualizations of your financial data
                    to make informed decisions about your money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Users Say</h2>
            <p className="lead text-muted">Real stories from people who transformed their finances</p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex mb-3">
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning">★</span>
                  </div>
                  <p className="card-text mb-3">
                    "This platform helped me pay off $30,000 in debt in just 18 months. The expense
                    calculator and budgeting tools were game-changers for me."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>JD</div>
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">Marketing Executive</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex mb-3">
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning">★</span>
                  </div>
                  <p className="card-text mb-3">
                    "The retirement calculator gave me the clarity I needed. Now I know exactly
                    how much to save each month to retire comfortably at 55."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>JS</div>
                    <div>
                      <h6 className="mb-0">Jane Smith</h6>
                      <small className="text-muted">Software Engineer</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex mb-3">
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning me-1">★</span>
                    <span className="text-warning">★</span>
                  </div>
                  <p className="card-text mb-3">
                    "I love chatting with the AI assistant. It's like having a financial advisor
                    available 24/7. The loan calculator saved me thousands on my mortgage."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>RJ</div>
                    <div>
                      <h6 className="mb-0">Robert Johnson</h6>
                      <small className="text-muted">Small Business Owner</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #003366, #0066cc)' }}>
        <div className="container text-center text-white">
          <h2 className="fw-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="lead mb-4">
            Join thousands of users who have transformed their financial future with our platform.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-lg btn-accent">Create Free Account</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;