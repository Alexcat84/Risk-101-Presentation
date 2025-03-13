import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const RiskIdentificationNode = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState('security');
  
  // Default risk categories if none provided
  const defaultRisks = {
    security: [
      'There is a significant chance that elevated positions outside the security perimeter could provide access for potential assailants',
      'There is a possibility that interagency communication failures could prevent timely response to identified threats',
      'There exists a probability that the standard security perimeter for outdoor rallies is insufficient'
    ],
    political: [
      'There is a likelihood that the assassination attempt could intensify political polarization',
      'There is a chance that the incident could lead to a surge in threats against other political figures'
    ],
    public: [
      'There is a probability that large outdoor political gatherings could result in casualties if attacked',
      'There is a risk that emergency response capabilities may be inadequate for mass casualty events'
    ],
    reputational: [
      'There is a high likelihood that public trust in the Secret Service could be severely damaged',
      'There is a probability that security protocols for political events will face intense scrutiny'
    ]
  };
  
  const riskCategories = data.riskCategories || defaultRisks;
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[600px] relative">
      <Handle type="target" position={Position.Top} />
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600">Risk Identification</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-1 rounded-t-lg font-medium ${activeCategory === 'security' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveCategory('security')}
        >
          Security Risks
        </button>
        <button
          className={`px-4 py-2 mx-1 rounded-t-lg font-medium ${activeCategory === 'political' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveCategory('political')}
        >
          Political Risks
        </button>
        <button
          className={`px-4 py-2 mx-1 rounded-t-lg font-medium ${activeCategory === 'public' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveCategory('public')}
        >
          Public Safety Risks
        </button>
        <button
          className={`px-4 py-2 mx-1 rounded-t-lg font-medium ${activeCategory === 'reputational' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveCategory('reputational')}
        >
          Reputational Risks
        </button>
      </div>
      
      {/* Risk Content Panels */}
      <div className="p-6 rounded-lg shadow-md bg-gray-50 min-h-[320px] relative overflow-hidden">
        {/* Security Risks Panel */}
        <div className={`transition-opacity duration-300 ${activeCategory === 'security' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-700">Security Risks</h3>
          </div>
          
          <ul className="space-y-4 mt-4">
            {riskCategories.security.map((risk, index) => (
              <li key={index} className="flex items-start p-3 bg-white rounded-md shadow">
                <span className="inline-block w-6 h-6 bg-red-100 text-red-700 rounded-full text-center font-bold flex-shrink-0 mr-3">!</span>
                <p className="text-gray-700">{risk}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Political Risks Panel */}
        <div className={`transition-opacity duration-300 ${activeCategory === 'political' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-700">Political Risks</h3>
          </div>
          
          <ul className="space-y-4 mt-4">
            {riskCategories.political.map((risk, index) => (
              <li key={index} className="flex items-start p-3 bg-white rounded-md shadow">
                <span className="inline-block w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-center font-bold flex-shrink-0 mr-3">!</span>
                <p className="text-gray-700">{risk}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Public Safety Risks Panel */}
        <div className={`transition-opacity duration-300 ${activeCategory === 'public' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-yellow-700">Public Safety Risks</h3>
          </div>
          
          <ul className="space-y-4 mt-4">
            {riskCategories.public.map((risk, index) => (
              <li key={index} className="flex items-start p-3 bg-white rounded-md shadow">
                <span className="inline-block w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full text-center font-bold flex-shrink-0 mr-3">!</span>
                <p className="text-gray-700">{risk}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Reputational Risks Panel */}
        <div className={`transition-opacity duration-300 ${activeCategory === 'reputational' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-700">Reputational Risks</h3>
          </div>
          
          <ul className="space-y-4 mt-4">
            {riskCategories.reputational.map((risk, index) => (
              <li key={index} className="flex items-start p-3 bg-white rounded-md shadow">
                <span className="inline-block w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-center font-bold flex-shrink-0 mr-3">!</span>
                <p className="text-gray-700">{risk}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 italic">Risk identification is the foundation of effective risk management</p>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default RiskIdentificationNode; 