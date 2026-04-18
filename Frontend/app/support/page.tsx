"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MessageCircle, HelpCircle, Send, X, Mic, Bot, User, Clock, Loader2 } from "lucide-react";
import { fetchApi } from "../../utils/api";

type Message = {
  id: string;
  role: 'system' | 'user' | 'assistant' | 'admin';
  content: string;
  timestamp: Date;
};

export default function SupportPage() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am SureCarry AI Support. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<string>("ACTIVE");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Create chat session logic
      const res = await fetch("http://localhost:5000/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, chatId, userId: "anonymous" }),
      });

      const data = await res.json();
      
      if (data.chatId) setChatId(data.chatId);
      if (data.status) setChatStatus(data.status);

      const aiMsg: Message = { id: Date.now().toString() + 'ai', role: 'assistant', content: data.reply, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString() + 'err', role: 'assistant', content: "Sorry, I am having trouble connecting to the server.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
      handleSendMessage(speechResult);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6 font-sans">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto mb-16 mt-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 font-sans">We’re Here to Help</h1>
        <p className="text-xl text-gray-600 font-light">
          Find answers, contact our team, or get quick assistance with your booking and services through our new AI Support.
        </p>
      </section>

      {/* Support Options */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-900 mb-3">FAQs</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">Browse common questions and quick answers.</p>
          <a href="/faq" className="text-blue-600 font-medium hover:underline">View FAQs</a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition ring-2 ring-transparent hover:ring-green-500/20">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-900 mb-3">AI Live Chat</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">Chat instantly with our smart assistant.</p>
          <button
            onClick={() => setShowChat(true)}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-lg shadow-green-500/30"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
          <Mail className="w-12 h-12 text-orange-600 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Email Support</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">Send us your queries securely via email.</p>
          <a href="#contact-form" className="text-orange-600 font-medium hover:underline">Contact Us</a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
          <Phone className="w-12 h-12 text-red-600 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Phone Support</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">Call us directly for urgent, complex issues.</p>
          <p className="font-semibold text-gray-800 tracking-tight">+234 800 123 4567</p>
        </div>
      </section>

      {/* Floating Modern AI Chat Widget */}
      {showChat && (
        <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full md:w-[400px] h-[100dvh] md:h-[650px] bg-white md:rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200">
          {/* Chat Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">SureCarry Support</h3>
                <p className="text-xs text-slate-400">
                  {chatStatus === 'ESCALATED' ? 'Transferred to Agent' : 'AI Assistant responds instantly'}
                </p>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="p-2 hover:bg-white/10 rounded-full transition">
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f8f9fa] flex flex-col gap-4">
            <div className="text-center text-xs text-slate-400 my-2 bg-slate-200/50 inline-block px-3 py-1 rounded-full mx-auto">
              Today
            </div>
            
            {messages.map((msg) => {
              const isAI = msg.role === 'assistant' || msg.role === 'system' || msg.role === 'admin';
              return (
                <div key={msg.id} className={`flex ${isAI ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${isAI ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <div className={`flex items-center gap-1 mt-1 text-[10px] ${isAI ? 'text-slate-400' : 'text-blue-200'} justify-end`}>
                      <Clock className="w-3 h-3" />
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            {chatStatus === 'ESCALATED' && (
              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded mb-2 text-center border border-orange-100">
                You have been transferred to a human agent. They will reply shortly.
              </div>
            )}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-full"
            >
              <button 
                type="button" 
                onClick={handleVoice}
                className={`p-2.5 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                title="Use Voice"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent px-2 text-sm outline-none text-slate-800 placeholder:text-slate-400"
              />
              
              <button 
                type="submit" 
                disabled={!input.trim()}
                className={`p-2.5 rounded-full transition ${input.trim() ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}