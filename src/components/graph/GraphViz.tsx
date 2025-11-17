//src/components/graph/GraphViz.tsx

import React, { useCallback, useEffect, useRef } from "react";
import {
  ReactFlow as RFComponent,
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  addEdge,
  type Connection,
  type BackgroundVariant,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { GraphData } from "../../types/graph";
import { convertToReactFlow } from "../../utils/graph/graphUtils";

interface GraphVizProps {
  data: GraphData;
}

const FlowRenderer: React.FC<GraphVizProps> = ({ data }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reactFlow = useReactFlow();

  // Convert custom graph structure into React Flow format
  const { nodes: initialNodes, edges: initialEdges } = convertToReactFlow(data);

  // React Flow state hooks for nodes and edges
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle edge creation (unused for static graphs, but required by React Flow)
  const onConnect = useCallback(
    (params: Connection) => {
      //Unexpected any. Specify a different type.eslint
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Re-fit the graph whenever container size changes (responsive view)
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(() => {
      reactFlow.fitView({ padding: 0.2, duration: 300 });
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [reactFlow]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <RFComponent
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Controls />
        <Background variant={"lines" as BackgroundVariant} gap={12} size={1} />
      </RFComponent>
    </div>
  );
};

export const GraphViz: React.FC<GraphVizProps> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <FlowRenderer data={data} />
      </ReactFlowProvider>
    </div>
  );
};
