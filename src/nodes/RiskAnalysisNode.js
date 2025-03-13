import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const RiskAnalysisNode = ({ data }) => {
  const [activeTab, setActiveTab] = useState('matrix');
  
  // Default risk matrix if none provided
  const defaultRiskMatrix = [
    { risk: 'Perimeter Security Failure', probability: 'High', impact: 'Catastrophic', severity: 'High' },
    { risk: 'Interagency Communication Breakdown', probability: 'High', impact: 'High', severity: 'High' },
    { risk: 'Public Panic', probability: 'High', impact: 'Moderate', severity: 'Medium' },
    { risk: 'Detection of Suspicious Person', probability: 'Medium', impact: 'Catastrophic', severity: 'High' },
    { risk: 'Inadequate Emergency Response', probability: 'Medium', impact: 'High', severity: 'Medium' }
  ];
  
  // Default root causes if none provided
  const defaultRootCauses = [
    'Insufficient security protocols for areas outside immediate perimeter',
    'Delayed response to reported suspicious person',
    'Inadequate coordination between federal and local law enforcement',
    'Lack of aerial surveillance or counter-sniper positioning'
  ];
  
  const riskMatrix = data.riskMatrix || defaultRiskMatrix;
  const rootCauses = data.rootCauses || defaultRootCauses;
  
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const getProbabilityColor = (probability) => {
    switch (probability.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'catastrophic':
        return 'text-purple-600';
      case 'high':
        return 'text-red-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[600px] relative">
      <Handle type="target" position={Position.Top} />
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-600">Risk Analysis</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-5 py-2 rounded-t-lg font-medium ${activeTab === 'matrix' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('matrix')}
        >
          Risk Assessment Matrix
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-medium ${activeTab === 'causes' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('causes')}
        >
          Root Causes
        </button>
      </div>
      
      {/* Risk Matrix Panel */}
      <div className={`transition-opacity duration-300 ${activeTab === 'matrix' ? 'block' : 'hidden'}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-600 text-white text-left">
                <th className="py-3 px-4 uppercase font-semibold">Risk</th>
                <th className="py-3 px-4 uppercase font-semibold">Probability</th>
                <th className="py-3 px-4 uppercase font-semibold">Impact</th>
                <th className="py-3 px-4 uppercase font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {riskMatrix.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.risk}</td>
                  <td className={`py-3 px-4 font-medium ${getProbabilityColor(item.probability)}`}>{item.probability}</td>
                  <td className={`py-3 px-4 font-medium ${getImpactColor(item.impact)}`}>{item.impact}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
          <p className="text-sm text-blue-800">
            <span className="font-bold">Note:</span> Risk severity is calculated based on the combination of probability and impact factors.
          </p>
        </div>
      </div>
      
      {/* Root Causes Panel */}
      <div className={`transition-opacity duration-300 ${activeTab === 'causes' ? 'block' : 'hidden'}`}>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-teal-700 mb-4">Identified Root Causes</h3>
          
          <ul className="space-y-4">
            {rootCauses.map((cause, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4 p-4 bg-white rounded-md shadow-sm border-l-4 border-orange-500 flex-grow">
                  <p className="text-gray-700">{cause}</p>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
            <h4 className="font-bold text-yellow-800 mb-2">Critical Insight</h4>
            <p className="text-sm text-yellow-800">
              Addressing these root causes is essential for preventing similar security incidents at future political events.
            </p>
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default RiskAnalysisNode; 