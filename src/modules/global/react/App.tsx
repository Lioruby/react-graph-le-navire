import ForceGraph from "react-force-graph-2d";

function App() {
  const graphData = {
    nodes: [
      { id: "A", name: "Node A" },
      { id: "B", name: "Node B" },
      { id: "C", name: "Node C" },
      { id: "D", name: "Node D" },
      { id: "E", name: "Node E" },
      { id: "F", name: "Node F" },
      { id: "G", name: "Node G" },
      { id: "H", name: "Node H" },
      { id: "I", name: "Node I" },
      { id: "J", name: "Node J" },
    ],
    links: [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "A", target: "C" },
      { source: "C", target: "A" },
      { source: "D", target: "E" },
      { source: "E", target: "F" },
      { source: "F", target: "G" },
      { source: "G", target: "H" },
      { source: "H", target: "I" },
      { source: "I", target: "J" },
    ],
  };

  return (
    <div
      data-testid="app"
      className="flex flex-col items-center justify-center h-screen bg-gray-900"
    >
      <ForceGraph
        graphData={graphData}
        nodeLabel="name"
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={0.01}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        nodeColor={() => "rgba(255, 255, 255, 1)"}
        linkColor={() => "rgba(255, 255, 255, 0.5)"}
        linkVisibility
        backgroundColor="transparent"
      />
    </div>
  );
}

export default App;
