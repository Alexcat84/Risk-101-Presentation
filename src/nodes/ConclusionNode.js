import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const ConclusionNode = ({ data }) => {
  const [activePoint, setActivePoint] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const containerRef = useRef(null);
  
  // Trigger animations on component mount
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setShowInsight(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle particle creation on click
  const createParticles = (e) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 10 + 5;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 5 + 3;
      const hue = Math.random() * 60 - 30 + 200; // Teal/blue hues
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsla(${hue}, 100%, 70%, 0.8)`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.zIndex = '5';
      
      container.appendChild(particle);
      
      // Animate the particle
      setTimeout(() => {
        particle.style.transition = 'all 1s ease-out';
        particle.style.transform = `translate(${Math.cos(angle) * velocity * 30}px, ${Math.sin(angle) * velocity * 30}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove the particle after animation
      setTimeout(() => {
        container.removeChild(particle);
      }, 1000);
    }
  };

  // Default conclusion points if none provided
  const defaultConclusions = [
    {
      text: 'The attempted assassination exposed critical security gaps but also demonstrated effective crisis response',
      icon: '🛡️',
      color: 'from-blue-400 to-blue-600',
      visual: (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
          <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-20 animate-pulse"></div>
          <div className="absolute left-1/2 top-0 w-1 h-20 bg-blue-300 transform -translate-x-1/2 animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute left-0 top-1/2 w-20 h-1 bg-blue-300 transform -translate-y-1/2 animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
      )
    },
    {
      text: 'Political events require all-encompassing risk management beyond the immediate security perimeter',
      icon: '🔍',
      color: 'from-indigo-400 to-indigo-600',
      visual: (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 border-4 border-dashed border-indigo-300 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
          <div className="absolute left-1/2 top-1/2 w-12 h-12 border-4 border-indigo-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
      )
    },
    {
      text: 'Interagency coordination is essential for effective security operations',
      icon: '🤝',
      color: 'from-purple-400 to-purple-600',
      visual: (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-4 h-4 bg-purple-500 rounded-full"
              style={{
                transform: `rotate(${i * 90}deg) translateX(16px)`,
                animation: 'orbit 3s linear infinite',
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
          <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
        </div>
      )
    },
    {
      text: 'Proactive risk identification and mitigation is vital for protecting public figures',
      icon: '⚠️',
      color: 'from-pink-400 to-pink-600',
      visual: (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-pink-500 animate-bounce"></div>
          <div className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full border-2 border-pink-300 transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-75" style={{animationDuration: '2s'}}></div>
        </div>
      )
    },
    {
      text: 'Security protocols must continually evolve to address changing threat landscapes',
      icon: '🔄',
      color: 'from-rose-400 to-rose-600',
      visual: (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 border-4 border-t-rose-600 border-r-rose-400 border-b-rose-600 border-l-rose-400 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
          <div className="absolute left-1/2 top-1/2 w-8 h-8 border-4 border-t-rose-300 border-r-transparent border-b-rose-300 border-l-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{animationDuration: '1.5s'}}></div>
        </div>
      )
    }
  ];
  
  const conclusions = data.conclusions 
    ? data.conclusions.map((text, i) => ({
        text,
        icon: defaultConclusions[i]?.icon || '✓',
        color: defaultConclusions[i]?.color || 'from-blue-400 to-blue-600',
        visual: defaultConclusions[i]?.visual
      }))
    : defaultConclusions;
  
  return (
    <div 
      ref={containerRef}
      className="p-6 rounded-xl shadow-xl bg-gradient-to-br from-teal-500 to-teal-700 w-[900px] h-[600px] relative overflow-hidden"
      onClick={createParticles}
    >
      <Handle type="target" position={Position.Top} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-10 bg-white opacity-10 origin-left"
            style={{
              transform: `translateX(-50%) translateY(-50%) rotate(${i * 45}deg)`,
              animation: 'pulse 5s infinite ease-in-out',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className={`text-center mb-6 transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-5xl font-bold text-white text-shadow-lg">Conclusion</h2>
          <div className="w-40 h-1 bg-white opacity-70 mx-auto mt-3 animate-pulse"></div>
        </div>
        
        <div className="relative grid grid-cols-2 gap-4 mb-4">
          {conclusions.map((point, index) => (
            <div 
              key={index} 
              className={`relative bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl p-4 overflow-hidden transition-all duration-500 transform cursor-pointer hover:shadow-glow ${
                activePoint === index 
                  ? 'scale-105 bg-opacity-20 z-10 border-opacity-40' 
                  : 'hover:bg-opacity-15'
              } ${animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ 
                transitionDelay: `${index * 150 + 300}ms`,
                boxShadow: activePoint === index ? `0 0 15px 2px rgba(255,255,255,0.3)` : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActivePoint(activePoint === index ? null : index);
              }}
            >
              {/* Visual animation in background */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${activePoint === index ? 'opacity-30' : 'opacity-10'}`}>
                {point.visual}
              </div>
              
              <div className="flex items-start relative z-10">
                <div className={`flex-shrink-0 h-12 w-12 bg-gradient-to-br ${point.color} rounded-full flex items-center justify-center mr-3 shadow-lg transition-transform duration-300 ${activePoint === index ? 'transform scale-110' : ''}`}>
                  <span className="text-white text-xl">{point.icon}</span>
                </div>
                <div className="pt-1 flex-1">
                  <p className={`text-white text-md leading-tight transition-all duration-300 ${activePoint === index ? 'font-semibold' : ''}`}>
                    {point.text}
                  </p>
                </div>
              </div>
              
              {/* Expanding detail section */}
              <div className={`mt-3 overflow-hidden transition-all duration-500 ${
                activePoint === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-15 ml-2 border-l-2 border-white border-opacity-30">
                  <p className="text-white text-opacity-90 text-sm pl-3 animate-fadeIn">
                    {index === 0 && "Immediate response after the shooting demonstrated effective crisis management protocols."}
                    {index === 1 && "Security planning must include adjacent areas beyond event boundaries."}
                    {index === 2 && "Clear communication channels between agencies are critical for rapid response."}
                    {index === 3 && "Anticipating threats before they materialize is key to effective protection."}
                    {index === 4 && "Security measures must adapt to new technologies and emerging threats."}
                  </p>
                </div>
              </div>
              
              {/* Visual indicator for expanded state */}
              <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full transition-all duration-300 ${
                activePoint === index ? 'bg-white opacity-70' : 'bg-white opacity-20'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* Key Insight Section with dramatic entrance */}
        <div 
          className={`relative mt-4 p-5 border border-yellow-300 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 bg-opacity-20 backdrop-blur-sm shadow-xl transition-all duration-1000 transform ${
            showInsight ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-xl bg-yellow-400 opacity-10 animate-pulse"></div>
          
          <div className="flex items-start relative z-10">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mr-4 shadow-glow animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-yellow-100 font-bold text-2xl mb-1 text-shadow">Key Insight</h3>
              <p className="text-white text-lg leading-snug">
                The security failings identified in this analysis highlight the critical importance of evolving security practices to address modern threats to public figures.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 rounded-full opacity-20 -mt-8 -mr-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-400 rounded-full opacity-20 -mb-6 -ml-6"></div>
        </div>
      </div>
      
      <div className="absolute bottom-3 right-4 text-white text-opacity-60 text-xs">
        <p className="animate-pulse">Click anywhere for particle effects • Click on conclusion cards for details</p>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(16px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(16px) rotate(-360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }
        .text-shadow-lg {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .text-shadow {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ConclusionNode; 