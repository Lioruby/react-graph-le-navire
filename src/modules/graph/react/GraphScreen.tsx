import ForceGraph from "react-force-graph-2d";
import { useGraphScreen } from "./use-graph-screen.hook";

export default function GraphScreen() {
  const { graphData, loading } = useGraphScreen();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
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
