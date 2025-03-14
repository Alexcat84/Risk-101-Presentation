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

// Definir las posiciones iniciales de los nodos
const initialNodes = [
  {
    id: 'titleSlide',
    type: 'titleSlideNode',
    position: { x: 100, y: 100 },
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
    position: { x: 100, y: 800 },
    data: {
      date: 'July 13, 2024',
      location: 'Butler, Pennsylvania'
    }
  },
  {
    id: 'stakeholders',
    type: 'stakeholdersNode',
    position: { x: 100, y: 1500 },
    data: {}
  },
  {
    id: 'riskIdentification',
    type: 'riskIdentificationNode',
    position: { x: 1100, y: 100 },
    data: {}
  },
  {
    id: 'riskAnalysis',
    type: 'riskAnalysisNode',
    position: { x: 1100, y: 800 },
    data: {}
  },
  {
    id: 'riskResponse',
    type: 'riskResponseNode',
    position: { x: 1100, y: 1500 },
    data: {}
  },
  {
    id: 'lessonsLearned',
    type: 'lessonsLearnedNode',
    position: { x: 2100, y: 100 },
    data: {}
  },
  {
    id: 'recommendations',
    type: 'recommendationsNode',
    position: { x: 2100, y: 800 },
    data: {}
  },
  {
    id: 'conclusion',
    type: 'conclusionNode',
    position: { x: 2100, y: 1500 },
    data: {}
  },
  {
    id: 'references',
    type: 'referencesNode',
    position: { x: 3100, y: 700 },
    data: {}
  },
  {
    id: 'thankYou',
    type: 'thankYouNode',
    position: { x: 3100, y: 1300 },
    data: {
      title: 'Thank You!',
      message: 'Questions or comments?'
    }
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
          // Usar posiciones guardadas pero asegurarse de que los nodos estén visibles
          return { ...node, position: positions[node.id], hidden: false };
        }
        // Asegurar que los nodos predeterminados también estén visibles
        return { ...node, hidden: false };
      });
    }
  } catch (error) {
    console.error('Error al cargar posiciones guardadas:', error);
  }
  
  // Si no hay posiciones guardadas o hay un error, usar las posiciones predefinidas y asegurar visibilidad
  return initialNodes.map(node => ({ ...node, hidden: false }));
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
    // Desactivar la función para evitar que cada visitante modifique las posiciones
    // Código original comentado:
    /*
    const positions = {};
    nodes.forEach(node => {
      positions[node.id] = { ...node.position };
    });
    setSavedPositions(positions);
    localStorage.setItem('nodePositions', JSON.stringify(positions));
    */
    
    // No hacer nada, para conservar las posiciones definidas
    console.log("Función de guardado desactivada para mantener posiciones consistentes");
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
