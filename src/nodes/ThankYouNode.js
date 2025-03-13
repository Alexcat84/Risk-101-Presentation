import React, { useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const ThankYouNode = ({ data }) => {
  const [hoverEffect, setHoverEffect] = useState(false);
  const containerRef = useRef(null);

  // Mouse move effect for interactive gradient
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Create a light effect that follows the cursor
    containerRef.current.style.setProperty('--light-x', `${x}%`);
    containerRef.current.style.setProperty('--light-y', `${y}%`);
  };

  // Generate an array of bubbles with different properties
  const generateBubbles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = 10 + Math.random() * 70; // Varied bubble sizes
      const startPosition = Math.random() * 100; // Random horizontal position
      const duration = 15 + Math.random() * 25; // Animation duration
      const delay = Math.random() * 15; // Staggered starts
      
      return {
        id: i,
        size,
        startPosition,
        duration,
        delay
      };
    });
  };

  // Create arrays of bubbles with different characteristics
  const smallBubbles = generateBubbles(35);
  const mediumBubbles = generateBubbles(20);
  const largeBubbles = generateBubbles(15);

  return (
    <div 
      ref={containerRef}
      className="p-0 rounded-xl shadow-xl bg-blue-600 w-[900px] h-[600px] relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoverEffect(true)}
      onMouseLeave={() => setHoverEffect(false)}
      style={{
        '--light-x': '50%',
        '--light-y': '30%'
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      {/* Dynamic radial gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-radial opacity-40 transition-opacity duration-700"
        style={{ 
          background: `radial-gradient(circle at var(--light-x) var(--light-y), rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 30%, transparent 70%)`,
          opacity: hoverEffect ? 0.7 : 0.4
        }}
      ></div>
      
      {/* Rising bubbles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Small bubbles layer */}
        {smallBubbles.map(bubble => (
          <div 
            key={`small-bubble-${bubble.id}`} 
            className="absolute bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              left: `${bubble.startPosition}%`,
              bottom: '-10%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.05) 60%, rgba(150, 230, 255, 0.02))',
              boxShadow: 'inset 0 0 8px rgba(255, 255, 255, 0.2), 0 0 1px rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(1px)',
              animation: `continuousRise ${bubble.duration}s linear ${bubble.delay}s infinite`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Highlight dot */}
            <div 
              className="absolute rounded-full" 
              style={{
                width: `${bubble.size * 0.12}px`,
                height: `${bubble.size * 0.12}px`,
                left: '30%',
                top: '30%',
                background: 'rgba(255, 255, 255, 0.6)'
              }}
            />
          </div>
        ))}
        
        {/* Medium bubbles layer */}
        {mediumBubbles.map(bubble => (
          <div 
            key={`medium-bubble-${bubble.id}`} 
            className="absolute bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              left: `${bubble.startPosition}%`,
              bottom: '-15%',
              background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1) 50%, rgba(170, 220, 255, 0.03))',
              boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.3), 0 0 2px rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(2px)',
              animation: `continuousRise ${bubble.duration * 0.8}s linear ${bubble.delay}s infinite`,
              zIndex: 2,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Main highlight */}
            <div 
              className="absolute rounded-full" 
              style={{
                width: `${bubble.size * 0.15}px`,
                height: `${bubble.size * 0.15}px`,
                left: '35%',
                top: '30%',
                background: 'rgba(255, 255, 255, 0.7)'
              }}
            />
            {/* Secondary highlight */}
            <div 
              className="absolute rounded-full" 
              style={{
                width: `${bubble.size * 0.08}px`,
                height: `${bubble.size * 0.08}px`,
                right: '25%',
                top: '20%',
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            />
          </div>
        ))}
        
        {/* Large bubbles layer */}
        {largeBubbles.map(bubble => (
          <div 
            key={`large-bubble-${bubble.id}`} 
            className="absolute bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              left: `${bubble.startPosition}%`,
              bottom: '-20%',
              background: 'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2) 40%, rgba(200, 240, 255, 0.03))',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3), 0 0 3px rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(3px)',
              animation: `continuousRise ${bubble.duration * 0.7}s linear ${bubble.delay}s infinite`,
              zIndex: 3,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Main highlight */}
            <div 
              className="absolute rounded-full" 
              style={{
                width: `${bubble.size * 0.18}px`,
                height: `${bubble.size * 0.18}px`,
                left: '30%',
                top: '25%',
                background: 'rgba(255, 255, 255, 0.7)'
              }}
            />
            {/* Secondary highlight */}
            <div 
              className="absolute rounded-full" 
              style={{
                width: `${bubble.size * 0.1}px`,
                height: `${bubble.size * 0.1}px`,
                right: '30%',
                top: '20%',
                background: 'rgba(255, 255, 255, 0.5)'
              }}
            />
            {/* Small reflection */}
            <div 
              className="absolute rounded-full" 
          style={{
                width: `${bubble.size * 0.06}px`,
                height: `${bubble.size * 0.06}px`,
                left: '45%',
                top: '50%',
                background: 'rgba(255, 255, 255, 0.4)'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        {/* Animated title with highlight effect */}
        <h2 
          className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white animate-gradient-x mb-8 tracking-tight"
          style={{textShadow: '0 0 40px rgba(165, 243, 252, 0.6)'}}
        >
          {data.title || "Thank You!"}
        </h2>
        
        {/* Animated divider */}
        <div className="relative w-60 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-14 animate-pulse">
          <div className="absolute w-20 h-full bg-cyan-300 opacity-80 animate-slide"></div>
        </div>
        
        {/* Animated subtitle with glow effect */}
        <p 
          className="text-white text-4xl mb-16 opacity-90 animate-fadeInSlow"
          style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.4)'}}
        >
          {data.message || "Questions or comments?"}
        </p>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
      
      <style jsx>{`
        @keyframes fadeInSlow {
          0% { opacity: 0; }
          100% { opacity: 0.9; }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slide {
          0% { transform: translateX(-30px); opacity: 0.6; }
          100% { transform: translateX(70px); opacity: 0; }
        }
        
        @keyframes continuousRise {
          0% { 
            transform: translateY(0); 
            opacity: 0;
          }
          5% {
            opacity: 0.3;
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.7;
          }
          100% { 
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
        
        .bubble {
          transform: translate3d(0, 0, 0);
          will-change: transform, opacity;
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 6s ease infinite;
        }
        
        .animate-fadeInSlow {
          animation: fadeInSlow 2s ease-in forwards;
        }
        
        .animate-slide {
          animation: slide 2s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          transition: background 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ThankYouNode;