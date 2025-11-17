//src/types/graph.d.ts
// Node types used in the graph
export interface GraphNode {
  id: string; // Unique node ID (e.g., "person-1", "film-3", "ship-10")
  name: string; // Visible label for the node
  type: "person" | "film" | "starship"; // Node category for styling
  color: string; // Node color used in custom rendering
}

// Edge types used in the graph
export interface GraphEdge {
  id: string; // Unique edge ID
  source: string; // ID of the source node
  target: string; // ID of the target node
  label?: string; // Optional label (e.g., "Appears in")
}

// Final normalized structure for graph rendering
export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
