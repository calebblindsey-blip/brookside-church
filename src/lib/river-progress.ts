/** Convert a vertical reading position to arc-length progress on a downward path.
 * Samples are Y coordinates taken at evenly spaced distances along that path.
 */
export function progressAtY(samples: readonly number[], targetY: number): number {
  if (samples.length < 2 || targetY <= samples[0]) return 0;
  const last = samples.length - 1;
  if (targetY >= samples[last]) return 1;
  let low = 0;
  let high = last;
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2);
    if (samples[middle] <= targetY) low = middle;
    else high = middle;
  }
  const span = samples[high] - samples[low];
  const fraction = span > 0 ? (targetY - samples[low]) / span : 0;
  return (low + fraction) / last;
}
