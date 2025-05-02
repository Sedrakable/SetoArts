export function getOptimalColumnCount(
  itemCount: number,
  columnOption1: number,
  columnOption2: number
): number {
  const rem1 = itemCount % columnOption1;
  const rem2 = itemCount % columnOption2;

  // If both are clean, pick the higher column count
  if (rem1 === 0 && rem2 === 0) {
    return Math.max(columnOption1, columnOption2);
  }

  // If only one is clean, return it
  if (rem1 === 0) return columnOption1;
  if (rem2 === 0) return columnOption2;

  // Neither clean — pick the one with larger remainder
  return rem1 > rem2 ? columnOption1 : columnOption2;
}
