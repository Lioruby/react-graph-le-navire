export namespace GraphDomainModel {
  export type Node = {
    id: string;
    name: string;
    profilePictureUrl: string | null;
    trustScore: number;
    coordinates: {
      x: number;
      y: number;
    };
  };

  export type Link = {
    source: string;
    target: string;
  };

  export type GraphData = {
    nodes: Node[];
    links: Link[];
  };
}
