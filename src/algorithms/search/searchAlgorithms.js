// Searching Algorithms Step Generator

export function generateSearchSteps(algoKey, array, target) {
  const steps = [];
  const n = array.length;
  let comparisons = 0;

  if (algoKey === 'linear-search') {
    steps.push({
      type: 'START',
      array: [...array],
      target,
      currentIndex: null,
      foundIndex: null,
      comparisons: 0,
      description: `Starting Linear Search for target ${target} across ${n} elements.`
    });

    for (let i = 0; i < n; i++) {
      comparisons++;
      steps.push({
        type: 'COMPARE',
        array: [...array],
        target,
        currentIndex: i,
        foundIndex: null,
        comparisons,
        description: `Checking index ${i}: array[${i}] = ${array[i]}. Does ${array[i]} === ${target}?`
      });

      if (array[i] === target) {
        steps.push({
          type: 'FOUND',
          array: [...array],
          target,
          currentIndex: i,
          foundIndex: i,
          comparisons,
          description: `Target ${target} found at index ${i} after ${comparisons} comparisons!`
        });
        return steps;
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      array: [...array],
      target,
      currentIndex: null,
      foundIndex: -1,
      comparisons,
      description: `Target ${target} not found in array after ${comparisons} comparisons.`
    });
  } else if (algoKey === 'binary-search') {
    // Note: Array must be sorted for binary search
    const sorted = [...array].sort((a, b) => a - b);
    let low = 0;
    let high = n - 1;

    steps.push({
      type: 'START',
      array: sorted,
      target,
      low,
      high,
      mid: null,
      foundIndex: null,
      comparisons: 0,
      description: `Starting Binary Search on sorted array for target ${target}. Range [${low}..${high}].`
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      comparisons++;

      steps.push({
        type: 'COMPARE',
        array: sorted,
        target,
        low,
        high,
        mid,
        foundIndex: null,
        comparisons,
        description: `Calculated mid = floor((${low} + ${high}) / 2) = ${mid}. array[${mid}] = ${sorted[mid]}.`
      });

      if (sorted[mid] === target) {
        steps.push({
          type: 'FOUND',
          array: sorted,
          target,
          low,
          high,
          mid,
          foundIndex: mid,
          comparisons,
          description: `Target ${target} found at index ${mid} in just ${comparisons} comparisons!`
        });
        return steps;
      } else if (sorted[mid] < target) {
        steps.push({
          type: 'GO_RIGHT',
          array: sorted,
          target,
          low: mid + 1,
          high,
          mid,
          comparisons,
          description: `${sorted[mid]} < ${target}. Target is in right half. Adjusting low = ${mid + 1}.`
        });
        low = mid + 1;
      } else {
        steps.push({
          type: 'GO_LEFT',
          array: sorted,
          target,
          low,
          high: mid - 1,
          mid,
          comparisons,
          description: `${sorted[mid]} > ${target}. Target is in left half. Adjusting high = ${mid - 1}.`
        });
        high = mid - 1;
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      array: sorted,
      target,
      low,
      high,
      mid: null,
      foundIndex: -1,
      comparisons,
      description: `Target ${target} not found after ${comparisons} comparisons.`
    });
  }

  return steps;
}
