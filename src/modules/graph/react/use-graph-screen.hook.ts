import { useSelector } from "react-redux";
import { selectGraph } from "../core/selectors/graph-data.selector";
import { useAppDispatch } from "@root/modules/store/store";
import { useEffect } from "react";
import { getGraphData } from "../core/usecases/get-graph-data.usecase";

export const useGraphScreen = () => {
  const graph = useSelector(selectGraph);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGraphData());
  }, [dispatch]);

  // warning: The lib cannot work with frozen objects
  const graphDataCopy = {
    nodes: graph.data.nodes.map((node) => ({ ...node })),
    links: graph.data.links.map((link) => ({ ...link })),
  };

  return { graphData: graphDataCopy, loading: graph.loading };
};
