
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../services/constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Replace this ID with actual YouTube video ID
  const youtubeId = 'dQw4w9WgXcQ'; 

  const expertise = [
    {
      title: 'Machine Learning',
      desc: 'Supervised & unsupervised learning, deep learning, and model optimization',
      icon: 'smart_toy',
      gradient: 'from-blue-500/20 to-purple-500/20',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Data Visualization',
      desc: 'Interactive dashboards, statistical charts, and compelling data stories',
      icon: 'bar_chart',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-500'
    },
    {
      title: 'Statistical Analysis',
      desc: 'Hypothesis testing, regression analysis, and predictive modeling',
      icon: 'query_stats',
      gradient: 'from-orange-500/20 to-rose-500/20',
      iconColor: 'text-orange-500'
    }
  ];

  return (
    <div className="flex flex-col grow">
      <div className="px-4 sm:px-6 lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
          {/* Hero Section */}
          <div className="flex flex-col gap-10 py-10 md:py-20 md:flex-row md:items-center">
            <div className="flex flex-col gap-6 flex-1 md:justify-center">
              <div className="flex flex-col gap-2 text-center md:text-left items-center md:items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit mb-4 border border-primary/20">
                  <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Available for Hire</span>
                </div>
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-7xl">
                  Turning raw data into <span className="text-primary">strategic assets.</span>
                </h1>
                <h2 className="text-slate-600 dark:text-gray-300 text-lg font-normal leading-relaxed mt-4 max-w-xl">
                  Hi, I'm Vinay K. Saw. I'm an IIT Madras Data Science student. I help businesses optimize operations through automated MIS reporting and advanced statistical analysis.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:justify-center md:justify-start gap-4 mt-6">
                <button 
                  onClick={() => navigate('/projects')} 
                  className="w-full sm:w-auto flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-blue-600 transition-all text-white text-lg font-bold shadow-xl shadow-primary/25"
                >
                  <span className="truncate">View Portfolio</span>
                  <span className="material-symbols-outlined ml-2 text-xl">arrow_right_alt</span>
                </button>
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full sm:w-auto flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-lg font-bold shadow-sm"
                >
                  <span className="truncate">Watch Reel</span>
                  <span className="material-symbols-outlined ml-2 text-xl">play_circle</span>
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0 relative">
              {/* Background Glow - Ensuring it stays behind the header fixed context */}
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full z-0 transform translate-x-10 translate-y-10 scale-75 md:scale-100"></div>
              <div className="relative z-10 w-full aspect-[4/5] max-w-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800">
                <div className="w-full h-full bg-cover bg-center grayscale-[0.2] hover:grayscale-0 transition-all duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800')"}}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent">
                  <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-white">school</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Academic</span>
                      <span className="text-sm font-bold text-white leading-tight">IIT Madras • Data Science</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Grid */}
          <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:border-primary/40 transition-all hover:-translate-y-2 shadow-sm">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                  <span className={`material-symbols-outlined ${item.iconColor} text-4xl`}>{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Key Achievements/Stats */}
          <div className="py-12 bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-100 dark:border-border-dark my-10 px-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: '1.5+', label: 'Years Exp.' },
                { val: 'Google', label: 'Certified' },
                { val: 'IIT M', label: 'B.S. Program' },
                { val: '700k+', label: 'Data Points' }
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-1 text-center items-center">
                  <p className="text-primary text-3xl md:text-4xl font-black leading-tight">{stat.val}</p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="flex flex-col gap-12 py-20">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
              <div className="flex flex-col gap-4">
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black tracking-tight">Featured Case Studies</h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl">A selection of my recent work in business intelligence and data automation.</p>
              </div>
              <Link to="/projects" className="flex items-center gap-2 text-primary font-bold text-lg hover:underline transition-all">
                View all work <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.slice(0, 2).map(project => (
                <div key={project.id} className="flex flex-col rounded-3xl overflow-hidden border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark hover:shadow-2xl transition-all group">
                  <div className="h-64 overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{backgroundImage: `url('${project.image}')`}}></div>
                    <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-black px-4 py-2 rounded-full border border-white/20 uppercase tracking-widest">{project.category}</div>
                  </div>
                  <div className="p-8 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-base leading-relaxed line-clamp-2">{project.desc}</p>
                    <Link to={`/projects/${project.id}`} className="mt-4 text-primary text-lg font-bold self-start flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Read Analysis <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Final Call to Action */}
          <div className="py-20">
            <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 px-8 py-20 text-center shadow-2xl">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] rounded-full bg-blue-600/10 blur-[100px]"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
                <h2 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">Need a data-driven perspective?</h2>
                <p className="text-white/70 text-xl font-normal leading-relaxed">
                  I'm currently open to full-time opportunities or freelance collaborations where I can apply my analytical skills.
                </p>
                <Link to="/contact" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-2xl h-16 px-10 bg-white hover:bg-slate-100 transition-all text-slate-900 text-xl font-black shadow-xl">
                  Get in touch now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-[1100] bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-2xl font-bold">close</span>
            </button>
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title="Portfolio Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
