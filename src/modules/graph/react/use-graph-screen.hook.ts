import { useSelector } from "react-redux";
import { selectGraph } from "../core/selectors/graph-data.selector";
import { useAppDispatch } from "@root/modules/store/store";
import { useEffect, useMemo } from "react";
import { getGraphData } from "../core/usecases/get-graph-data.usecase";

import Graph from "graphology";
import louvain from "graphology-communities-louvain";

type Node = {
  id: string;
  name: string;
  community: number;
  degree: number;
};

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
        community: 0,
        degree: 0,
      })),
      links: graph.data.links.map((link) => ({ ...link })),
    };

    const G = new Graph({ type: "undirected" });

    graphDataCopy.nodes.forEach((node) => {
      G.addNode(node.id);
    });

    graphDataCopy.links.forEach((link) => {
      G.addUndirectedEdge(link.source, link.target);
    });

    const communities = louvain(G);

    graphDataCopy.nodes.forEach((node: Node) => {
      node.community = communities[node.id];
      node.degree = G.degree(node.id);
    });

    return {
      graphData: graphDataCopy,
      loading: graph.loading,
    };
  }, [graph]);

  return { graphData, loading };
};
