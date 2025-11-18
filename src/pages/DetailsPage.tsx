//src/pages/DetailsPage.tsx
import { useParams } from "react-router-dom";
import { useHeroDetails } from "../hooks/useHeroDetails";
import { useMemo } from "react";
import { generateGraphData } from "../utils/graph/graphUtils";
import { GraphViz } from "../components/graph/GraphViz";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { hero, films, starships, isLoading, error } = useHeroDetails(id);

  // Build graph structure only when input data changes
  const graphData = useMemo(() => {
    if (!hero) {
      return { nodes: [], edges: [] };
    }

    return generateGraphData(hero, films, starships);
  }, [hero, films, starships]);

  if (!id) {
    return (
      <div className="text-center p-8 text-red-600">
        Error: Hero ID not found.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center p-8">Loading hero data...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 font-bold">{error}</div>
    );
  }

  if (!hero) {
    return <div className="text-center p-8">No hero found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hero Details: {hero.name}</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Connection Graph</h2>

        <div className="border p-6 h-[600px] bg-gray-50 relative">
          <GraphViz data={graphData} />
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
