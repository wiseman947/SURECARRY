"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "../../../utils/api";
import { MessageSquare, User, Bot, Clock, AlertCircle, CheckCircle, Send } from "lucide-react";

type Chat = {
  id: string;
  userId: string | null;
  status: string;
  updatedAt: string;
  messages: any[];
};

type Message = {
  id: string;
  role: string;
  content: string;
  createdAt: string;
};

export default function LiveChatAdmin() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);

  // Poll for active chats
  const loadChats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chat/active");
      const data = await res.json();
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load chats:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectChat = async (id: string) => {
    setSelectedChat(id);
    loadMessages(id);
  };

  const loadMessages = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/chat/${id}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const handleAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${selectedChat}/admin-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, data]);
      setReplyText("");
      loadChats(); // Refresh status
    } catch (error) {
      console.error("Failed to send admin reply", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden m-6 font-sans text-slate-800">
      
      {/* Left Panel: Chat List */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="text-blue-600" /> Live Support
          </h2>
          <p className="text-xs text-slate-500 mt-1">Monitor and override AI conversations</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading chats...</div>
          ) : chats.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No active chats</div>
          ) : (
            chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => selectChat(chat.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition flex items-start gap-3 ${selectedChat === chat.id ? 'bg-blue-50 border-blue-100' : 'hover:bg-white'}`}
              >
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${chat.status === 'ESCALATED' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-sm truncate">{chat.userId || "Anonymous User"}</h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {chat.messages.length > 0 ? chat.messages[0].content : "No messages"}
                  </p>
                  {chat.status === 'ESCALATED' && (
                    <span className="inline-flex mt-2 items-center gap-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" /> Requires Human
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Panel: Conversation View */}
      <div className="w-2/3 flex flex-col bg-white">
        {!selectedChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MessageSquare className="w-16 h-16 mb-4 text-slate-200" />
            <p>Select a chat from the left to view the conversation</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
              <div>
                <h2 className="font-bold">Chat #{selectedChat.substring(0, 8)}...</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  Status: 
                  {chats.find(c => c.id === selectedChat)?.status === 'ESCALATED' ? (
                    <span className="text-orange-600 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Escalated (AI Paused)</span>
                  ) : (
                    <span className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Active (AI Handling)</span>
                  )}
                </p>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded transition">
                Close Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa] flex flex-col gap-4">
              {messages.map(msg => {
                const isAdmin = msg.role === 'admin';
                const isAssistant = msg.role === 'assistant';
                const isSystem = msg.role === 'system';
                
                return (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm flex flex-col gap-1 ${
                      msg.role === 'user' ? 'bg-white border text-slate-800 border-slate-200 rounded-tl-none' 
                      : isAdmin ? 'bg-blue-600 text-white rounded-tr-none'
                      : isAssistant ? 'bg-slate-800 text-white rounded-tr-none'
                      : 'bg-orange-100 text-orange-800 border border-orange-200 text-xs w-full text-center italic rounded-xl mx-auto'
                    }`}>
                      {!isSystem && (
                        <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                          {msg.role === 'user' && <User className="w-3 h-3" />}
                          {isAssistant && <Bot className="w-3 h-3" />}
                          {isAdmin && <span className="font-bold text-[10px] uppercase tracking-widest bg-white/20 px-1.5 py-0.5 rounded">Admin</span>}
                        </div>
                      )}
                      
                      <p className={isSystem ? 'text-center w-full' : 'whitespace-pre-wrap text-sm leading-relaxed'}>
                        {msg.content}
                      </p>
                      
                      {!isSystem && (
                        <div className={`text-[10px] self-end mt-1 ${msg.role === 'user' ? 'text-slate-400' : 'opacity-60'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleAdminReply} className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message to the user... (This will pause the AI)"
                  className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button 
                  type="submit" 
                  disabled={!replyText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md disabled:bg-blue-300 disabled:shadow-none flex items-center gap-2"
                >
                  Send <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
