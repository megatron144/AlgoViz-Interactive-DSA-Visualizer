export const ALGO_DETAILS = {
  // =========================================================================
  // 0. FUNDAMENTAL DATA STRUCTURES (Stack, Queue, Heaps)
  // =========================================================================
  'stack': {
    name: 'Stack (LIFO - Last In, First Out)',
    category: 'Linear Data Structure',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      push: 'O(1)',
      pop: 'O(1)',
      peek: 'O(1)'
    },
    spaceComplexity: 'O(N)',
    description: 'A linear data structure that follows the Last In, First Out (LIFO) principle. Elements can only be added (push) and removed (pop) from the top of the stack.',
    keyPoints: [
      'LIFO (Last In First Out) discipline',
      'O(1) constant time push, pop, and peek operations',
      'Foundation for DFS, expression evaluation, syntax parsing, and browser history'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 20 - Valid Parentheses',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/valid-parentheses/'
      },
      {
        title: 'LeetCode 155 - Min Stack',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/min-stack/'
      },
      {
        title: 'LeetCode 739 - Daily Temperatures (Monotonic Stack)',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/daily-temperatures/'
      },
      {
        title: 'LeetCode 84 - Largest Rectangle in Histogram',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/'
      },
      {
        title: 'Codeforces 5C - Longest Regular Bracket Sequence',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/5/C'
      },
      {
        title: 'Codeforces 343B - Alternating Current',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/343/B'
      }
    ]
  },

  'queue': {
    name: 'Queue (FIFO - First In, First Out)',
    category: 'Linear Data Structure',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      enqueue: 'O(1)',
      dequeue: 'O(1)',
      peek: 'O(1)'
    },
    spaceComplexity: 'O(N)',
    description: 'A linear data structure following the First In, First Out (FIFO) order. Elements enter at the rear (enqueue) and exit from the front (dequeue).',
    keyPoints: [
      'FIFO (First In First Out) ordering',
      'O(1) enqueue and dequeue when implemented with circular buffer or linked list',
      'Essential for Breadth-First Search (BFS), task schedulers, and buffer pipelines'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 232 - Implement Queue using Stacks',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/implement-queue-using-stacks/'
      },
      {
        title: 'LeetCode 622 - Design Circular Queue',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/design-circular-queue/'
      },
      {
        title: 'LeetCode 239 - Sliding Window Maximum (Monotonic Queue)',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/sliding-window-maximum/'
      },
      {
        title: 'LeetCode 933 - Number of Recent Calls',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/number-of-recent-calls/'
      },
      {
        title: 'Codeforces 1512D - Corrupted Array',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1512/D'
      }
    ]
  },

  'max-heap': {
    name: 'Binary Max-Heap',
    category: 'Tree & Priority Queue',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
      peekMax: 'O(1)',
      insert: 'O(log N)',
      extractMax: 'O(log N)',
      heapify: 'O(N)'
    },
    spaceComplexity: 'O(N)',
    description: 'A complete binary tree where the key at root is the maximum among all keys present in the binary heap, and the same property recursively holds for all subtrees.',
    keyPoints: [
      'Complete binary tree stored compactly in contiguous array: parent=(i-1)/2, left=2i+1, right=2i+2',
      'O(1) maximum element lookup at root',
      'O(log N) insertion with siftUp and extraction with siftDown',
      'Linear O(N) bottom-up heap construction'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 215 - Kth Largest Element in an Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
      },
      {
        title: 'LeetCode 1046 - Last Stone Weight',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/last-stone-weight/'
      },
      {
        title: 'LeetCode 295 - Find Median from Data Stream (Two Heaps)',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/find-median-from-data-stream/'
      },
      {
        title: 'Codeforces 1353D - Constructing the Array',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1353/D'
      },
      {
        title: 'Codeforces 1140C - Playlist',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1140/C'
      }
    ]
  },

  'min-heap': {
    name: 'Binary Min-Heap',
    category: 'Tree & Priority Queue',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log N)',
      worst: 'O(log N)',
      peekMin: 'O(1)',
      insert: 'O(log N)',
      extractMin: 'O(log N)',
      heapify: 'O(N)'
    },
    spaceComplexity: 'O(N)',
    description: 'A complete binary tree where the key at root is the minimum among all keys in the heap, with parent <= children holding true across all nodes.',
    keyPoints: [
      'O(1) instant lookup of minimum key',
      'O(log N) insert and extract-min',
      'Core engine for Dijkstra shortest path, Prim MST, and Huffman Coding',
      'Array indexing allows zero memory overhead pointer storage'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 23 - Merge k Sorted Lists',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/'
      },
      {
        title: 'LeetCode 703 - Kth Largest Element in a Stream',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/'
      },
      {
        title: 'LeetCode 347 - Top K Frequent Elements',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/top-k-frequent-elements/'
      },
      {
        title: 'Codeforces 1106D - Lunar New Year and a Wander',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1106/D'
      },
      {
        title: 'CSES 1671 - Shortest Routes I (Priority Queue)',
        platform: 'CSES',
        difficulty: 'Medium',
        url: 'https://cses.fi/problemset/task/1671'
      }
    ]
  },

  // =========================================================================
  // 1. ADVANCED DATA STRUCTURES & COMPETITIVE PROGRAMMING
  // =========================================================================
  'segment-tree': {
    name: 'Segment Tree',
    category: 'Advanced Data Structure',
    timeComplexity: {
      best: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(log N)',
      build: 'O(N)',
    },
    spaceComplexity: 'O(4N)',
    description: 'A tree data structure for storing intervals or segments. It allows querying which of the stored segments contain a given point, or performing range queries (Sum, Min, Max) and updates in O(log N) time with optional Lazy Propagation for range updates.',
    keyPoints: [
      'Builds binary tree where each node represents an interval [L, R]',
      'Point update modifies single leaf and bubbles changes up in O(log N)',
      'Range query decomposes [qL, qR] into at most 2*log(N) canonical tree nodes',
      'Lazy propagation postpones subtree updates until necessary'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 307 - Range Sum Query (Mutable)',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/range-sum-query-mutable/'
      },
      {
        title: 'Codeforces 339D - Xenia and Bit Operations',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/339/D'
      },
      {
        title: 'Codeforces 242E - XOR on Segment',
        platform: 'Codeforces',
        difficulty: 'Hard',
        url: 'https://codeforces.com/problemset/problem/242/E'
      },
      {
        title: 'CSES 1648 - Dynamic Range Sum Queries',
        platform: 'CSES',
        difficulty: 'Medium',
        url: 'https://cses.fi/problemset/task/1648'
      }
    ]
  },

  'binary-lifting': {
    name: 'Binary Lifting (LCA & k-th Ancestor)',
    category: 'Tree Algorithm',
    timeComplexity: {
      best: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(log N)',
      build: 'O(N log N)',
    },
    spaceComplexity: 'O(N log N)',
    description: 'A dynamic programming technique on trees where each node stores its 2^i-th ancestor. Allows finding the k-th ancestor of any node and finding the Lowest Common Ancestor (LCA) of any two nodes in O(log N) queries after O(N log N) precomputation.',
    keyPoints: [
      'Table up[u][i] = up[up[u][i-1]][i-1] (jump 2^(i-1) twice)',
      'Find k-th ancestor by jumping powers of 2 present in the binary representation of k',
      'LCA aligns depths first, then jumps simultaneously while up[u][i] != up[v][i]'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 1483 - Kth Ancestor of a Tree Node',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/kth-ancestor-of-a-tree-node/'
      },
      {
        title: 'LeetCode 236 - Lowest Common Ancestor of a Binary Tree',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'
      },
      {
        title: 'Codeforces 1328E - Tree Queries',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1328/E'
      },
      {
        title: 'CSES 1687 - Company Queries I',
        platform: 'CSES',
        difficulty: 'Easy',
        url: 'https://cses.fi/problemset/task/1687'
      }
    ]
  },

  'sparse-table': {
    name: 'Sparse Table (RMQ)',
    category: 'Advanced Data Structure',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      build: 'O(N log N)',
    },
    spaceComplexity: 'O(N log N)',
    description: 'A data structure that answers Range Minimum/Maximum Queries (RMQ) in O(1) query time for idempotent operations (where f(x, x) = x) after O(N log N) precomputation using intervals of length 2^k.',
    keyPoints: [
      'ST[i][j] stores the answer for interval [i, i + 2^j - 1]',
      'Transition: ST[i][j] = min(ST[i][j-1], ST[i + 2^(j-1)][j-1])',
      'Query [L, R]: let k = floor(log2(R - L + 1)), answer is min(ST[L][k], ST[R - 2^k + 1][k])',
      'Extremely fast for static arrays (no updates)'
    ],
    practiceProblems: [
      {
        title: 'Codeforces 1548B - Integers Have Friends',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1548/B'
      },
      {
        title: 'Codeforces 5C - Longest Regular Bracket Sequence',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/5/C'
      },
      {
        title: 'CSES 1647 - Static Range Minimum Queries',
        platform: 'CSES',
        difficulty: 'Easy',
        url: 'https://cses.fi/problemset/task/1647'
      }
    ]
  },

  'hld': {
    name: 'Heavy-Light Decomposition (HLD)',
    category: 'Advanced Tree Algorithm',
    timeComplexity: {
      best: 'O(log² N)',
      average: 'O(log² N)',
      worst: 'O(log² N)',
      build: 'O(N)',
    },
    spaceComplexity: 'O(N)',
    description: 'Decomposes any tree into a set of disjoint paths ("heavy chains") such that any path from root to node passes through at most O(log N) light edges. Flattens tree paths into contiguous ranges for segment tree queries.',
    keyPoints: [
      'Heavy edge connects node to child with largest subtree size; others are Light',
      'Any root-to-node path crosses at most log2(N) light edges',
      'Combined with Segment Tree, enables O(log^2 N) path sum/max updates and queries'
    ],
    practiceProblems: [
      {
        title: 'Codeforces 383C - Propagating tree',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/383/C'
      },
      {
        title: 'Codeforces 276E - Little Girl and Problem on Trees',
        platform: 'Codeforces',
        difficulty: 'Hard',
        url: 'https://codeforces.com/problemset/problem/276/E'
      },
      {
        title: 'CSES 2134 - Path Queries II',
        platform: 'CSES',
        difficulty: 'Hard',
        url: 'https://cses.fi/problemset/task/2134'
      }
    ]
  },

  'linear-basis': {
    name: 'Linear Basis (XOR Basis)',
    category: 'Vector Space & Bit Manipulation',
    timeComplexity: {
      best: 'O(B)',
      average: 'O(B)',
      worst: 'O(B)',
      build: 'O(N · B)',
    },
    spaceComplexity: 'O(B) where B is bit-width (e.g. 64)',
    description: 'A basis spanning a vector space over the finite field GF(2) representing all possible XOR subset sums of a set of numbers. Allows finding the maximum XOR subset, checking linear independence, and finding the k-th smallest XOR sum in O(B) time.',
    keyPoints: [
      'Basis array basis[i] stores a vector with its highest set bit at position i',
      'Insertion uses Gaussian elimination on binary vectors',
      'Maximum XOR sum obtained by greedily XORing basis vectors'
    ],
    practiceProblems: [
      {
        title: 'Codeforces 1100F - Ivan and Burgers',
        platform: 'Codeforces',
        difficulty: 'Hard',
        url: 'https://codeforces.com/problemset/problem/1100/F'
      },
      {
        title: 'Codeforces 845G - Shortest Path Problem?',
        platform: 'Codeforces',
        difficulty: 'Hard',
        url: 'https://codeforces.com/problemset/problem/845/G'
      },
      {
        title: 'Codeforces 1299C - Water Balance',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1299/C'
      }
    ]
  },

  // =========================================================================
  // 2. SORTING ALGORITHMS
  // =========================================================================
  'bubble-sort': {
    name: 'Bubble Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Largest unsorted elements bubble to the end.',
    keyPoints: ['Stable sorting algorithm', 'In-place with O(1) auxiliary space', 'Adaptive with early exit flag'],
    practiceProblems: [
      {
        title: 'LeetCode 912 - Sort an Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-an-array/'
      },
      {
        title: 'LeetCode 75 - Sort Colors',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-colors/'
      },
      {
        title: 'Codeforces 1433B - Yet Another Bookshelf',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1433/B'
      }
    ]
  },

  'selection-sort': {
    name: 'Selection Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Divides array into sorted and unsorted parts. Repeatedly finds the minimum element from the unsorted part and places it at the beginning.',
    keyPoints: ['Unstable by default', 'Minimizes number of swaps: exactly O(N) swaps', 'Simple and in-place'],
    practiceProblems: [
      {
        title: 'LeetCode 912 - Sort an Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-an-array/'
      },
      {
        title: 'Codeforces 1490B - Balanced Remainders',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1490/B'
      }
    ]
  },

  'insertion-sort': {
    name: 'Insertion Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position among the already sorted items.',
    keyPoints: ['Stable and in-place', 'Extremely efficient for small or nearly sorted arrays', 'Used in hybrid algorithms like Timsort'],
    practiceProblems: [
      {
        title: 'LeetCode 147 - Insertion Sort List',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/insertion-sort-list/'
      },
      {
        title: 'Codeforces 1374A - Required Remainder',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1374/A'
      }
    ]
  },

  'merge-sort': {
    name: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(N)',
    description: 'A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the two sorted halves together.',
    keyPoints: ['Stable sorting algorithm', 'Guaranteed O(N log N) worst-case time', 'Requires O(N) auxiliary memory'],
    practiceProblems: [
      {
        title: 'LeetCode 148 - Sort List (Merge Sort on Linked List)',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-list/'
      },
      {
        title: 'LeetCode 493 - Reverse Pairs (Inversion Counting)',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/reverse-pairs/'
      },
      {
        title: 'LeetCode 315 - Count of Smaller Numbers After Self',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/'
      }
    ]
  },

  'quick-sort': {
    name: 'Quick Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)' },
    spaceComplexity: 'O(log N)',
    description: 'Selects a "pivot" element and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot, then sorts recursively.',
    keyPoints: ['Usually the fastest in practice due to cache locality', 'In-place recursive partitioning', 'Worst case occurs when pivot selection is poor (e.g. already sorted)'],
    practiceProblems: [
      {
        title: 'LeetCode 912 - Sort an Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-an-array/'
      },
      {
        title: 'LeetCode 215 - Kth Largest Element in an Array (Quickselect)',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
      },
      {
        title: 'Codeforces 977C - Less or Equal',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/977/C'
      }
    ]
  },

  'heap-sort': {
    name: 'Heap Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(1)',
    description: 'Converts array into a Max-Heap data structure, then repeatedly extracts the maximum root element and places it at the end of the array.',
    keyPoints: ['In-place with guaranteed O(N log N)', 'Not stable', 'Excellent for memory-constrained systems'],
    practiceProblems: [
      {
        title: 'LeetCode 23 - Merge k Sorted Lists',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/'
      },
      {
        title: 'LeetCode 347 - Top K Frequent Elements',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/top-k-frequent-elements/'
      },
      {
        title: 'Codeforces 1353D - Constructing the Array',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1353/D'
      }
    ]
  },

  'shell-sort': {
    name: 'Shell Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N^(4/3))', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Generalization of insertion sort that allows exchanges of items that are far apart using a sequence of decreasing gap intervals.',
    keyPoints: ['In-place and non-recursive', 'Fast on medium-sized arrays', 'Performance depends on gap sequence'],
    practiceProblems: [
      {
        title: 'LeetCode 912 - Sort an Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-an-array/'
      },
      {
        title: 'Codeforces 1141A - Game 23',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1141/A'
      }
    ]
  },

  'counting-sort': {
    name: 'Counting Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N + K)', average: 'O(N + K)', worst: 'O(N + K)' },
    spaceComplexity: 'O(K)',
    description: 'A non-comparison sorting algorithm that operates by counting the number of occurrences of each distinct value in the array.',
    keyPoints: ['Linear time for bounded integer ranges [0, K]', 'Stable when implemented with prefix sums', 'Used as subroutine in Radix Sort'],
    practiceProblems: [
      {
        title: 'LeetCode 1122 - Relative Sort Array',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/relative-sort-array/'
      },
      {
        title: 'LeetCode 75 - Sort Colors',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/sort-colors/'
      },
      {
        title: 'Codeforces 1399A - Remove Smallest',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1399/A'
      }
    ]
  },

  'radix-sort': {
    name: 'Radix Sort (LSD)',
    category: 'Sorting',
    timeComplexity: { best: 'O(d · (N + K))', average: 'O(d · (N + K))', worst: 'O(d · (N + K))' },
    spaceComplexity: 'O(N + K)',
    description: 'A non-comparison sorting algorithm that sorts integer numbers digit by digit from least significant digit (LSD) to most significant digit using stable counting sort subroutine.',
    keyPoints: [
      'Non-comparison integer sorting algorithm',
      'Stable when using stable counting sort per digit',
      'Linear time complexity O(d · (N + K)) where d is digit count and K is base (base 10)',
      'Highly effective for fixed-width numerical datasets'
    ],
    practiceProblems: [
      {
        title: 'LeetCode 164 - Maximum Gap',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/maximum-gap/'
      },
      {
        title: 'LeetCode 561 - Array Partition',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/array-partition/'
      },
      {
        title: 'Codeforces 1520D - Same Differences',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1520/D'
      }
    ]
  },

  // =========================================================================
  // 3. PATHFINDING ALGORITHMS
  // =========================================================================
  'dijkstra': {
    name: "Dijkstra's Algorithm",
    category: 'Pathfinding',
    timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
    spaceComplexity: 'O(V)',
    description: 'Finds the shortest path between nodes in a graph with non-negative edge weights using a priority queue (min-heap). Guarantees shortest path.',
    keyPoints: ['Optimal for weighted graphs without negative weights', 'Greedily relaxes shortest distance node', 'Forms foundation of GPS routing'],
    practiceProblems: [
      {
        title: 'LeetCode 743 - Network Delay Time',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/network-delay-time/'
      },
      {
        title: 'LeetCode 1514 - Path with Maximum Probability',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/path-with-maximum-probability/'
      },
      {
        title: 'Codeforces 20C - Dijkstra?',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/20/C'
      },
      {
        title: 'CSES 1671 - Shortest Routes I',
        platform: 'CSES',
        difficulty: 'Medium',
        url: 'https://cses.fi/problemset/task/1671'
      }
    ]
  },

  'astar': {
    name: 'A* (A-Star) Search',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(E)', average: 'O(E)', worst: 'O(b^d)' },
    spaceComplexity: 'O(V)',
    description: 'Informed search algorithm that uses heuristic function f(n) = g(n) + h(n) where g(n) is exact cost from start and h(n) is estimated distance to goal.',
    keyPoints: ['Guarantees optimal path if heuristic is admissible (never overestimates)', 'Substantially faster than Dijkstra in practice', 'Used heavily in video games and robotics'],
    practiceProblems: [
      {
        title: 'LeetCode 773 - Sliding Puzzle',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/sliding-puzzle/'
      },
      {
        title: 'LeetCode 1091 - Shortest Path in Binary Matrix',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/'
      },
      {
        title: 'Codeforces 1061C - Multiplicity',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1061/C'
      }
    ]
  },

  'bfs': {
    name: 'Breadth-First Search (BFS)',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level using a Queue. Guarantees shortest path in unweighted graphs.',
    keyPoints: ['Optimal for unweighted graphs', 'Uses FIFO Queue', 'Explores concentric radial waves'],
    practiceProblems: [
      {
        title: 'LeetCode 200 - Number of Islands',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/number-of-islands/'
      },
      {
        title: 'LeetCode 127 - Word Ladder',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/word-ladder/'
      },
      {
        title: 'Codeforces 1037D - Valid BFS?',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1037/D'
      },
      {
        title: 'CSES 1192 - Counting Rooms',
        platform: 'CSES',
        difficulty: 'Easy',
        url: 'https://cses.fi/problemset/task/1192'
      }
    ]
  },

  'dfs': {
    name: 'Depth-First Search (DFS)',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores as far as possible along each branch before backtracking using a Stack or recursion. Does NOT guarantee the shortest path.',
    keyPoints: ['Uses LIFO Stack or recursion', 'Useful for topological sorting, cycle detection, maze solving', 'Can take long non-optimal winding paths'],
    practiceProblems: [
      {
        title: 'LeetCode 133 - Clone Graph',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/clone-graph/'
      },
      {
        title: 'LeetCode 695 - Max Area of Island',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/max-area-of-island/'
      },
      {
        title: 'Codeforces 1006E - Military Problem',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1006/E'
      },
      {
        title: 'CSES 1666 - Building Roads',
        platform: 'CSES',
        difficulty: 'Easy',
        url: 'https://cses.fi/problemset/task/1666'
      }
    ]
  },

  'greedy-bfs': {
    name: 'Greedy Best-First Search',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(b)', average: 'O(b^d)', worst: 'O(b^d)' },
    spaceComplexity: 'O(V)',
    description: 'Expands the node that appears to be closest to the goal based purely on heuristic h(n). Extremely fast but does not guarantee the shortest path.',
    keyPoints: ['Pure heuristic greedy choice', 'Can be misled by obstacles', 'Fastest heuristic scout'],
    practiceProblems: [
      {
        title: 'LeetCode 847 - Shortest Path Visiting All Nodes',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/'
      },
      {
        title: 'Codeforces 510C - Fox And Names',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/510/C'
      }
    ]
  },

  'bidirectional-bfs': {
    name: 'Bidirectional BFS',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(b^(d/2))', average: 'O(b^(d/2))', worst: 'O(b^(d/2))' },
    spaceComplexity: 'O(b^(d/2))',
    description: 'Runs two simultaneous breadth-first searches: one forward from the start node and one backward from the target node, stopping when the frontiers meet.',
    keyPoints: ['Drastically reduces search space from b^d to 2*b^(d/2)', 'Optimal for unweighted graphs', 'Meets in the middle'],
    practiceProblems: [
      {
        title: 'LeetCode 127 - Word Ladder (Bidirectional BFS)',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/word-ladder/'
      },
      {
        title: 'LeetCode 752 - Open the Lock',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/open-the-lock/'
      }
    ]
  },

  // =========================================================================
  // 4. TREES & BALANCED BST
  // =========================================================================
  'bst': {
    name: 'Binary Search Tree (BST)',
    category: 'Data Structures',
    timeComplexity: { best: 'O(log N)', average: 'O(log N)', worst: 'O(N)' },
    spaceComplexity: 'O(N)',
    description: 'A binary tree data structure where each node has at most two children, with left subtree keys < node key < right subtree keys.',
    keyPoints: ['Inorder traversal yields sorted order', 'Can degrade to O(N) linked list if unbalanced', 'Fast search, insert, delete on average'],
    practiceProblems: [
      {
        title: 'LeetCode 98 - Validate Binary Search Tree',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/validate-binary-search-tree/'
      },
      {
        title: 'LeetCode 700 - Search in a Binary Search Tree',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/'
      },
      {
        title: 'LeetCode 450 - Delete Node in a BST',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/delete-node-in-a-bst/'
      },
      {
        title: 'Codeforces 115A - Party',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/115/A'
      }
    ]
  },

  'avl': {
    name: 'AVL Tree (Self-Balancing)',
    category: 'Data Structures',
    timeComplexity: { best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)' },
    spaceComplexity: 'O(N)',
    description: 'A self-balancing binary search tree where the difference between heights of left and right subtrees (balance factor) cannot exceed 1. Uses rotations (LL, RR, LR, RL) to restore balance.',
    keyPoints: ['Strict balance guarantee O(log N) for all operations', '4 rotation types: Left, Right, Left-Right, Right-Left', 'Faster lookup than Red-Black trees due to tighter height constraint'],
    practiceProblems: [
      {
        title: 'LeetCode 110 - Balanced Binary Tree',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/balanced-binary-tree/'
      },
      {
        title: 'LeetCode 1382 - Balance a Binary Search Tree',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/balance-a-binary-search-tree/'
      },
      {
        title: 'Codeforces 1400E - Clear the Multiset',
        platform: 'Codeforces',
        difficulty: 'Hard',
        url: 'https://codeforces.com/problemset/problem/1400/E'
      }
    ]
  },

  // =========================================================================
  // 5. DYNAMIC PROGRAMMING & BACKTRACKING
  // =========================================================================
  'n-queens': {
    name: 'N-Queens Backtracking',
    category: 'Backtracking',
    timeComplexity: { best: 'O(N!)', average: 'O(N!)', worst: 'O(N!)' },
    spaceComplexity: 'O(N)',
    description: 'Places N non-attacking queens on an N×N chessboard so that no two queens share the same row, column, or diagonal using recursive backtracking.',
    keyPoints: ['Classic constraint satisfaction backtracking', 'Prunes invalid branches instantly', 'Generates all valid board configurations'],
    practiceProblems: [
      {
        title: 'LeetCode 51 - N-Queens',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/n-queens/'
      },
      {
        title: 'LeetCode 52 - N-Queens II',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/n-queens-ii/'
      },
      {
        title: 'Codeforces 1000C - Covered Points Count',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1000/C'
      }
    ]
  },

  'knapsack': {
    name: '0/1 Knapsack Problem',
    category: 'Dynamic Programming',
    timeComplexity: { best: 'O(N · W)', average: 'O(N · W)', worst: 'O(N · W)' },
    spaceComplexity: 'O(N · W)',
    description: 'Given items with weights and values, determines the maximum value subset that fits within maximum weight capacity W by filling a 2D DP matrix table.',
    keyPoints: ['DP recurrence: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])', 'Pseudo-polynomial time complexity', 'Backtracking traces chosen items'],
    practiceProblems: [
      {
        title: 'LeetCode 416 - Partition Equal Subset Sum',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/partition-equal-subset-sum/'
      },
      {
        title: 'LeetCode 494 - Target Sum',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/target-sum/'
      },
      {
        title: 'Codeforces 189A - Cut Ribbon',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/189/A'
      },
      {
        title: 'CSES 1158 - Book Shop',
        platform: 'CSES',
        difficulty: 'Medium',
        url: 'https://cses.fi/problemset/task/1158'
      }
    ]
  },

  'lcs': {
    name: 'Longest Common Subsequence (LCS)',
    category: 'Dynamic Programming',
    timeComplexity: { best: 'O(M · N)', average: 'O(M · N)', worst: 'O(M · N)' },
    spaceComplexity: 'O(M · N)',
    description: 'Finds the longest subsequence present in two sequences in the same relative order using a 2D grid dynamic programming approach.',
    keyPoints: ['Foundation for diff tools and DNA sequence alignment', 'dp[i][j] = 1 + dp[i-1][j-1] if match else max(dp[i-1][j], dp[i][j-1])', 'Arrows reconstruct optimal sequence'],
    practiceProblems: [
      {
        title: 'LeetCode 1143 - Longest Common Subsequence',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/longest-common-subsequence/'
      },
      {
        title: 'LeetCode 72 - Edit Distance',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/edit-distance/'
      },
      {
        title: 'Codeforces 1446B - Catching Cheaters',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1446/B'
      },
      {
        title: 'CSES 1744 - Rectangle Cutting',
        platform: 'CSES',
        difficulty: 'Medium',
        url: 'https://cses.fi/problemset/task/1744'
      }
    ]
  },

  // =========================================================================
  // 6. SEARCHING ALGORITHMS
  // =========================================================================
  'linear-search': {
    name: 'Linear Search',
    category: 'Searching',
    timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    keyPoints: ['Works on unsorted data', 'Simple O(N) sequential scan', 'No pre-sorting overhead'],
    practiceProblems: [
      {
        title: 'LeetCode 1295 - Find Numbers with Even Number of Digits',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/'
      },
      {
        title: 'Codeforces 1472A - Cards for Friends',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/1472/A'
      }
    ]
  },

  'binary-search': {
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: { best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
    spaceComplexity: 'O(1)',
    description: 'Finds the position of a target value within a SORTED array by repeatedly dividing the search interval in half.',
    keyPoints: ['Requires sorted array', 'Halves search space each step', 'Fast O(log N) lookup'],
    practiceProblems: [
      {
        title: 'LeetCode 704 - Binary Search',
        platform: 'LeetCode',
        difficulty: 'Easy',
        url: 'https://leetcode.com/problems/binary-search/'
      },
      {
        title: 'LeetCode 33 - Search in Rotated Sorted Array',
        platform: 'LeetCode',
        difficulty: 'Medium',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
      },
      {
        title: 'LeetCode 4 - Median of Two Sorted Arrays',
        platform: 'LeetCode',
        difficulty: 'Hard',
        url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
      },
      {
        title: 'Codeforces 706B - Interesting drink',
        platform: 'Codeforces',
        difficulty: 'Easy',
        url: 'https://codeforces.com/problemset/problem/706/B'
      },
      {
        title: 'Codeforces 1201C - Maximum Median',
        platform: 'Codeforces',
        difficulty: 'Medium',
        url: 'https://codeforces.com/problemset/problem/1201/C'
      }
    ]
  }
};
