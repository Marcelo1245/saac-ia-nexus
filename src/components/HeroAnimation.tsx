
import React from 'react';

const HeroAnimation: React.FC = () => {
  return (
    <div className="relative h-[500px] w-full animate-fade-in">
      {/* Central Orb - Represents AI Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-blue opacity-80 animate-pulse-blue flex items-center justify-center z-10">
        <div className="w-28 h-28 rounded-full bg-saac-dark flex items-center justify-center">
          <span className="text-white font-bold text-xl">SAAC.IA</span>
        </div>
      </div>
      
      {/* Orbiting Elements */}
      {/* First orbit */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-saac-blue/30 animate-spin" style={{ animationDuration: '15s' }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-saac-blue/80 flex items-center justify-center neon-outline animate-float">
          <span className="text-white text-xs font-medium">Captura</span>
        </div>
      </div>
      
      {/* Second orbit */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-saac-blue/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-lg bg-saac-blue/80 flex items-center justify-center neon-outline animate-float" style={{ animationDelay: '1s' }}>
          <span className="text-white text-xs font-medium">Qualifica</span>
        </div>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-lg bg-saac-neon/80 flex items-center justify-center neon-outline animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="text-white text-xs font-medium">Contato</span>
        </div>
      </div>
      
      {/* Third orbit */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-saac-blue/10 animate-spin" style={{ animationDuration: '35s' }}>
        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-lg bg-saac-neon/80 flex items-center justify-center neon-outline animate-float" style={{ animationDelay: '1.5s' }}>
          <span className="text-white text-xs font-medium">Agenda</span>
        </div>
      </div>
      
      {/* Connecting lines that follow animation */}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00A8FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E0FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g className="animate-pulse-blue" style={{ animationDuration: '4s' }}>
          <path d="M250,250 L300,125 L400,100 L500,250" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" />
          <path d="M250,250 L400,400 L500,350" fill="none" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" />
        </g>
      </svg>
      
      {/* Glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-saac-blue animate-ping"></div>
      <div className="absolute top-3/4 left-2/3 w-2 h-2 rounded-full bg-saac-neon animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-3/4 w-2 h-2 rounded-full bg-saac-blue animate-ping" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default HeroAnimation;
