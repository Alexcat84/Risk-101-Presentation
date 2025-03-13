import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';

// Importamos los nodos personalizados
import TitleSlideNode from './nodes/TitleSlideNode';
import EventOverviewNode from './nodes/EventOverviewNode';
import StakeholdersNode from './nodes/StakeholdersNode';
import RiskIdentificationNode from './nodes/RiskIdentificationNode';
import RiskAnalysisNode from './nodes/RiskAnalysisNode';
import RiskResponseNode from './nodes/RiskResponseNode';
import LessonsLearnedNode from './nodes/LessonsLearnedNode';
import RecommendationsNode from './nodes/RecommendationsNode';
import ConclusionNode from './nodes/ConclusionNode';
import ReferencesNode from './nodes/ReferencesNode';
import ThankYouNode from './nodes/ThankYouNode';

// Registramos los tipos de nodos personalizados
const nodeTypes = {
  titleSlideNode: TitleSlideNode,
  eventOverviewNode: EventOverviewNode,
  stakeholdersNode: StakeholdersNode,
  riskIdentificationNode: RiskIdentificationNode,
  riskAnalysisNode: RiskAnalysisNode,
  riskResponseNode: RiskResponseNode,
  lessonsLearnedNode: LessonsLearnedNode,
  recommendationsNode: RecommendationsNode,
  conclusionNode: ConclusionNode,
  referencesNode: ReferencesNode,
  thankYouNode: ThankYouNode
};

// Definimos la secuencia de navegación
const navigationSequence = [
  'titleSlide',
  'eventOverview',
  'stakeholders',
  'riskIdentification',
  'riskAnalysis',
  'riskResponse',
  'lessonsLearned',
  'recommendations',
  'conclusion',
  'references',
  'thankYou'
];

// Definimos los nodos iniciales
const initialNodes = [
  {
    id: 'titleSlide',
    type: 'titleSlideNode',
    position: { x: 0, y: 0 },
    data: {
      title: 'The Attempted Assassination of President Trump',
      subtitle: 'A Risk Management Analysis',
      date: '2024 Pennsylvania Rally',
      course: 'MGT4202 Risk-101 Presentation'
    }
  },
  {
    id: 'eventOverview',
    type: 'eventOverviewNode',
    position: { x: 0, y: 150 },
    data: {
      date: 'July 13, 2024',
      location: 'Butler, Pennsylvania',
      incidentDetails: [
        'Shooter Thomas Matthew Crooks fired from an elevated position (~400 feet away)',
        'Trump suffered minor ear injury but was otherwise unharmed',
        'One spectator killed, two others critically injured',
        'Secret Service neutralized the shooter'
      ],
      sourceInfo: 'FBI investigation, Secret Service statements, media reports'
    },
    hidden: true
  },
  {
    id: 'stakeholders',
    type: 'stakeholdersNode',
    position: { x: 0, y: 300 },
    data: {
      stakeholders: [
        { name: 'Donald Trump', role: 'Target', description: 'Former President and target of the attack' },
        { name: 'Secret Service', role: 'Risk Technical Team', description: 'Responsible for protection of former presidents' },
        { name: 'Kimberly Cheatle', role: 'Risk Owner', description: 'Director of Secret Service at time of incident' },
        { name: 'Local Police', role: 'Risk Responders', description: 'Responsible for general event security' },
        { name: 'Thomas Matthew Crooks', role: 'Risk Source', description: '20-year-old with AR-style rifle' },
        { name: 'Rally Attendees', role: 'Affected Parties', description: 'Civilians exposed to security risks' },
        { name: 'Corey Comperatore', role: 'Casualty', description: '50-year-old spectator who died protecting his family' }
      ]
    },
    hidden: true
  },
  {
    id: 'riskIdentification',
    type: 'riskIdentificationNode',
    position: { x: 0, y: 450 },
    data: {
      riskCategories: {
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
      }
    },
    hidden: true
  },
  {
    id: 'riskAnalysis',
    type: 'riskAnalysisNode',
    position: { x: 0, y: 600 },
    data: {
      riskMatrix: [
        { risk: 'Perimeter Security Failure', probability: 'High', impact: 'Catastrophic', severity: 'High' },
        { risk: 'Interagency Communication Breakdown', probability: 'High', impact: 'High', severity: 'High' },
        { risk: 'Public Panic', probability: 'High', impact: 'Moderate', severity: 'Medium' },
        { risk: 'Detection of Suspicious Person', probability: 'Medium', impact: 'Catastrophic', severity: 'High' },
        { risk: 'Inadequate Emergency Response', probability: 'Medium', impact: 'High', severity: 'Medium' }
      ],
      rootCauses: [
        'Insufficient security protocols for areas outside immediate perimeter',
        'Delayed response to reported suspicious person',
        'Inadequate coordination between federal and local law enforcement',
        'Lack of aerial surveillance or counter-sniper positioning'
      ]
    },
    hidden: true
  },
  {
    id: 'riskResponse',
    type: 'riskResponseNode',
    position: { x: 0, y: 750 },
    data: {
      strategies: [
        {
          title: 'Perimeter Security Enhancement',
          description: 'Strengthen the security perimeter to prevent unauthorized access from elevated positions.',
          actions: [
            'Extended security zones beyond immediate rally area',
            'Pre-event security sweeps of all elevated positions with line of sight'
          ]
        },
        {
          title: 'Threat Detection Improvement',
          description: 'Implement advanced surveillance systems to identify potential threats earlier.',
          actions: [
            'Enhanced drone surveillance systems',
            'Deployment of counter-sniper teams at all outdoor events'
          ]
        },
        {
          title: 'Interagency Coordination',
          description: 'Strengthen communication and coordination between all security agencies involved.',
          actions: [
            'Standardized communication protocols between agencies',
            'Joint training exercises for multi-agency security operations'
          ]
        },
        {
          title: 'Response Protocols',
          description: 'Develop and implement faster and more effective response procedures.',
          actions: [
            'Rapid response teams for suspicious activity reports',
            'Clear evacuation procedures for VIPs and attendees'
          ]
        }
      ]
    },
    hidden: true
  },
  {
    id: 'lessonsLearned',
    type: 'lessonsLearnedNode',
    position: { x: 0, y: 900 },
    data: {
      failures: [
        'Perimeter security was inadequate, focusing only on immediate rally area',
        'Reports of suspicious person were not acted upon quickly enough',
        'Interagency coordination was insufficient',
        'Threat assessment failed to identify vulnerable elevated positions'
      ],
      successes: [
        'Secret Service rapid response after shots were fired',
        'Medical response saved lives',
        'Evacuation protocols were executed effectively',
        'Security perimeter prevented further casualties'
      ]
    },
    hidden: true
  },
  {
    id: 'recommendations',
    type: 'recommendationsNode',
    position: { x: 0, y: 1050 },
    data: {
      recommendations: [
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
          details: 'Protective services require adequate funding to acquire state-of-the-art security technology, hire and train specialized personnel, and implement meticulous security measures for high-risk political events.'
        }
      ]
    },
    hidden: true
  },
  {
    id: 'conclusion',
    type: 'conclusionNode',
    position: { x: 0, y: 1200 },
    data: {
      conclusions: [
        'The attempted assassination exposed critical security gaps but also demonstrated effective crisis response',
        'Political events require all-encompassing risk management beyond the immediate security perimeter',
        'Interagency coordination is essential for effective security operations',
        'Proactive risk identification and mitigation is vital for protecting public figures',
        'Security protocols must continually evolve to address changing threat landscapes'
      ]
    },
    hidden: true
  },
  {
    id: 'references',
    type: 'referencesNode',
    position: { x: 0, y: 1350 },
    data: {
      references: [
        {
          category: 'Official Sources',
          items: [
            'FBI statements and investigation reports',
            'Secret Service statements and protocols',
            'Department of Homeland Security after-action reports'
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
        },
        {
          category: 'Expert Analysis',
          items: [
            'Security expert evaluations of protective measures',
            'Risk management framework assessments',
            'Political security protocols review'
          ]
        }
      ]
    },
    hidden: true
  },
  {
    id: 'thankYou',
    type: 'thankYouNode',
    position: { x: 0, y: 1500 },
    data: {
      title: 'Thank You!',
      message: 'Questions or comments?'
    },
    hidden: true
  }
];

// Definimos las conexiones iniciales entre nodos
const initialEdges = [
  { id: 'e1-2', source: 'titleSlide', target: 'eventOverview', animated: true },
  { id: 'e2-3', source: 'eventOverview', target: 'stakeholders', animated: true },
  { id: 'e3-4', source: 'stakeholders', target: 'riskIdentification', animated: true },
  { id: 'e4-5', source: 'riskIdentification', target: 'riskAnalysis', animated: true },
  { id: 'e5-6', source: 'riskAnalysis', target: 'riskResponse', animated: true },
  { id: 'e6-7', source: 'riskResponse', target: 'lessonsLearned', animated: true },
  { id: 'e7-8', source: 'lessonsLearned', target: 'recommendations', animated: true },
  { id: 'e8-9', source: 'recommendations', target: 'conclusion', animated: true },
  { id: 'e9-10', source: 'conclusion', target: 'references', animated: true },
  { id: 'e10-11', source: 'references', target: 'thankYou', animated: true }
];

// Intentar cargar posiciones guardadas desde localStorage
const loadSavedNodePositions = () => {
  try {
    const savedPositions = localStorage.getItem('nodePositions');
    if (savedPositions) {
      const positions = JSON.parse(savedPositions);
      return initialNodes.map(node => {
        if (positions[node.id]) {
          return { ...node, position: positions[node.id] };
        }
        return node;
      });
    }
  } catch (error) {
    console.error('Error cargando posiciones guardadas:', error);
  }
  return initialNodes;
};

function NavigationControls({ onNext, onPrevious, currentNodeIndex, totalNodes }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentNodeIndex > 0 && (
        <button
          onClick={onPrevious}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-3 rounded shadow-lg transition-colors text-xs"
        >
          ← Previous
        </button>
      )}
      {currentNodeIndex < totalNodes - 1 && (
        <button
          onClick={onNext}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-3 rounded shadow-lg transition-colors text-xs"
        >
          Next →
        </button>
      )}
    </div>
  );
}

// Componente de control de zoom
function ZoomControl({ zoomLevel, onChange, disabled }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg transition-all duration-300 ${disabled ? 'opacity-30' : isHovered ? 'opacity-100' : 'opacity-30'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium mb-1">Zoom: {zoomLevel.toFixed(1)}x</span>
        <div className="flex items-center">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-6 h-6 rounded flex items-center justify-center mr-1 disabled:opacity-50 text-xs"
            onClick={() => onChange(Math.max(0.5, zoomLevel - 0.1))}
            disabled={disabled || zoomLevel <= 0.5}
          >
            -
          </button>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={zoomLevel}
            onChange={e => onChange(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={disabled}
          />
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-6 h-6 rounded flex items-center justify-center ml-1 disabled:opacity-50 text-xs"
            onClick={() => onChange(Math.min(2.5, zoomLevel + 0.1))}
            disabled={disabled || zoomLevel >= 2.5}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function Flow() {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [fixedZoom, setFixedZoom] = useState(false);
  const [fixedPositions, setFixedPositions] = useState(false);
  const [savedPositions, setSavedPositions] = useState({});
  const [controlsHovered, setControlsHovered] = useState(false);
  const reactFlowInstance = useReactFlow();
  const zoomTimeout = useRef(null);
  
  // Estado para nodos y bordes
  const [nodes, setNodes, onNodesChange] = useNodesState(loadSavedNodePositions());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Gestor personalizado de cambios de nodos para manejar posiciones fijas
  const handleNodesChange = useCallback(
    (changes) => {
      if (fixedPositions) {
        // Filtrar cambios de posición si las posiciones están fijas
        const filteredChanges = changes.filter(change => 
          !(change.type === 'position' && change.dragging)
        );
        onNodesChange(filteredChanges);
      } else {
        onNodesChange(changes);
      }
    },
    [fixedPositions, onNodesChange]
  );

  // Función para guardar las posiciones actuales de los nodos
  const saveNodePositions = useCallback(() => {
    const positions = {};
    nodes.forEach(node => {
      positions[node.id] = { ...node.position };
    });
    setSavedPositions(positions);
    localStorage.setItem('nodePositions', JSON.stringify(positions));
    
    // Mostrar notificación
    alert('¡Posiciones de nodos guardadas correctamente!');
  }, [nodes]);

  // Función para restaurar las posiciones guardadas
  const restoreNodePositions = useCallback(() => {
    if (Object.keys(savedPositions).length > 0) {
      setNodes(nds => 
        nds.map(node => {
          if (savedPositions[node.id]) {
            return { ...node, position: { ...savedPositions[node.id] } };
          }
          return node;
        })
      );
    } else {
      // Intentar cargar desde localStorage
      const storedPositions = localStorage.getItem('nodePositions');
      if (storedPositions) {
        const positions = JSON.parse(storedPositions);
        setNodes(nds => 
          nds.map(node => {
            if (positions[node.id]) {
              return { ...node, position: { ...positions[node.id] } };
            }
            return node;
          })
        );
      }
    }
  }, [savedPositions, setNodes]);

  // Función para manejar las conexiones entre nodos
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Establecer el zoom
  const setZoom = useCallback((level) => {
    if (reactFlowInstance) {
      reactFlowInstance.setViewport({
        x: reactFlowInstance.getViewport().x,
        y: reactFlowInstance.getViewport().y,
        zoom: level
      });
    }
  }, [reactFlowInstance]);

  // Actualizar el zoom
  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
    
    // Si estamos en modo zoom fijo, aplicar el zoom
    if (fixedZoom) {
      // Limpiamos cualquier timeout anterior
      if (zoomTimeout.current) clearTimeout(zoomTimeout.current);
      
      // Establecemos un nuevo timeout para no aplicar el zoom en cada pequeño cambio del slider
      zoomTimeout.current = setTimeout(() => {
        setZoom(newZoomLevel);
      }, 10);
    }
  };

  // Función para navegar al siguiente nodo
  const navigateToNextNode = useCallback(() => {
    if (currentNodeIndex < navigationSequence.length - 1) {
      const nextIndex = currentNodeIndex + 1;
      setCurrentNodeIndex(nextIndex);
      
      // Mostrar el siguiente nodo
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === navigationSequence[nextIndex]) {
            return { ...node, hidden: false };
          }
          return node;
        })
      );
      
      // Espera un poco para permitir que se renderice el nodo antes de hacer zoom hacia él
      setTimeout(() => {
        reactFlowInstance.fitView({
          nodes: [{ id: navigationSequence[nextIndex] }],
          padding: 0.05, // Reducido para maximizar espacio
          duration: 1000
        });
      }, 100);
    }
  }, [currentNodeIndex, reactFlowInstance, setNodes]);

  // Función para navegar al nodo anterior
  const navigateToPreviousNode = useCallback(() => {
    if (currentNodeIndex > 0) {
      const previousIndex = currentNodeIndex - 1;
      setCurrentNodeIndex(previousIndex);
      
      // Hacer zoom hacia el nodo anterior (que ya debería estar visible)
      reactFlowInstance.fitView({
        nodes: [{ id: navigationSequence[previousIndex] }],
        padding: 0.05, // Reducido para maximizar espacio
        duration: 1000
      });
    }
  }, [currentNodeIndex, reactFlowInstance]);

  // Enfocar el primer nodo al cargar y asignar el zoom adecuado
  useEffect(() => {
    // Esperar a que ReactFlow esté listo
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView({
          nodes: [{ id: navigationSequence[currentNodeIndex] }],
          padding: 0.05, // Reducido para maximizar espacio
          duration: 1000
        });
      }
    }, 300);
  }, [reactFlowInstance, currentNodeIndex]);

  // Manejar teclas para navegar entre nodos
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'Space' || event.key === 'Enter') {
        navigateToNextNode();
      } else if (event.key === 'ArrowLeft') {
        navigateToPreviousNode();
      } else if (event.key === 'z') {
        // Alternar zoom fijo con la tecla 'z'
        setFixedZoom(prevFixed => !prevFixed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateToNextNode, navigateToPreviousNode]);
  
  // Actualizar el zoomLevel cuando cambia el viewport 
  const onMoveEnd = useCallback(() => {
    if (!fixedZoom && reactFlowInstance) {
      const viewport = reactFlowInstance.getViewport();
      setZoomLevel(viewport.zoom);
    }
  }, [reactFlowInstance, fixedZoom]);
  
  // Efecto para aplicar el zoom fijo cuando cambia el estado
  useEffect(() => {
    if (fixedZoom && reactFlowInstance) {
      setZoom(zoomLevel);
    }
  }, [fixedZoom, reactFlowInstance, zoomLevel, setZoom]);
  
  // Función para alternar el zoom fijo
  const toggleFixedZoom = () => {
    setFixedZoom(!fixedZoom);
    
    // Si estamos activando el zoom fijo, aplicar el nivel actual
    if (!fixedZoom && reactFlowInstance) {
      setTimeout(() => {
        setZoom(zoomLevel);
      }, 50);
    }
  };

  // Alternar el modo de posiciones fijas
  const toggleFixedPositions = useCallback(() => {
    const newFixedPositions = !fixedPositions;
    setFixedPositions(newFixedPositions);
    
    // Si activamos posiciones fijas, y hay posiciones guardadas, restaurarlas
    if (newFixedPositions) {
      restoreNodePositions();
    }
  }, [fixedPositions, restoreNodePositions]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMoveEnd={onMoveEnd}
        nodeTypes={nodeTypes}
        nodesDraggable={!fixedPositions}
        zoomOnScroll={!fixedZoom}
        panOnScroll={true}
        zoomOnPinch={!fixedZoom}
        zoomOnDoubleClick={!fixedZoom}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      
      <NavigationControls
        onNext={navigateToNextNode}
        onPrevious={navigateToPreviousNode}
        currentNodeIndex={currentNodeIndex}
        totalNodes={navigationSequence.length}
      />
      
      {/* Botones y controles para edición con efecto de transparencia */}
      <div 
        className={`fixed top-4 right-4 z-50 flex flex-col space-y-2 transition-opacity duration-300 ${controlsHovered ? 'opacity-100' : 'opacity-30'}`}
        onMouseEnter={() => setControlsHovered(true)}
        onMouseLeave={() => setControlsHovered(false)}
      >
        {/* Botón para zoom fijo */}
        <button
          onClick={toggleFixedZoom}
          className={`${fixedZoom ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-bold py-1 px-3 rounded-full shadow-lg transition-colors flex items-center text-xs`}
        >
          {fixedZoom ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Zoom Fijo: ON
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Zoom Fijo: OFF
            </>
          )}
        </button>
        
        {/* Botón para guardar posiciones de nodos */}
        <button
          onClick={saveNodePositions}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded-full shadow-lg transition-colors flex items-center text-xs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          </svg>
          Guardar Posiciones
        </button>
        
        {/* Botón para activar/desactivar posiciones fijas */}
        <button
          onClick={toggleFixedPositions}
          className={`${fixedPositions ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-bold py-1 px-3 rounded-full shadow-lg transition-colors flex items-center text-xs`}
        >
          {fixedPositions ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Posiciones Fijas: ON
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Posiciones Fijas: OFF
            </>
          )}
        </button>
      </div>
      
      {/* Control de zoom */}
      <ZoomControl 
        zoomLevel={zoomLevel} 
        onChange={handleZoomChange} 
        disabled={!fixedZoom} 
      />
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
