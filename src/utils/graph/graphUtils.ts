//src/utils/graph/graphUtils.ts

import type { GraphData, GraphEdge, GraphNode } from "../../types/graph";
import type { Film, Person, Starship } from "../../types/sw";
import type { Node as RFNode, Edge as RFEdge } from "@xyflow/react";

/**
 * Extracts the numeric ID from the end of a SWAPI resource URL.
 * Example: "https://swapi.dev/api/people/1/" → "1"
 */
const extractId = (url: string): string => {
  return url.split("/").filter(Boolean).pop() || "";
};

/**
 * Builds a graph structure (nodes + edges) for a hero,
 * including films, starships, and connections between them.
 */
export function generateGraphData(
  hero: Person,
  films: Film[],
  starships: Starship[]
): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // ----- 1. Hero Node -----
  const heroId = `person-${extractId(hero.url)}`;

  nodes.push({
    id: heroId,
    name: hero.name,
    type: "person",
    color: "#ffc107", // Yellow for hero
  });

  // ----- 2. Film Nodes + Hero → Film Edges -----
  films.forEach((film, index) => {
    const filmId = `film-${extractId(film.url)}`;

    nodes.push({
      id: filmId,
      name: `Ep. ${film.episode_id}: ${film.title}`,
      type: "film",
      color: "#00bcd4", // Cyan for films
    });

    edges.push({
      id: `edge-film-${index}`,
      source: heroId,
      target: filmId,
      label: `Appeared in Ep. ${film.episode_id}`,
    });
  });

  // ----- 3. Starship Nodes -----
  starships.forEach((ship) => {
    const shipId = `starship-${extractId(ship.url)}`;
    nodes.push({
      id: shipId,
      name: ship.name,
      type: "starship",
      color: "#e91e63", // Pink for starships
    });
  });

  // ----- 4. Film → Starship Edges -----
  films.forEach((film, filmIndex) => {
    const filmId = `film-${extractId(film.url)}`;

    // SWAPI provides numeric starship IDs for films
    const starshipIdsInFilm: number[] = film.starships;

    starships.forEach((heroShip, heroShipIndex) => {
      const heroShipUrlId = parseInt(extractId(heroShip.url));

      if (starshipIdsInFilm.includes(heroShipUrlId)) {
        edges.push({
          id: `edge-ship-${filmIndex}-${heroShipIndex}`,
          source: filmId,
          target: `starship-${heroShipUrlId}`,
          label: `Used in ${film.title}`,
        });
      }
    });
  });

  // ----- 5. Remove Duplicate Nodes -----
  // Ensures all node IDs are unique before visualizing
  const uniqueNodes = Array.from(
    new Map(nodes.map((node) => [node.id, node])).values()
  );

  return {
    nodes: uniqueNodes,
    edges: edges,
  };
}

/**
 * Converts internal GraphData into React Flow format.
 */
export function convertToReactFlow(graphData: GraphData): {
  nodes: RFNode[];
  edges: RFEdge[];
} {
  const rfNodes: RFNode[] = graphData.nodes.map((n) => ({
    id: n.id,
    type: n.type,
    data: { label: n.name, color: n.color },

    // Initial random positioning
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    style: {
      backgroundColor: n.color,
      color: "#fff",
      padding: 10,
      borderRadius: 5,
    },
  }));

  const rfEdges: RFEdge[] = graphData.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    type: "default",
    animated: true,
    style: { strokeWidth: 2 },
  }));

  return { nodes: rfNodes, edges: rfEdges };
}
