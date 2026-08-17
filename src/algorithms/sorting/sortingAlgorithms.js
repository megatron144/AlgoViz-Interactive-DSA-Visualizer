// Sorting Algorithms Step Generators

export function generateSortingSteps(algoKey, originalArray) {
  const arr = [...originalArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;

  function pushStep(meta) {
    steps.push({
      array: [...meta.arr || arr],
      comparing: meta.comparing || [],
      swapping: meta.swapping || [],
      pivot: meta.pivot !== undefined ? meta.pivot : null,
      sorted: meta.sorted || [],
      stats: { comparisons, swaps, accesses },
      description: meta.desc || '',
      line: meta.line || 1
    });
  }

  pushStep({ arr, desc: 'Initial array state ready to sort.', line: 1 });

  switch (algoKey) {
    case 'bubble-sort': {
      const n = arr.length;
      const sortedIndices = [];
      for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          accesses += 2;
          pushStep({
            comparing: [j, j + 1],
            sorted: [...sortedIndices],
            desc: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
            line: 5
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            accesses += 4;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
            pushStep({
              swapping: [j, j + 1],
              sorted: [...sortedIndices],
              desc: `Swapped arr[${j}] and arr[${j + 1}] because ${arr[j + 1]} > ${arr[j]}.`,
              line: 6
            });
          }
        }
        sortedIndices.push(n - i - 1);
        if (!swapped) {
          for (let k = 0; k < n - i - 1; k++) sortedIndices.push(k);
          break;
        }
      }
      sortedIndices.push(0);
      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Sorting completed successfully!', line: 11 });
      break;
    }

    case 'selection-sort': {
      const n = arr.length;
      const sortedIndices = [];
      for (let i = 0; i < n; i++) {
        let minIdx = i;
        pushStep({
          comparing: [minIdx],
          sorted: [...sortedIndices],
          desc: `Looking for minimum element in unsorted subarray starting at index ${i}.`,
          line: 4
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          accesses += 2;
          pushStep({
            comparing: [minIdx, j],
            sorted: [...sortedIndices],
            desc: `Comparing current minimum arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]}).`,
            line: 6
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            pushStep({
              comparing: [minIdx],
              sorted: [...sortedIndices],
              desc: `Found new minimum element ${arr[minIdx]} at index ${minIdx}.`,
              line: 7
            });
          }
        }

        if (minIdx !== i) {
          swaps++;
          accesses += 4;
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          pushStep({
            swapping: [i, minIdx],
            sorted: [...sortedIndices],
            desc: `Swapping minimum element ${arr[i]} into its sorted position at index ${i}.`,
            line: 10
          });
        }
        sortedIndices.push(i);
      }
      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Selection Sort completed!', line: 12 });
      break;
    }

    case 'insertion-sort': {
      const n = arr.length;
      const sortedIndices = [0];
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        accesses++;
        let j = i - 1;
        pushStep({
          comparing: [i],
          sorted: [...sortedIndices],
          desc: `Current key to insert is arr[${i}] = ${key}.`,
          line: 4
        });

        while (j >= 0) {
          comparisons++;
          accesses++;
          pushStep({
            comparing: [j, j + 1],
            sorted: [...sortedIndices],
            desc: `Checking if arr[${j}] (${arr[j]}) > key (${key}).`,
            line: 6
          });

          if (arr[j] > key) {
            swaps++;
            accesses += 2;
            arr[j + 1] = arr[j];
            pushStep({
              swapping: [j + 1],
              sorted: [...sortedIndices],
              desc: `Shifted arr[${j}] (${arr[j]}) one position right to index ${j + 1}.`,
              line: 7
            });
            j--;
          } else {
            break;
          }
        }
        arr[j + 1] = key;
        accesses++;
        sortedIndices.push(i);
        pushStep({
          swapping: [j + 1],
          sorted: [...sortedIndices],
          desc: `Inserted key ${key} into position index ${j + 1}.`,
          line: 10
        });
      }
      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Insertion Sort completed!', line: 12 });
      break;
    }

    case 'quick-sort': {
      const sortedIndices = [];

      function partition(low, high) {
        const pivot = arr[high];
        accesses++;
        let i = low - 1;

        pushStep({
          pivot: high,
          comparing: [high],
          sorted: [...sortedIndices],
          desc: `Chosen pivot arr[${high}] = ${pivot}. Partitioning range [${low}, ${high}].`,
          line: 11
        });

        for (let j = low; j < high; j++) {
          comparisons++;
          accesses += 2;
          pushStep({
            pivot: high,
            comparing: [j, high],
            sorted: [...sortedIndices],
            desc: `Comparing arr[${j}] (${arr[j]}) <= pivot (${pivot}).`,
            line: 14
          });

          if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
              swaps++;
              accesses += 4;
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              pushStep({
                pivot: high,
                swapping: [i, j],
                sorted: [...sortedIndices],
                desc: `Swapping arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}) to place smaller element on left.`,
                line: 16
              });
            }
          }
        }

        swaps++;
        accesses += 4;
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        sortedIndices.push(i + 1);

        pushStep({
          pivot: i + 1,
          swapping: [i + 1, high],
          sorted: [...sortedIndices],
          desc: `Placed pivot ${pivot} into its final sorted position at index ${i + 1}.`,
          line: 20
        });

        return i + 1;
      }

      function qSort(low, high) {
        if (low < high) {
          const pi = partition(low, high);
          qSort(low, pi - 1);
          qSort(pi + 1, high);
        } else if (low === high) {
          sortedIndices.push(low);
        }
      }

      qSort(0, arr.length - 1);
      pushStep({ sorted: Array.from({ length: arr.length }, (_, idx) => idx), desc: 'Quick Sort completed in O(N log N)!', line: 7 });
      break;
    }

    case 'merge-sort': {
      const sortedIndices = [];

      function merge(l, m, r) {
        const leftArr = arr.slice(l, m + 1);
        const rightArr = arr.slice(m + 1, r + 1);
        accesses += (r - l + 1);
        let i = 0, j = 0, k = l;

        pushStep({
          comparing: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
          sorted: [...sortedIndices],
          desc: `Merging subarrays [${l}..${m}] and [${m + 1}..${r}].`,
          line: 10
        });

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          accesses += 2;
          pushStep({
            comparing: [l + i, m + 1 + j],
            sorted: [...sortedIndices],
            desc: `Comparing left element ${leftArr[i]} and right element ${rightArr[j]}.`,
            line: 13
          });

          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            accesses++;
            i++;
          } else {
            arr[k] = rightArr[j];
            accesses++;
            j++;
          }
          swaps++;
          pushStep({
            swapping: [k],
            sorted: [...sortedIndices],
            desc: `Placed ${arr[k]} into merged array at index ${k}.`,
            line: 14
          });
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          accesses += 2;
          swaps++;
          pushStep({
            swapping: [k],
            sorted: [...sortedIndices],
            desc: `Copying remaining left element ${arr[k]} to index ${k}.`,
            line: 17
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          accesses += 2;
          swaps++;
          pushStep({
            swapping: [k],
            sorted: [...sortedIndices],
            desc: `Copying remaining right element ${arr[k]} to index ${k}.`,
            line: 18
          });
          j++;
          k++;
        }
      }

      function mSort(l, r) {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          mSort(l, m);
          mSort(m + 1, r);
          merge(l, m, r);
        }
      }

      mSort(0, arr.length - 1);
      pushStep({ sorted: Array.from({ length: arr.length }, (_, idx) => idx), desc: 'Merge Sort completed!', line: 8 });
      break;
    }

    case 'heap-sort': {
      const n = arr.length;
      const sortedIndices = [];

      function heapify(length, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < length) {
          comparisons++;
          accesses += 2;
          if (arr[left] > arr[largest]) largest = left;
        }

        if (right < length) {
          comparisons++;
          accesses += 2;
          if (arr[right] > arr[largest]) largest = right;
        }

        if (largest !== i) {
          swaps++;
          accesses += 4;
          const temp = arr[i];
          arr[i] = arr[largest];
          arr[largest] = temp;
          pushStep({
            swapping: [i, largest],
            sorted: [...sortedIndices],
            desc: `Heapify: Swapped parent arr[${i}] with larger child arr[${largest}].`,
            line: 15
          });
          heapify(length, largest);
        }
      }

      // Build heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }

      pushStep({
        sorted: [],
        desc: 'Max-Heap structure established across array.',
        line: 5
      });

      // Extract elements from heap
      for (let i = n - 1; i > 0; i--) {
        swaps++;
        accesses += 4;
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        sortedIndices.push(i);

        pushStep({
          swapping: [0, i],
          sorted: [...sortedIndices],
          desc: `Extracted maximum root element ${arr[i]} and placed at end index ${i}.`,
          line: 8
        });

        heapify(i, 0);
      }
      sortedIndices.push(0);
      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Heap Sort completed!', line: 10 });
      break;
    }

    case 'shell-sort': {
      const n = arr.length;
      for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        pushStep({
          desc: `Applying gap interval = ${gap}.`,
          line: 3
        });
        for (let i = gap; i < n; i++) {
          const temp = arr[i];
          let j = i;
          while (j >= gap) {
            comparisons++;
            accesses += 2;
            pushStep({
              comparing: [j - gap, j],
              desc: `Comparing arr[${j - gap}] (${arr[j - gap]}) with arr[${j}] (${temp}).`,
              line: 6
            });
            if (arr[j - gap] > temp) {
              swaps++;
              accesses += 2;
              arr[j] = arr[j - gap];
              j -= gap;
              pushStep({
                swapping: [j + gap],
                desc: `Shifted arr[${j}] to position ${j + gap}.`,
                line: 7
              });
            } else {
              break;
            }
          }
          arr[j] = temp;
          accesses++;
        }
      }
      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Shell Sort completed!', line: 12 });
      break;
    }

    case 'counting-sort': {
      const n = arr.length;
      const maxVal = Math.max(...arr);
      const minVal = Math.min(...arr);
      const range = maxVal - minVal + 1;
      const count = new Array(range).fill(0);
      const output = new Array(n).fill(0);

      pushStep({ desc: `Counting Sort range: [${minVal}..${maxVal}] (${range} buckets).`, line: 3 });

      for (let i = 0; i < n; i++) {
        count[arr[i] - minVal]++;
        accesses++;
        pushStep({ comparing: [i], desc: `Counted frequency of ${arr[i]} (Count = ${count[arr[i] - minVal]}).`, line: 5 });
      }

      for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
      }

      for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
        accesses += 2;
        swaps++;
      }

      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        accesses++;
        pushStep({ swapping: [i], sorted: Array.from({ length: i + 1 }, (_, idx) => idx), desc: `Copied sorted element ${arr[i]} into index ${i}.`, line: 9 });
      }

      pushStep({ sorted: Array.from({ length: n }, (_, idx) => idx), desc: 'Counting Sort completed in O(N + K)!', line: 11 });
      break;
    }

    default:
      break;
  }

  return steps;
}
