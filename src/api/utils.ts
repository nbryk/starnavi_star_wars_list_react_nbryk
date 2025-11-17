//src/api/utils.ts
/**
 * Limits concurrent execution of promises by processing them in batches.
 * @param array Array of items to process.
 * @param fn Function that returns a promise for each item.
 * @param limit Maximum number of concurrent promises (default: 3).
 * @returns Promise with an array of results.
 */
export async function throttledPromiseAll<T, R>(
  array: T[],
  fn: (item: T) => Promise<R>,
  limit: number = 3
): Promise<R[]> {
  const results: R[] = [];
  const activePromises: Promise<void>[] = [];
  let index = 0;

  while (index < array.length) {
    const item = array[index];

    // Create a promise for the current item
    const promise = fn(item).then((result) => {
      results.push(result);
    });

    activePromises.push(promise);
    index++;

    // If limit is reached, or this is the last item, wait for one to complete
    if (activePromises.length >= limit || index === array.length) {
      // Wait for the fastest promise to finish
      await Promise.race(activePromises);

      // Remove the completed promise from the active list
      const completedIndex = activePromises.findIndex(
        (p) => p === Promise.resolve()
      );
      if (completedIndex !== -1) {
        activePromises.splice(completedIndex, 1);
      }
    }
  }

  // Wait for any remaining promises
  await Promise.all(activePromises);

  return results;
}
