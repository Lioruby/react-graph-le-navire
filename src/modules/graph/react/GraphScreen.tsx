import ForceGraph2D from "react-force-graph-2d";
import { useGraphScreen } from "./use-graph-screen.hook";
import {
  addYellowBorder,
  drawDefaultNode,
  drawImageNode,
} from "./graph-canvas.helper";

export interface GraphNode {
  id: string;
  name: string;
  x?: number;
  y?: number;
  profilePictureUrl: string | null;
  trustScore: number;
}

export default function GraphScreen(): JSX.Element {
  const {
    graphData,
    loading,
    resetPositions,
    selectedNode,
    onSelectNodeChange,
    fg,
    imageCache,
  } = useGraphScreen();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <ForceGraph2D
        ref={fg}
        graphData={graphData}
        backgroundColor="#000"
        cooldownTicks={200}
        enableNodeDrag={true}
        nodeCanvasObjectMode={() => "after"}
        nodeVal={(node) => {
          const n = node as GraphNode;
          return n.trustScore * 0.5;
        }}
        nodeCanvasObject={(node, ctx) => {
          const n = node as GraphNode;
          const nodeSize = n.trustScore * 0.5;

          const isConnected =
            selectedNode &&
            graphData?.links.some(
              (link) =>
                ((link.source as unknown as GraphNode).id === selectedNode.id &&
                  (link.target as unknown as GraphNode).id === n.id) ||
                ((link.target as unknown as GraphNode).id === selectedNode.id &&
                  (link.source as unknown as GraphNode).id === n.id)
            );

          if (
            n.profilePictureUrl &&
            imageCache.current.has(n.profilePictureUrl)
          ) {
            drawImageNode(n, ctx, nodeSize, imageCache.current);
          } else {
            drawDefaultNode(n, ctx);
          }

          if (selectedNode?.id === n.id || isConnected) {
            addYellowBorder(n, nodeSize, ctx);
          }
        }}
        onNodeClick={(node) => {
          const graphNode = node as GraphNode;
          onSelectNodeChange(
            selectedNode?.id === graphNode.id ? null : graphNode
          );
        }}
        nodeLabel={(node) => (node as GraphNode).id}
        nodeRelSize={5}
        linkColor={(link) => {
          const source = link.source as GraphNode;
          const target = link.target as GraphNode;
          return selectedNode &&
            (source.id === selectedNode.id || target.id === selectedNode.id)
            ? "#FFC145"
            : "rgba(255, 255, 255, 0.3)";
        }}
        linkWidth={() => 1}
        linkDirectionalArrowColor={() => "#fff"}
        linkDirectionalParticles={(link) => {
          const source = link.source as GraphNode;
          const target = link.target as GraphNode;
          return selectedNode &&
            (source.id === selectedNode.id || target.id === selectedNode.id)
            ? 4
            : 0;
        }}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleColor={() => "white"}
      />
      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-white"
        onClick={resetPositions}
      >
        Réinitialiser les positions
      </button>
    </div>
  );
}
