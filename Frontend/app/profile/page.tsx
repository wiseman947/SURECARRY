import React from 'react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-slate-400 mb-8">Manage your account settings and preferences.</p>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-1">Personal Info</h3>
            <p className="text-lg">Wisdom Okon</p>
            <p className="text-slate-400">wisdom.go.wo@gmail.com</p>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-lg font-semibold shadow-lg shadow-blue-900/20">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
