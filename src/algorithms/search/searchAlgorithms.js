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
  } else if (algoKey === 'ternary-search') {
    // Note: Array must be sorted for ternary search
    const sorted = [...array].sort((a, b) => a - b);
    let low = 0;
    let high = n - 1;

    steps.push({
      type: 'START',
      array: sorted,
      target,
      low,
      high,
      mid1: null,
      mid2: null,
      foundIndex: null,
      comparisons: 0,
      description: `Starting Ternary Search on sorted array for target ${target}. Range [${low}..${high}].`
    });

    while (low <= high) {
      const mid1 = low + Math.floor((high - low) / 3);
      const mid2 = high - Math.floor((high - low) / 3);

      // Check mid1
      comparisons++;
      steps.push({
        type: 'COMPARE_MID1',
        array: sorted,
        target,
        low,
        high,
        mid1,
        mid2,
        foundIndex: null,
        comparisons,
        description: `Calculated mid1 = ${mid1}, mid2 = ${mid2}. Checking mid1: array[${mid1}] = ${sorted[mid1]}.`
      });

      if (sorted[mid1] === target) {
        steps.push({
          type: 'FOUND',
          array: sorted,
          target,
          low,
          high,
          mid1,
          mid2,
          foundIndex: mid1,
          comparisons,
          description: `Target ${target} found at mid1 (index ${mid1}) after ${comparisons} comparisons!`
        });
        return steps;
      }

      // Check mid2
      comparisons++;
      steps.push({
        type: 'COMPARE_MID2',
        array: sorted,
        target,
        low,
        high,
        mid1,
        mid2,
        foundIndex: null,
        comparisons,
        description: `Checking mid2: array[${mid2}] = ${sorted[mid2]}. Does ${sorted[mid2]} === ${target}?`
      });

      if (sorted[mid2] === target) {
        steps.push({
          type: 'FOUND',
          array: sorted,
          target,
          low,
          high,
          mid1,
          mid2,
          foundIndex: mid2,
          comparisons,
          description: `Target ${target} found at mid2 (index ${mid2}) after ${comparisons} comparisons!`
        });
        return steps;
      }

      if (target < sorted[mid1]) {
        steps.push({
          type: 'GO_LEFT',
          array: sorted,
          target,
          low,
          high: mid1 - 1,
          mid1,
          mid2,
          comparisons,
          description: `${target} < ${sorted[mid1]}. Target is in left segment [${low}..${mid1 - 1}]. Adjusting high = ${mid1 - 1}.`
        });
        high = mid1 - 1;
      } else if (target > sorted[mid2]) {
        steps.push({
          type: 'GO_RIGHT',
          array: sorted,
          target,
          low: mid2 + 1,
          high,
          mid1,
          mid2,
          comparisons,
          description: `${target} > ${sorted[mid2]}. Target is in right segment [${mid2 + 1}..${high}]. Adjusting low = ${mid2 + 1}.`
        });
        low = mid2 + 1;
      } else {
        steps.push({
          type: 'GO_MID',
          array: sorted,
          target,
          low: mid1 + 1,
          high: mid2 - 1,
          mid1,
          mid2,
          comparisons,
          description: `${sorted[mid1]} < ${target} < ${sorted[mid2]}. Target is in middle segment [${mid1 + 1}..${mid2 - 1}]. Adjusting range to [${mid1 + 1}..${mid2 - 1}].`
        });
        low = mid1 + 1;
        high = mid2 - 1;
      }
    }

    steps.push({
      type: 'NOT_FOUND',
      array: sorted,
      target,
      low,
      high,
      mid1: null,
      mid2: null,
      foundIndex: -1,
      comparisons,
      description: `Target ${target} not found after ${comparisons} comparisons.`
    });
  }

  return steps;
}
