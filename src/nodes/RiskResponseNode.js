import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const RiskResponseNode = ({ data }) => {
  const [activeStrategy, setActiveStrategy] = useState(null);
  const [animate, setAnimate] = useState(false);
  
  // Trigger initial animation
  useEffect(() => {
    setAnimate(true);
    // Set first strategy as active by default after a delay
    const timer = setTimeout(() => {
      setActiveStrategy(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Define color mappings to avoid string manipulation
  const colorMap = {
    blue: {
      gradient: "from-blue-500 to-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-800",
      lightBg: "bg-blue-100", 
      textDark: "text-blue-700"
    },
    purple: {
      gradient: "from-purple-500 to-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-500",
      text: "text-purple-800",
      lightBg: "bg-purple-100",
      textDark: "text-purple-700"
    },
    indigo: {
      gradient: "from-indigo-500 to-indigo-700",
      bg: "bg-indigo-50",
      border: "border-indigo-500",
      text: "text-indigo-800",
      lightBg: "bg-indigo-100",
      textDark: "text-indigo-700"
    },
    emerald: {
      gradient: "from-emerald-500 to-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      text: "text-emerald-800",
      lightBg: "bg-emerald-100",
      textDark: "text-emerald-700"
    }
  };
  
  // Default risk response strategies if none provided
  const defaultStrategies = [
    {
      title: 'Perimeter Security Enhancement',
      description: 'Strengthen the security perimeter to prevent unauthorized access from elevated positions.',
      colorKey: 'blue',
      icon: '🔒',
      actions: [
        'Extended security zones beyond immediate rally area',
        'Pre-event security sweeps of all elevated positions with line of sight',
        'Implementation of physical barriers and checkpoints',
        'Deployment of aerial surveillance systems'
      ]
    },
    {
      title: 'Threat Detection Improvement',
      description: 'Implement advanced surveillance systems to identify potential threats earlier.',
      colorKey: 'purple',
      icon: '🔍',
      actions: [
        'Enhanced drone surveillance systems',
        'Deployment of counter-sniper teams at all outdoor events',
        'AI-powered threat detection software integration',
        'Real-time facial recognition and behavior analysis'
      ]
    },
    {
      title: 'Interagency Coordination',
      description: 'Strengthen communication and coordination between all security agencies involved.',
      colorKey: 'indigo',
      icon: '🤝',
      actions: [
        'Standardized communication protocols between agencies',
        'Joint training exercises for multi-agency security operations',
        'Unified command center establishment',
        'Regular coordination meetings and briefings'
      ]
    },
    {
      title: 'Response Protocols',
      description: 'Develop and implement faster and more effective response procedures.',
      colorKey: 'emerald',
      icon: '⚡',
      actions: [
        'Rapid response teams for suspicious activity reports',
        'Clear evacuation procedures for VIPs and attendees',
        'Emergency medical response coordination',
        'Crisis communication protocols'
      ]
    }
  ];
  
  const strategies = data.strategies ? data.strategies.map((strategy, i) => ({
    ...strategy,
    colorKey: strategy.colorKey || defaultStrategies[i % 4].colorKey
  })) : defaultStrategies;
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[600px] relative overflow-hidden">
      <Handle type="target" position={Position.Top} />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50 rounded-full -ml-40 -mb-40 opacity-50"></div>
      
      <div className={`text-center mb-6 transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-3xl font-bold text-teal-600">Risk Response Planning</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2"></div>
        <p className="text-gray-600 mt-2">Mitigation Strategies for Key Identified Risks</p>
      </div>
      
      {/* Navigation cards at the top */}
      <div className="flex justify-center gap-4 mb-6">
        {strategies.map((strategy, index) => (
          <button
            key={index}
            className={`relative transition-all duration-300 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } ${
              activeStrategy === index 
                ? 'scale-105 shadow-lg z-10' 
                : 'hover:shadow-md'
            }`}
            style={{ transitionDelay: `${index * 100 + 300}ms` }}
            onClick={() => setActiveStrategy(index)}
          >
            <div className={`w-48 py-4 px-2 rounded-lg bg-gradient-to-br ${colorMap[strategy.colorKey].gradient} text-white text-center relative overflow-hidden group`}>
              <span className="block text-4xl mb-1">{strategy.icon}</span>
              <h3 className="font-bold text-sm truncate px-2">{strategy.title}</h3>
              
              {/* Animated background */}
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              {/* Selection indicator */}
              {activeStrategy === index && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Main content area */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 h-[320px] border border-gray-100 overflow-hidden">
        {strategies.map((strategy, index) => (
          <div 
            key={index}
            className={`absolute inset-0 p-6 transition-all duration-500 ease-in-out ${
              activeStrategy === index 
                ? 'opacity-100 translate-x-0 z-10' 
                : activeStrategy > index 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
            }`}
          >
            <div className="flex items-start h-full">
              {/* Left column with strategy details */}
              <div className="w-1/2 pr-6">
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3 bg-gradient-to-r ${colorMap[strategy.colorKey].gradient}`}>
                  Strategy {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{strategy.title}</h3>
                <p className="text-gray-600 mb-4">{strategy.description}</p>
                
                {/* Priority indicator with semaphore colors and distinctive icons */}
                <div className={`mt-4 p-4 rounded-md flex items-center ${
                  index < 2 || strategy.title === 'Interagency Coordination' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-amber-50 border-l-4 border-amber-500'
                } transition-all duration-300 transform hover:scale-102`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                    index < 2 || strategy.title === 'Interagency Coordination' ? 'bg-red-500' : 'bg-amber-500'
                  } text-white`}>
                    {index < 2 || strategy.title === 'Interagency Coordination' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${index < 2 || strategy.title === 'Interagency Coordination' ? 'text-red-800' : 'text-amber-800'}`}>
                      Implementation Priority
                    </p>
                    <div className="flex items-center mt-1">
                      <span className={`font-bold text-lg ${index < 2 || strategy.title === 'Interagency Coordination' ? 'text-red-700' : 'text-amber-700'}`}>
                        {index < 2 || strategy.title === 'Interagency Coordination' ? 'High' : 'Medium'}
                      </span>
                      {(index < 2 || strategy.title === 'Interagency Coordination') && (
                        <div className="ml-2 flex">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-red-500 mx-0.5"></div>
                          ))}
                        </div>
                      )}
                      {!(index < 2 || strategy.title === 'Interagency Coordination') && (
                        <div className="ml-2 flex">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-amber-500 mx-0.5"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column with actions */}
              <div className="w-1/2 pl-6 border-l border-gray-200">
                <div className="flex items-center mb-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-3 flex items-center justify-center bg-gradient-to-r ${colorMap[strategy.colorKey].gradient} text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-700">Key Actions</h4>
                </div>
                
                <ul className="space-y-3">
                  {strategy.actions.map((action, actionIndex) => (
                    <li 
                      key={actionIndex}
                      className="flex items-start animate-fadeIn"
                      style={{ animationDelay: `${actionIndex * 150}ms` }}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colorMap[strategy.colorKey].lightBg} flex items-center justify-center mr-3 mt-0.5 ${colorMap[strategy.colorKey].textDark} font-bold text-xs`}>
                        {actionIndex + 1}
                      </div>
                      <p className="text-gray-700">{action}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows - Moved to bottom of content area */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 z-20">
          <button 
            className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all duration-300 ${
              activeStrategy === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'
            }`}
            onClick={() => setActiveStrategy(prev => prev > 0 ? prev - 1 : prev)}
            disabled={activeStrategy === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all duration-300 ${
              activeStrategy === strategies.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'
            }`}
            onClick={() => setActiveStrategy(prev => prev < strategies.length - 1 ? prev + 1 : prev)}
            disabled={activeStrategy === strategies.length - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4">
        {strategies.map((_, index) => (
          <button 
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 transition-all duration-300 cursor-pointer ${
              activeStrategy === index ? 'bg-teal-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setActiveStrategy(index)}
            aria-label={`View strategy ${index + 1}`}
          />
        ))}
      </div>
      
      <div className={`mt-2 text-center transition-all duration-700 transform ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm text-gray-500 italic">Click on cards above to explore different strategies</p>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RiskResponseNode; 