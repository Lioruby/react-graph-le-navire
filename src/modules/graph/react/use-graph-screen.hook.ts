import { useSelector } from "react-redux";
import { selectGraph } from "../core/selectors/graph-data.selector";
import { useAppDispatch } from "@root/modules/store/store";
import { useEffect, useMemo } from "react";
import { getGraphData } from "../core/usecases/get-graph-data.usecase";

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

  return { graphData, loading };
};
