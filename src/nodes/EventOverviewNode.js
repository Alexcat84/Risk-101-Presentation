import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const EventOverviewNode = ({ data }) => {
  const [animate, setAnimate] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  // Trigger animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Default incident details if none provided
  const defaultIncidentDetails = [
    'Shooter Thomas Matthew Crooks fired from an elevated position (~400 feet away)',
    'Trump suffered minor ear injury but was otherwise unharmed',
    'One spectator killed, two others critically injured',
    'Secret Service neutralized the shooter'
  ];

  const incidentDetails = data.incidentDetails || defaultIncidentDetails;

  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[550px] relative overflow-hidden">
      <Handle type="target" position={Position.Top} />
      
      {/* Decorative stripe elements */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-teal-500 opacity-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-orange-500 opacity-10"></div>
      
      <div className={`text-center mb-8 transition-all duration-700 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl font-bold text-teal-600">Event Overview</h2>
        <div className="w-32 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-12 px-6">
        {/* Left column - Key Information */}
        <div className={`transition-all duration-700 delay-100 transform ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <div className="flex items-center mb-8">
            <div className="relative bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
              <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-teal-700 ml-4">Key Information</h3>
          </div>
          
          <div className="space-y-12 pl-4 ml-1 border-l-2 border-teal-100">
            <div className="flex items-center">
              <div className="relative flex-shrink-0 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mr-5 shadow-md">
                <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-500 text-sm mb-1">Date</p>
                <p className="text-gray-800 text-2xl font-bold">{data.date || "July 13, 2024"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative flex-shrink-0 w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mr-5 shadow-md">
                <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-500 text-sm mb-1">Location</p>
                <p className="text-gray-800 text-2xl font-bold">{data.location || "Butler, Pennsylvania"}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Incident Details */}
        <div className={`transition-all duration-700 delay-200 transform ${animate ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          <div className="flex items-center mb-6 border-l-4 border-orange-500 pl-4">
            <div className="relative bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-orange-700 ml-4">Incident Details</h3>
          </div>
          
          <div className="space-y-3 max-h-[370px] overflow-y-auto pr-2">
            {incidentDetails.map((detail, index) => (
              <div 
                key={index} 
                className={`bg-orange-50 p-3 rounded-md border-l-4 border-orange-300 transform transition-all duration-300 cursor-pointer ${activeDetail === index ? 'border-orange-500 bg-orange-100 shadow-md' : 'hover:border-orange-400 hover:shadow-sm'}`}
                onClick={() => setActiveDetail(activeDetail === index ? null : index)}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="relative flex-shrink-0 w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                    <div className={`absolute inset-0 bg-orange-400 rounded-full ${activeDetail === index ? 'animate-ping opacity-30' : 'opacity-0'}`}></div>
                    <span className="text-orange-700 font-bold">{index + 1}</span>
                  </div>
                  <p className={`text-gray-700 ${activeDetail === index ? 'font-medium' : ''}`}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default EventOverviewNode; 