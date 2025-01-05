import { useSelector } from "react-redux";
import { selectGraph } from "../core/selectors/graph-data.selector";
import { useAppDispatch } from "@root/modules/store/store";
import { useEffect, useMemo, useState, useRef } from "react";
import { getGraphData } from "../core/usecases/get-graph-data.usecase";
import { ForceGraphMethods, LinkObject } from "react-force-graph-2d";
import { GraphNode } from "./GraphScreen";

export const useGraphScreen = () => {
  const graph = useSelector(selectGraph);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGraphData());
  }, [dispatch]);

  const { graphData, loading } = useMemo(() => {
    const graphDataCopy = {
      nodes: graph.data.nodes.map((node) => ({
        ...node,
        x: node.coordinates.x * 10000,
        y: node.coordinates.y * 10000,
      })),
      links: graph.data.links.map((link) => ({ ...link })),
    };

    return {
      graphData: graphDataCopy,
      loading: graph.loading,
    };
  }, [graph]);

  const resetPositions = () => {
    dispatch(getGraphData());
  };

  const fg = useRef<ForceGraphMethods<GraphNode, LinkObject>>();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

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
  }, [graphData, fg]);

  const onSelectNodeChange = (node: GraphNode | null) => {
    setSelectedNode(node);
  };

  return {
    graphData,
    loading,
    resetPositions,
    selectedNode,
    onSelectNodeChange,
    fg,
    imageCache,
  };
};
