import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const LessonsLearnedNode = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('failures');
  
  // Default failures if none provided
  const defaultFailures = [
    'Perimeter security was inadequate, focusing only on immediate rally area',
    'Reports of suspicious person were not acted upon quickly enough',
    'Interagency coordination was insufficient',
    'Threat assessment failed to identify vulnerable elevated positions'
  ];
  
  // Default successes if none provided
  const defaultSuccesses = [
    'Secret Service rapid response after shots were fired',
    'Medical response saved lives',
    'Evacuation protocols were executed effectively',
    'Security perimeter prevented further casualties'
  ];
  
  const failures = data.failures || defaultFailures;
  const successes = data.successes || defaultSuccesses;
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[600px] relative">
      <Handle type="target" position={Position.Top} />
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600">Lessons Learned</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      <div className="flex space-x-4 mb-8">
        <button
          className={`flex-1 py-4 rounded-lg font-bold transition-all ${
            activeCategory === 'failures' 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveCategory('failures')}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Failures
          </div>
        </button>
        <button
          className={`flex-1 py-4 rounded-lg font-bold transition-all ${
            activeCategory === 'successes' 
              ? 'bg-green-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveCategory('successes')}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Successes
          </div>
        </button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-md min-h-[320px]">
        {activeCategory === 'failures' ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-red-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Identified Failures
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {failures.map((failure, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-md shadow border-l-4 border-red-400 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-700 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{failure}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 mt-4 bg-red-50 rounded-md border-l-4 border-red-400">
              <p className="text-sm text-red-800">
                <span className="font-bold">Critical Insight:</span> These failures highlight the importance of immediate perimeter security and interagency communication.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-green-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Observed Successes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {successes.map((success, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-md shadow border-l-4 border-green-400 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-700 font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{success}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 mt-4 bg-green-50 rounded-md border-l-4 border-green-400">
              <p className="text-sm text-green-800">
                <span className="font-bold">Critical Insight:</span> These successes demonstrate the effectiveness of well-practiced emergency response protocols and proper training.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default LessonsLearnedNode; 