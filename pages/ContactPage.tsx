
import React, { useState } from 'react';
import { portfolio } from '../data/portfolio';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { profile } = portfolio;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="flex-grow flex justify-center py-8 px-4 sm:px-6 lg:px-12">
      <div className="layout-content-container flex flex-col w-full max-w-[1100px] gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-slate-900 dark:text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">Get In Touch</h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed">
                Looking for a dedicated Data Analyst with proficiency in MIS and ERP management? Feel free to reach out via email or phone.
              </p>
            </div>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-colors group shadow-sm">
                <div className="flex items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-background-dark text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Email</span>
                  <a href={`mailto:${profile.email}`} className="text-slate-900 dark:text-white text-base font-semibold hover:text-primary transition-colors">{profile.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-colors group shadow-sm">
                <div className="flex items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-background-dark text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Phone</span>
                  <span className="text-slate-900 dark:text-white text-base font-semibold">{profile.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-colors group shadow-sm">
                <div className="flex items-center justify-center size-10 rounded-lg bg-slate-50 dark:bg-background-dark text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Location</span>
                  <span className="text-slate-900 dark:text-white text-base font-semibold">{profile.location}</span>
                  <span className="text-slate-500 text-xs mt-1">{profile.relocationInfo}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1f27] rounded-2xl border border-slate-200 dark:border-border-dark p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Message Sent!</h3>
                <p className="text-slate-500">Vinay will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline mt-4">New Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">Hire Me</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col flex-1">
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-medium pb-2">Name</p>
                    <input required className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 transition-all" placeholder="John Doe" type="text"/>
                  </label>
                  <label className="flex flex-col flex-1">
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-medium pb-2">Email</p>
                    <input required className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 transition-all" placeholder="john@example.com" type="email"/>
                  </label>
                </div>
                <label className="flex flex-col w-full">
                  <p className="text-slate-700 dark:text-slate-200 text-sm font-medium pb-2">Inquiry</p>
                  <textarea required className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent min-h-[160px] p-4 transition-all" placeholder="How can I help you today?"></textarea>
                </label>
                <button className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-lg shadow-primary/20" type="submit">
                  Send Inquiry
                  <span className="material-symbols-outlined ml-2 text-sm">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
