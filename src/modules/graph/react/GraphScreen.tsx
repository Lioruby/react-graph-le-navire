import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
} from "react-force-graph-2d";
import { useGraphScreen } from "./use-graph-screen.hook";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface GraphNode {
  id: string;
  name: string;
  community: number;
  degree: number;
  x?: number;
  y?: number;
}

export default function GraphScreen(): JSX.Element {
  const { graphData, loading } = useGraphScreen();

  const fg = useRef<ForceGraphMethods<GraphNode, LinkObject>>();

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    if (fg.current && graphData) {
      fg.current.d3Force("link")?.distance((link: LinkObject) => {
        const source = link.source as GraphNode;
        const target = link.target as GraphNode;
        return source.community === target.community ? 30 : 80;
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
        nodeColor={(node) =>
          colorScale(String((node as unknown as GraphNode).community))
        }
        cooldownTicks={300}
        nodeVal={(node) => 0.2 + (node as GraphNode).degree * 0.1}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const n = node as GraphNode;
          const label = (n.id || "").slice(0, 2).toUpperCase();

          const fontSize = 20 / globalScale;
          ctx.font = `${fontSize}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";

          ctx.fillText(label, n.x || 0, n.y || 0);
        }}
        nodeLabel={(node) => (node as GraphNode).name || (node as GraphNode).id}
        nodeRelSize={5}
        linkColor={() => "rgba(255, 255, 255, 0.3)"}
        linkWidth={1}
        linkDirectionalArrowColor={() => "#fff"}
      />
    </div>
  );
}
