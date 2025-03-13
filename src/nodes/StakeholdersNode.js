import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

// Importamos las imágenes locales desde la carpeta src/Pictures
import donaldTrumpImage from '../Pictures/Donal trump.png';
import secretServiceImage from '../Pictures/Secret service.png';
import kimberlyCheatleImage from '../Pictures/Kimberly Cheatle.png';
import localPoliceImage from '../Pictures/Local Police.png';
import thomasCrooksImage from '../Pictures/Thomas Matthew Crooks.png';
import rallyAttendeesImage from '../Pictures/Rally attenders.png';
import coreyComperatoreImage from '../Pictures/Corey Comperatore.png';

const StakeholdersNode = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const navButtonsRef = useRef(null);
  
  // Default stakeholders if none provided
  const defaultStakeholders = [
    { 
      name: 'Donald Trump', 
      role: 'Target', 
      description: 'Former President and target of the attack',
      image: donaldTrumpImage
    },
    { 
      name: 'Secret Service', 
      role: 'Risk Technical Team', 
      description: 'Responsible for protection of former presidents',
      image: secretServiceImage
    },
    { 
      name: 'Kimberly Cheatle', 
      role: 'Risk Owner', 
      description: 'Director of Secret Service at time of incident',
      image: kimberlyCheatleImage
    },
    { 
      name: 'Local Police', 
      role: 'Risk Responders', 
      description: 'Responsible for general event security',
      image: localPoliceImage
    },
    { 
      name: 'Thomas Matthew Crooks', 
      role: 'Risk Source', 
      description: '20-year-old with AR-style rifle',
      image: thomasCrooksImage
    },
    { 
      name: 'Rally Attendees', 
      role: 'Affected Parties', 
      description: 'Civilians exposed to security risks',
      image: rallyAttendeesImage
    },
    { 
      name: 'Corey Comperatore', 
      role: 'Casualty', 
      description: '50-year-old spectator who died protecting his family',
      image: coreyComperatoreImage
    }
  ];
  
  const stakeholders = data.stakeholders?.map(s => {
    // If stakeholders are provided in data but don't have images, 
    // try to find images from defaultStakeholders
    if (!s.image) {
      const defaultStakeholder = defaultStakeholders.find(ds => ds.name === s.name);
      if (defaultStakeholder) {
        return { ...s, image: defaultStakeholder.image };
      }
    }
    return s;
  }) || defaultStakeholders;
  
  // Get initial for current stakeholder
  const getInitial = (stakeholder) => {
    return stakeholder.initials || stakeholder.name.charAt(0);
  };
  
  // Handle image loading error
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null;
    e.target.style.display = 'none';
    // Show the fallback initial instead
    const initialElement = e.target.nextSibling;
    if (initialElement) {
      initialElement.style.display = 'flex';
    }
  };
  
  // Get proper color for each stakeholder based on role
  const getRoleColor = (role) => {
    switch(role) {
      case 'Target': return 'teal';
      case 'Risk Technical Team': return 'blue';
      case 'Risk Owner': return 'indigo';
      case 'Risk Responders': return 'purple';
      case 'Risk Source': return 'red';
      case 'Affected Parties': return 'yellow';
      case 'Casualty': return 'orange';
      default: return 'teal';
    }
  };
  
  const currentStakeholder = stakeholders[activeIndex];
  const roleColor = getRoleColor(currentStakeholder.role);
  
  // Función para ir a un índice específico
  const goToIndex = (index) => {
    if (index >= 0 && index < stakeholders.length) {
      setActiveIndex(index);
    }
  };
  
  // Implementar los botones Next y Previous después de que el componente se monte
  useEffect(() => {
    if (navButtonsRef.current) {
      // Limpiar cualquier botón anterior
      navButtonsRef.current.innerHTML = '';
      
      // Crear botones directamente en el DOM
      const prevButton = document.createElement('button');
      prevButton.className = 'prev-button bg-indigo-500 text-white px-5 py-2 rounded-lg shadow flex items-center';
      prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Previous';
      prevButton.style.cursor = 'pointer';
      prevButton.onclick = () => {
        console.log("Previous clicked");
        const newIndex = (activeIndex - 1 + stakeholders.length) % stakeholders.length;
        goToIndex(newIndex);
      };
      
      const counterDiv = document.createElement('div');
      counterDiv.className = 'counter bg-gray-100 px-4 py-2 rounded-lg font-medium';
      counterDiv.textContent = `${activeIndex + 1} of ${stakeholders.length}`;
      
      const nextButton = document.createElement('button');
      nextButton.className = 'next-button bg-indigo-500 text-white px-5 py-2 rounded-lg shadow flex items-center';
      nextButton.innerHTML = 'Next<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>';
      nextButton.style.cursor = 'pointer';
      nextButton.onclick = () => {
        console.log("Next clicked");
        const newIndex = (activeIndex + 1) % stakeholders.length;
        goToIndex(newIndex);
      };
      
      // Agregar botones al contenedor
      navButtonsRef.current.appendChild(prevButton);
      navButtonsRef.current.appendChild(counterDiv);
      navButtonsRef.current.appendChild(nextButton);
      
      // Asegurarnos de que el estilo flex esté correctamente aplicado
      navButtonsRef.current.style.display = 'flex';
      navButtonsRef.current.style.justifyContent = 'space-between';
      navButtonsRef.current.style.marginTop = '1.5rem';
      navButtonsRef.current.style.maxWidth = '36rem';
      navButtonsRef.current.style.margin = '1.5rem auto 0';
    }
  }, [activeIndex, stakeholders.length, goToIndex]);
  
  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        const newIndex = (activeIndex + 1) % stakeholders.length;
        goToIndex(newIndex);
      } else if (e.key === 'ArrowLeft') {
        const newIndex = (activeIndex - 1 + stakeholders.length) % stakeholders.length;
        goToIndex(newIndex);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, stakeholders.length, goToIndex]);
  
  return (
    <div ref={containerRef} className="p-8 rounded-xl shadow-xl bg-white border-2 border-teal-500 w-[900px] h-[550px] relative overflow-hidden">
      <Handle type="target" position={Position.Top} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500 opacity-5 rounded-full -ml-24 -mb-24"></div>
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-teal-600">Key Players (Stakeholders)</h2>
        <div className="w-32 h-1 bg-teal-500 mx-auto mt-2"></div>
      </div>
      
      {/* Progress indicator - Simple y estático */}
      <div className="flex justify-center mb-2">
        {stakeholders.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToIndex(index)}
            className={`mx-1 h-2.5 rounded-full transition-all duration-300 cursor-pointer 
              ${index === activeIndex ? 'w-8 bg-indigo-500' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`View stakeholder ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Main content with stakeholder card */}
      <div className="relative max-w-4xl mx-auto h-[350px] flex items-center justify-center">
        <div className={`w-full bg-white p-8 rounded-xl shadow-lg border-l-8 ${
          roleColor === 'teal' ? 'border-teal-500' : 
          roleColor === 'blue' ? 'border-blue-500' : 
          roleColor === 'indigo' ? 'border-indigo-500' : 
          roleColor === 'purple' ? 'border-purple-500' : 
          roleColor === 'red' ? 'border-red-500' : 
          roleColor === 'yellow' ? 'border-yellow-500' : 
          roleColor === 'orange' ? 'border-orange-500' : 'border-teal-500'
        }`}>
          <div className="flex items-start">
            {/* Image or Initial - INCREASED SIZE */}
            <div className="relative flex-shrink-0 mr-8">
              <div className={`w-44 h-44 rounded-lg shadow-md overflow-hidden ${
                roleColor === 'teal' ? 'border-4 border-teal-200' : 
                roleColor === 'blue' ? 'border-4 border-blue-200' : 
                roleColor === 'indigo' ? 'border-4 border-indigo-200' : 
                roleColor === 'purple' ? 'border-4 border-purple-200' : 
                roleColor === 'red' ? 'border-4 border-red-200' : 
                roleColor === 'yellow' ? 'border-4 border-yellow-200' : 
                roleColor === 'orange' ? 'border-4 border-orange-200' : 'border-4 border-teal-200'
              }`}>
                <img 
                  src={currentStakeholder.image}
                  alt={currentStakeholder.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div 
                  style={{ display: 'none' }}
                  className={`absolute inset-0 flex items-center justify-center font-bold text-5xl ${
                    roleColor === 'teal' ? 'bg-teal-100 text-teal-700' : 
                    roleColor === 'blue' ? 'bg-blue-100 text-blue-700' : 
                    roleColor === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 
                    roleColor === 'purple' ? 'bg-purple-100 text-purple-700' : 
                    roleColor === 'red' ? 'bg-red-100 text-red-700' : 
                    roleColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 
                    roleColor === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {getInitial(currentStakeholder)}
                </div>
              </div>
              <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                roleColor === 'teal' ? 'bg-teal-500' : 
                roleColor === 'blue' ? 'bg-blue-500' : 
                roleColor === 'indigo' ? 'bg-indigo-500' : 
                roleColor === 'purple' ? 'bg-purple-500' : 
                roleColor === 'red' ? 'bg-red-500' : 
                roleColor === 'yellow' ? 'bg-yellow-500' : 
                roleColor === 'orange' ? 'bg-orange-500' : 'bg-teal-500'
              }`}>
                <span className="text-white font-bold text-lg">{activeIndex + 1}</span>
              </div>
            </div>
            
            {/* Stakeholder Information - MORE RIGHT PADDING */}
            <div className="flex-1 pl-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{currentStakeholder.name}</h3>
                  <p className={`inline-block px-5 py-1.5 rounded-full text-2xl font-medium mb-5 ${
                    roleColor === 'teal' ? 'bg-teal-100 text-teal-600' : 
                    roleColor === 'blue' ? 'bg-blue-100 text-blue-600' : 
                    roleColor === 'indigo' ? 'bg-indigo-100 text-indigo-600' : 
                    roleColor === 'purple' ? 'bg-purple-100 text-purple-600' : 
                    roleColor === 'red' ? 'bg-red-100 text-red-600' : 
                    roleColor === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 
                    roleColor === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'
                  }`}>
                    {currentStakeholder.role}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  roleColor === 'teal' ? 'bg-teal-100' : 
                  roleColor === 'blue' ? 'bg-blue-100' : 
                  roleColor === 'indigo' ? 'bg-indigo-100' : 
                  roleColor === 'purple' ? 'bg-purple-100' : 
                  roleColor === 'red' ? 'bg-red-100' : 
                  roleColor === 'yellow' ? 'bg-yellow-100' : 
                  roleColor === 'orange' ? 'bg-orange-100' : 'bg-teal-100'
                }`}>
                  <span className={`font-bold text-xl ${
                    roleColor === 'teal' ? 'text-teal-600' : 
                    roleColor === 'blue' ? 'text-blue-600' : 
                    roleColor === 'indigo' ? 'text-indigo-600' : 
                    roleColor === 'purple' ? 'text-purple-600' : 
                    roleColor === 'red' ? 'text-red-600' : 
                    roleColor === 'yellow' ? 'text-yellow-600' : 
                    roleColor === 'orange' ? 'text-orange-600' : 'text-teal-600'
                  }`}>
                    {getInitial(currentStakeholder)}
                  </span>
                </div>
              </div>
              <div className={`border-t-2 py-4 my-3 ${
                roleColor === 'teal' ? 'border-teal-100' : 
                roleColor === 'blue' ? 'border-blue-100' : 
                roleColor === 'indigo' ? 'border-indigo-100' : 
                roleColor === 'purple' ? 'border-purple-100' : 
                roleColor === 'red' ? 'border-red-100' : 
                roleColor === 'yellow' ? 'border-yellow-100' : 
                roleColor === 'orange' ? 'border-orange-100' : 'border-teal-100'
              }`}></div>
              <p className="text-gray-700 text-2xl leading-relaxed pr-4">{currentStakeholder.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botones creados dinámicamente con JavaScript nativo */}
      <div ref={navButtonsRef}></div>
      
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-500 italic">Each stakeholder plays a critical role in the risk management framework of this incident</p>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default StakeholdersNode; 