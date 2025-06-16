import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your personal financial assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send request to the backend
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }), // Send input message
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);

      // If there's an error, send a fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to my backend. Make sure the backend server is running by executing 'npm run start-backend' in a new terminal.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center">
                <Bot size={24} className="me-2" />
                <h3 className="mb-0">Financial Assistant</h3>
              </div>
            </div>

            <div className="chat-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-content">{message.text}</div>
                  <div className="text-end">
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                      {formatTime(message.timestamp)}
                    </small>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message bot-message">
                  <div className="d-flex align-items-center">
                    <Loader size={18} className="me-2 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="card-footer bg-light p-3">
              <form onSubmit={handleSendMessage}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ask me about budgeting, investments, retirement planning..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary d-flex align-items-center"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Suggested Questions</h5>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => setInput("How can I start an emergency fund?")}
                  >
                    How can I start an emergency fund?
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => setInput("What's the 50/30/20 budgeting rule?")}
                  >
                    What's the 50/30/20 budgeting rule?
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => setInput("How much should I save for retirement?")}
                  >
                    How much should I save for retirement?
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => setInput("What are index funds?")}
                  >
                    What are index funds?
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    onClick={() => setInput("How can I improve my credit score?")}
                  >
                    How can I improve my credit score?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
