import React from 'react';
import { Handle, Position } from 'reactflow';

const ReferencesNode = ({ data }) => {
  // Default references if none provided - VERSIÓN ACTUALIZADA SIN EXPERT ANALYSIS
  const defaultReferences = [
    {
      category: 'Official Sources',
      items: [
        'United States Secret Service Public Statements (secretservice.gov/newsroom)',
        'White House Press Briefings on the July 13 Incident',
        'FBI Press Releases and Public Domain Information',
        'Congressional Hearings on Security Protocols (public records)'
      ]
    },
    {
      category: 'Media Coverage',
      items: [
        'CNN multifaceted coverage of the July 13 incident',
        'Reuters investigative reporting on security protocols',
        'BBC analysis of the political impact',
        'Associated Press (AP) timeline of events'
      ]
    }
    // NO EXPERT ANALYSIS SECTION - REMOVED COMPLETELY
  ];
  
  // Ensure we're using our updated references instead of any passed in via data
  // This forces the component to use our updated list without Expert Analysis
  const references = defaultReferences;
  
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'official sources':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'media coverage':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };
  
  return (
    <div className="p-8 rounded-xl shadow-xl bg-gradient-to-br from-teal-500 to-teal-700 w-[900px] h-[600px] relative overflow-hidden">
      <Handle type="target" position={Position.Top} />
      
      <div className="text-center mb-6">
        <h2 className="text-5xl font-bold text-white">References</h2>
        <div className="w-40 h-1 bg-white opacity-70 mx-auto mt-3"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" style={{ height: '370px' }}>
        {references.map((section, sectionIndex) => (
          <div 
            key={sectionIndex}
            className="rounded-xl overflow-hidden h-full flex flex-col"
          >
            <div className="bg-teal-600 text-white py-3 px-4 flex items-center">
              <div className="bg-teal-700 rounded-lg p-2 mr-3">
                {getCategoryIcon(section.category)}
              </div>
              <h3 className="font-bold text-xl">{section.category}</h3>
            </div>
            
            <div className="bg-teal-50 bg-opacity-20 flex-1 overflow-hidden">
              <ul className="divide-y divide-white divide-opacity-10">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start p-4 hover:bg-white hover:bg-opacity-5 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mr-4 font-bold mt-0.5">
                      {itemIndex + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white break-words">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="bg-teal-600 bg-opacity-40 rounded-lg border-l-4 border-teal-300 p-4 max-w-5xl mx-auto">
          <p className="text-white text-base">
            <span className="font-bold">Note:</span> This analysis is based on publicly available information as of August 2024. Future investigations and reports may reveal additional details that could modify these findings.
          </p>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default ReferencesNode; 