//src/utils/apiUtils.ts

/**
 * Generates a relative API path for a resource based on its type and numeric ID.
 * Example: generateResourcePath("films", 1) → "films/1/"
 *
 * @param type - Supported resource category ("films" | "starships")
 * @param id - Numeric resource ID
 */
export function generateResourcePath(
  type: "films" | "starships",
  id: number
): string {
  return `${type}/${id}/`;
}

/**
 * Converts an array of numeric IDs into an array of relative API paths.
 * Example: [1, 2] → ["films/1/", "films/2/"]
 *
 * @param type - Resource category
 * @param ids - Array of numeric IDs
 */
export function generatePathsFromIds(
  type: "films" | "starships",
  ids: number[]
): string[] {
  return ids.map((id) => generateResourcePath(type, id));
}
