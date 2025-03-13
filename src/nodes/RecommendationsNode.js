import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const RecommendationsNode = ({ data }) => {
  const [activeRecommendation, setActiveRecommendation] = useState(0);
  
  // Default recommendations if none provided
  const defaultRecommendations = [
    {
      category: 'Technology',
      title: 'Deploy Holistic Drone Surveillance',
      description: 'Implement 360° monitoring of all areas with line of sight to protected individuals.',
      details: 'Modern drone technology with AI-powered threat detection can identify potential threats in real-time, allowing for faster response times and more exhaustive coverage than traditional security methods.'
    },
    {
      category: 'Policy',
      title: 'Mandatory Security Sweeps',
      description: 'Implement mandatory pre-event security sweeps of all buildings within firing range of event location.',
      details: 'Security teams should methodically search and secure all buildings, structures, and elevated positions within potential firing range of the event site. This includes rooftops, upper floors of buildings, and any vantage points that could be exploited by assailants.'
    },
    {
      category: 'Training',
      title: 'Interagency Crisis Simulations',
      description: 'Conduct monthly joint training exercises between all security stakeholders.',
      details: 'Regular cross-agency simulations should recreate various threat scenarios, testing communication channels, response times, and coordination procedures. These exercises should be followed by thorough after-action reviews and implementation of identified improvements.'
    },
    {
      category: 'Communication',
      title: 'Unified Command Structure',
      description: 'Establish direct communication channels between all security stakeholders.',
      details: 'A centralized command center with representatives from all security agencies should be established for high-profile events, with clear lines of authority and communication protocols defined well in advance.'
    },
    {
      category: 'Resources',
      title: 'Increased Funding for Protective Details',
      description: 'Allocate additional resources for advanced security technology and personnel.',
      details: 'Protective services require adequate funding to acquire state-of-the-art security technology, hire and train specialized personnel, and implement a clear security measures for high-risk political events.'
    }
  ];
  
  const recommendations = data.recommendations || defaultRecommendations;
  
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-blue-500 text-white';
      case 'policy':
        return 'bg-purple-500 text-white';
      case 'training':
        return 'bg-orange-500 text-white';
      case 'communication':
        return 'bg-green-500 text-white';
      case 'resources':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[600px] relative">
      <Handle type="target" position={Position.Top} />
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600">Recommendations</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 h-[450px]">
        {/* Sidebar Navigation */}
        <div className="col-span-3 bg-gray-50 rounded-lg shadow-md p-3 flex flex-col space-y-2">
          {recommendations.map((rec, index) => (
            <button
              key={index}
              className={`text-left p-3 rounded-md transition-colors flex items-center ${
                activeRecommendation === index
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => setActiveRecommendation(index)}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full ${getCategoryColor(rec.category)} mr-3`}>
                {index + 1}
              </span>
              <div className="flex-1 overflow-hidden">
                <p className={`font-medium truncate ${activeRecommendation === index ? 'text-white' : 'text-gray-700'}`}>
                  {rec.title}
                </p>
                <p className={`text-xs truncate ${activeRecommendation === index ? 'text-teal-100' : 'text-gray-500'}`}>
                  {rec.category}
                </p>
              </div>
            </button>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="col-span-9 bg-gray-50 rounded-lg shadow-md p-6 flex flex-col">
          {recommendations[activeRecommendation] && (
            <>
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(recommendations[activeRecommendation].category)}`}>
                  {recommendations[activeRecommendation].category}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 text-sm">Recommendation {activeRecommendation + 1} of {recommendations.length}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{recommendations[activeRecommendation].title}</h3>
              
              <p className="text-gray-600 mb-6 text-lg">{recommendations[activeRecommendation].description}</p>
              
              <div className="bg-white rounded-lg border border-gray-200 p-5 mt-2 flex-grow shadow-sm">
                <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Detailed Implementation
                </h4>
                <p className="text-gray-600">{recommendations[activeRecommendation].details}</p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  className={`px-4 py-2 rounded bg-gray-200 text-gray-700 flex items-center ${activeRecommendation === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                  onClick={() => setActiveRecommendation(prev => Math.max(0, prev - 1))}
                  disabled={activeRecommendation === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>
                <button
                  className={`px-4 py-2 rounded bg-teal-500 text-white flex items-center ${activeRecommendation === recommendations.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
                  onClick={() => setActiveRecommendation(prev => Math.min(recommendations.length - 1, prev + 1))}
                  disabled={activeRecommendation === recommendations.length - 1}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default RecommendationsNode; 