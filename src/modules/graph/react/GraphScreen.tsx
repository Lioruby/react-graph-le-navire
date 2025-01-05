import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
} from "react-force-graph-2d";
import { useGraphScreen } from "./use-graph-screen.hook";
import { useEffect, useRef, useState } from "react";

interface GraphNode {
  id: string;
  name: string;
  x?: number;
  y?: number;
  profilePictureUrl: string | null;
  trustScore: number;
}

export default function GraphScreen(): JSX.Element {
  const { graphData, loading } = useGraphScreen();

  const fg = useRef<ForceGraphMethods<GraphNode, LinkObject>>();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const initialPositions = useRef<Map<string, { x: number; y: number }>>(
    new Map()
  );

  useEffect(() => {
    if (graphData) {
      graphData.nodes.forEach((node: GraphNode) => {
        if (node.x !== undefined && node.y !== undefined) {
          initialPositions.current.set(node.id, { x: node.x, y: node.y });
        }
      });
    }
  }, [graphData]);

  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (!graphData) return;

    graphData.nodes.forEach((node: GraphNode) => {
      if (
        node.profilePictureUrl &&
        !imageCache.current.has(node.profilePictureUrl)
      ) {
        const img = new Image();
        img.src = node.profilePictureUrl;
        img.onload = () => {
          imageCache.current.set(node.profilePictureUrl!, img);
        };
      }
    });
  }, [graphData]);

  useEffect(() => {
    if (fg.current && graphData) {
      fg.current.d3Force("link")?.distance(() => {
        return 1000;
      });

      fg.current.d3Force("charge")?.strength(() => {
        return -1000;
      });

      fg.current.d3ReheatSimulation();
    }
  }, [graphData]);

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

          // Utiliser l'image en cache si disponible
          if (
            n.profilePictureUrl &&
            imageCache.current.has(n.profilePictureUrl)
          ) {
            const img = imageCache.current.get(n.profilePictureUrl)!;

            ctx.save();
            ctx.beginPath();
            ctx.arc(n.x || 0, n.y || 0, nodeSize, 0, 2 * Math.PI);
            ctx.clip();

            const imgAspectRatio = img.width / img.height;
            const nodeAspectRatio = 1;

            let drawWidth = nodeSize * 2;
            let drawHeight = nodeSize * 2;

            if (imgAspectRatio > nodeAspectRatio) {
              drawWidth = (nodeSize * 2 * imgAspectRatio) / nodeAspectRatio;
              drawHeight = nodeSize * 2;
            } else {
              drawWidth = nodeSize * 2;
              drawHeight = (nodeSize * 2 * nodeAspectRatio) / imgAspectRatio;
            }

            const drawX = (n.x || 0) - drawWidth / 2;
            const drawY = (n.y || 0) - drawHeight / 2;

            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
          } else {
            // Fallback si l'image n'est pas encore chargée
            ctx.beginPath();
            ctx.arc(n.x || 0, n.y || 0, nodeSize, 0, 2 * Math.PI);
            ctx.fillStyle = "#001A6E";
            ctx.fill();
          }

          // Ajouter un contour jaune pour le nœud sélectionné et les nœuds connectés
          if (selectedNode?.id === n.id || isConnected) {
            ctx.beginPath();
            ctx.arc(n.x || 0, n.y || 0, nodeSize, 0, 2 * Math.PI);
            ctx.strokeStyle = "#FFC145";
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }}
        onNodeClick={(node) => {
          const graphNode = node as GraphNode;
          setSelectedNode(selectedNode?.id === graphNode.id ? null : graphNode);
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
        // onNodeDragEnd={(node) => {
        //   // Mettre à jour les coordonnées du nœud après le drag
        //   const n = node as GraphNode;
        //   n.x = n.x;
        //   n.y = n.y;
        // }}
      />
      <button
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-white"
        onClick={() => {
          if (graphData && fg.current) {
            graphData.nodes.forEach((node: GraphNode) => {
              const initialPos = initialPositions.current.get(node.id);
              if (initialPos) {
                node.x = initialPos.x;
                node.y = initialPos.y;
              }
            });
            fg.current.d3ReheatSimulation();
          }
        }}
      >
        Réinitialiser les positions
      </button>
    </div>
  );
}
