warning: in the working copy of 'src/App.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 4b436fe..85ba47f 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -325,13 +325,12 @@[m [mconst initialEdges = [[m
   { id: 'e10-11', source: 'references', target: 'thankYou', animated: true }[m
 ];[m
 [m
[31m-// Función para cargar las posiciones guardadas[m
[32m+[m[32m// Intentar cargar posiciones guardadas desde localStorage[m
 const loadSavedNodePositions = () => {[m
   try {[m
     const savedPositions = localStorage.getItem('nodePositions');[m
     if (savedPositions) {[m
       const positions = JSON.parse(savedPositions);[m
[31m-      console.log('Cargando posiciones guardadas:', positions);[m
       return initialNodes.map(node => {[m
         if (positions[node.id]) {[m
           return { ...node, position: positions[node.id] };[m
[36m@@ -442,19 +441,9 @@[m [mfunction Flow() {[m
         onNodesChange(filteredChanges);[m
       } else {[m
         onNodesChange(changes);[m
[31m-        [m
[31m-        // Guardar posiciones automáticamente cuando hay cambios de posición[m
[31m-        const hasPositionChanges = changes.some(change => [m
[31m-          change.type === 'position' && !change.dragging[m
[31m-        );[m
[31m-        [m
[31m-        if (hasPositionChanges) {[m
[31m-          // Usamos setTimeout para evitar guardar durante el arrastre[m
[31m-          setTimeout(() => saveNodePositions(), 100);[m
[31m-        }[m
       }[m
     },[m
[31m-    [fixedPositions, onNodesChange, saveNodePositions][m
[32m+[m[32m    [fixedPositions, onNodesChange][m
   );[m
 [m
   // Función para guardar las posiciones actuales de los nodos[m
[36m@@ -466,8 +455,8 @@[m [mfunction Flow() {[m
     setSavedPositions(positions);[m
     localStorage.setItem('nodePositions', JSON.stringify(positions));[m
     [m
[31m-    // Comentamos la alerta para que no aparezca cada vez que se guardan posiciones[m
[31m-    // alert('¡Posiciones de nodos guardadas correctamente!');[m
[32m+[m[32m    // Mostrar notificación[m
[32m+[m[32m    alert('¡Posiciones de nodos guardadas correctamente!');[m
   }, [nodes]);[m
 [m
   // Función para restaurar las posiciones guardadas[m
[36m@@ -621,31 +610,6 @@[m [mfunction Flow() {[m
     }[m
   }, [fixedZoom, reactFlowInstance, zoomLevel, setZoom]);[m
   [m
[31m-  // Efecto para cargar posiciones guardadas al iniciar[m
[31m-  useEffect(() => {[m
[31m-    // Intentar restaurar posiciones guardadas al cargar la aplicación[m
[31m-    const storedPositions = localStorage.getItem('nodePositions');[m
[31m-    if (storedPositions) {[m
[31m-      try {[m
[31m-        const positions = JSON.parse(storedPositions);[m
[31m-        setSavedPositions(positions);[m
[31m-        console.log('Posiciones de nodos cargadas desde localStorage');[m
[31m-      } catch (error) {[m
[31m-        console.error('Error al parsear posiciones guardadas:', error);[m
[31m-      }[m
[31m-    }[m
[31m-  }, []);[m
[31m-  [m
[31m-  // Efecto para actualizar savedPositions cuando cambian los nodos[m
[31m-  useEffect(() => {[m
[31m-    // Actualizar el estado de posiciones guardadas cuando cambian los nodos[m
[31m-    const positions = {};[m
[31m-    nodes.forEach(node => {[m
[31m-      positions[node.id] = { ...node.position };[m
[31m-    });[m
[31m-    setSavedPositions(positions);[m
[31m-  }, [nodes]);[m
[31m-  [m
   // Función para alternar el zoom fijo[m
   const toggleFixedZoom = () => {[m
     setFixedZoom(!fixedZoom);[m
