import React from 'react';
import { Handle, Position } from 'reactflow';

const TitleSlideNode = ({ data }) => {
  return (
    <div className="p-8 rounded-xl shadow-xl bg-gradient-to-br from-teal-500 to-teal-700 w-[900px] h-[600px] relative overflow-hidden">
      <Handle type="target" position={Position.Top} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
      
      <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {data.title || "The Attempted Assassination of President Trump"}
        </h1>
        
        <div className="w-32 h-1 bg-white opacity-70 mx-auto mb-8"></div>
        
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          {data.subtitle || "A Risk Management Analysis"}
        </h2>
        
        <h3 className="text-xl md:text-2xl mb-10 text-teal-200">
          {data.date || "2024 Pennsylvania Rally"}
        </h3>
        
        <div className="mt-6 bg-white bg-opacity-20 px-8 py-4 rounded-md">
          <p className="text-xl">{data.course || "MGT4202 Risk-101 Presentation"}</p>
        </div>
        
        {/* Animated arrow indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce bg-white bg-opacity-30 p-2 w-10 h-10 ring-1 ring-white ring-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default TitleSlideNode; 