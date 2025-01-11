import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User } from 'lucide-react';

const ChatbotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <circle cx="100" cy="100" r="90" fill="currentColor" />
    <rect x="60" y="45" width="80" height="90" rx="15" fill="white" />
    <circle cx="85" cy="85" r="8" fill="currentColor" />
    <circle cx="115" cy="85" r="8" fill="currentColor" />
    <circle cx="100" cy="35" r="6" fill="white" />
    <rect x="98" y="35" width="4" height="15" fill="white" />
    <path d="M80 105 Q100 125 120 105" stroke="currentColor" strokeWidth="6" fill="none" />
    <path d="M140 110 L160 140 L130 140 Z" fill="white" />
    <circle cx="75" cy="65" r="3" fill="currentColor" />
    <circle cx="125" cy="65" r="3" fill="currentColor" />
    <line x1="50" y1="95" x2="40" y2="95" stroke="white" strokeWidth="3" />
    <line x1="150" y1="95" x2="160" y2="95" stroke="white" strokeWidth="3" />
  </svg>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const quickResponses = [
    {
      category: "Questions Générales",
      items: [
        "Comment puis-je vous aider ?",
        "Quels sont vos services ?",
        "J'ai besoin d'assistance",
        "Contactez le support",
      ],
    },
    {
      category: "Support",
      items: [
        "Problème technique",
        "Question sur un produit",
        "Suivi de commande",
        "Autre demande",
      ],
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message) => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        text: "Je vous remercie pour votre message. Comment puis-je vous aider davantage ?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#168187] p-2 rounded-full shadow-lg hover:bg-[#147177] transition-all w-14 h-14 flex items-center justify-center"
      >
        <div className="w-10 h-10">
          <ChatbotIcon />
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 mb-4 flex flex-col h-[581px] overflow-hidden">
          {/* Header */}
          <div className="bg-[#168187] p-2 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <ChatbotIcon />
              </div>
              <div>
                <h3 className="font-medium text-white">Assistant virtuel</h3>
                <span className="text-xs opacity-75 text-white">En ligne</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-[#147177] p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 my-8">
                <div className="w-16 h-16 mx-auto mb-4 text-[#168187]">
                  <ChatbotIcon />
                </div>
                <p className="text-lg font-medium">Bienvenue !</p>
                <p className="text-sm">Comment puis-je vous aider aujourd'hui ?</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-end max-w-[80%] space-x-2 ${
                    msg.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isUser ? 'bg-gray-200' : 'bg-[#168187]'
                    }`}
                  >
                    {msg.isUser ? (
                      <div className="w-5 h-5 text-gray-600"><User size={20} color="blue" strokeWidth={2} /></div>
                    ) : (
                      <div className="w-5 h-5 ">
                        <ChatbotIcon />
                      </div>
                    )}
                  </div>
                  <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isUser ? 'bg-[#168187] text-white' : 'bg-gray-100 text-black'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#168187] flex items-center justify-center">
                  <div className="w-5 h-5">
                    <ChatbotIcon />
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length === 0 && (
            <div className="p-4 space-y-4">
              {quickResponses.map((category, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-medium text-gray-700">{category.category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.items.map((response, responseIdx) => (
                      <button
                        key={responseIdx}
                        onClick={() => handleSend(response)}
                        className="p-2 text-left text-sm text-[#168187] hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 bg-gray-100 rounded-lg p-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="w-full bg-transparent resize-none focus:outline-none max-h-32"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                />
              </div>
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className={`p-3 rounded-lg text-white transition-colors ${
                  inputValue.trim()
                    ? 'bg-[#168187] hover:bg-[#147177]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
