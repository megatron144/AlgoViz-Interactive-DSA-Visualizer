export const ALGO_DETAILS = {
  // Advanced CP Data Structures
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
    ]
  },

  // Sorting Algorithms
  'bubble-sort': {
    name: 'Bubble Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Largest unsorted elements bubble to the end.',
    keyPoints: ['Stable sorting algorithm', 'In-place with O(1) auxiliary space', 'Adaptive with early exit flag']
  },
  'selection-sort': {
    name: 'Selection Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Divides array into sorted and unsorted parts. Repeatedly finds the minimum element from the unsorted part and places it at the beginning.',
    keyPoints: ['Unstable by default', 'Minimizes number of swaps: exactly O(N) swaps', 'Simple and in-place']
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position among the already sorted items.',
    keyPoints: ['Stable and in-place', 'Extremely efficient for small or nearly sorted arrays', 'Used in hybrid algorithms like Timsort']
  },
  'merge-sort': {
    name: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(N)',
    description: 'A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the two sorted halves together.',
    keyPoints: ['Stable sorting algorithm', 'Guaranteed O(N log N) worst-case time', 'Requires O(N) auxiliary memory']
  },
  'quick-sort': {
    name: 'Quick Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)' },
    spaceComplexity: 'O(log N)',
    description: 'Selects a "pivot" element and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot, then sorts recursively.',
    keyPoints: ['Usually the fastest in practice due to cache locality', 'In-place recursive partitioning', 'Worst case occurs when pivot selection is poor (e.g. already sorted)']
  },
  'heap-sort': {
    name: 'Heap Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(1)',
    description: 'Converts array into a Max-Heap data structure, then repeatedly extracts the maximum root element and places it at the end of the array.',
    keyPoints: ['In-place with guaranteed O(N log N)', 'Not stable', 'Excellent for memory-constrained systems']
  },
  'shell-sort': {
    name: 'Shell Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N log N)', average: 'O(N^(4/3))', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    description: 'Generalization of insertion sort that allows exchanges of items that are far apart using a sequence of decreasing gap intervals.',
    keyPoints: ['In-place and non-recursive', 'Fast on medium-sized arrays', 'Performance depends on gap sequence']
  },
  'counting-sort': {
    name: 'Counting Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(N + K)', average: 'O(N + K)', worst: 'O(N + K)' },
    spaceComplexity: 'O(K)',
    description: 'A non-comparison sorting algorithm that operates by counting the number of occurrences of each distinct value in the array.',
    keyPoints: ['Linear time for bounded integer ranges [0, K]', 'Stable when implemented with prefix sums', 'Used as subroutine in Radix Sort']
  },

  // Pathfinding
  'dijkstra': {
    name: "Dijkstra's Algorithm",
    category: 'Pathfinding',
    timeComplexity: { best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)' },
    spaceComplexity: 'O(V)',
    description: 'Finds the shortest path between nodes in a graph with non-negative edge weights using a priority queue (min-heap). Guarantees shortest path.',
    keyPoints: ['Optimal for weighted graphs without negative weights', 'Greedily relaxes shortest distance node', 'Forms foundation of GPS routing']
  },
  'astar': {
    name: 'A* (A-Star) Search',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(E)', average: 'O(E)', worst: 'O(b^d)' },
    spaceComplexity: 'O(V)',
    description: 'Informed search algorithm that uses heuristic function f(n) = g(n) + h(n) where g(n) is exact cost from start and h(n) is estimated distance to goal.',
    keyPoints: ['Guarantees optimal path if heuristic is admissible (never overestimates)', 'Substantially faster than Dijkstra in practice', 'Used heavily in video games and robotics']
  },
  'bfs': {
    name: 'Breadth-First Search (BFS)',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores all neighbor nodes at the present depth prior to moving on to the nodes at the next depth level using a Queue. Guarantees shortest path in unweighted graphs.',
    keyPoints: ['Optimal for unweighted graphs', 'Uses FIFO Queue', 'Explores concentric radial waves']
  },
  'dfs': {
    name: 'Depth-First Search (DFS)',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    spaceComplexity: 'O(V)',
    description: 'Explores as far as possible along each branch before backtracking using a Stack or recursion. Does NOT guarantee the shortest path.',
    keyPoints: ['Uses LIFO Stack or recursion', 'Useful for topological sorting, cycle detection, maze solving', 'Can take long non-optimal winding paths']
  },
  'greedy-bfs': {
    name: 'Greedy Best-First Search',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(b)', average: 'O(b^d)', worst: 'O(b^d)' },
    spaceComplexity: 'O(V)',
    description: 'Expands the node that appears to be closest to the goal based purely on heuristic h(n). Extremely fast but does not guarantee the shortest path.',
    keyPoints: ['Pure heuristic greedy choice', 'Can be misled by obstacles', 'Fastest heuristic scout']
  },
  'bidirectional-bfs': {
    name: 'Bidirectional BFS',
    category: 'Pathfinding',
    timeComplexity: { best: 'O(b^(d/2))', average: 'O(b^(d/2))', worst: 'O(b^(d/2))' },
    spaceComplexity: 'O(b^(d/2))',
    description: 'Runs two simultaneous breadth-first searches: one forward from the start node and one backward from the target node, stopping when the frontiers meet.',
    keyPoints: ['Drastically reduces search space from b^d to 2*b^(d/2)', 'Optimal for unweighted graphs', 'Meets in the middle']
  },

  // Trees
  'bst': {
    name: 'Binary Search Tree (BST)',
    category: 'Data Structures',
    timeComplexity: { best: 'O(log N)', average: 'O(log N)', worst: 'O(N)' },
    spaceComplexity: 'O(N)',
    description: 'A binary tree data structure where each node has at most two children, with left subtree keys < node key < right subtree keys.',
    keyPoints: ['Inorder traversal yields sorted order', 'Can degrade to O(N) linked list if unbalanced', 'Fast search, insert, delete on average']
  },
  'avl': {
    name: 'AVL Tree (Self-Balancing)',
    category: 'Data Structures',
    timeComplexity: { best: 'O(log N)', average: 'O(log N)', worst: 'O(log N)' },
    spaceComplexity: 'O(N)',
    description: 'A self-balancing binary search tree where the difference between heights of left and right subtrees (balance factor) cannot exceed 1. Uses rotations (LL, RR, LR, RL) to restore balance.',
    keyPoints: ['Strict balance guarantee O(log N) for all operations', '4 rotation types: Left, Right, Left-Right, Right-Left', 'Faster lookup than Red-Black trees due to tighter height constraint']
  },

  // Dynamic Programming & Backtracking
  'n-queens': {
    name: 'N-Queens Backtracking',
    category: 'Backtracking',
    timeComplexity: { best: 'O(N!)', average: 'O(N!)', worst: 'O(N!)' },
    spaceComplexity: 'O(N)',
    description: 'Places N non-attacking queens on an N×N chessboard so that no two queens share the same row, column, or diagonal using recursive backtracking.',
    keyPoints: ['Classic constraint satisfaction backtracking', 'Prunes invalid branches instantly', 'Generates all valid board configurations']
  },
  'knapsack': {
    name: '0/1 Knapsack Problem',
    category: 'Dynamic Programming',
    timeComplexity: { best: 'O(N · W)', average: 'O(N · W)', worst: 'O(N · W)' },
    spaceComplexity: 'O(N · W)',
    description: 'Given items with weights and values, determines the maximum value subset that fits within maximum weight capacity W by filling a 2D DP matrix table.',
    keyPoints: ['DP recurrence: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])', 'Pseudo-polynomial time complexity', 'Backtracking traces chosen items']
  },
  'lcs': {
    name: 'Longest Common Subsequence (LCS)',
    category: 'Dynamic Programming',
    timeComplexity: { best: 'O(M · N)', average: 'O(M · N)', worst: 'O(M · N)' },
    spaceComplexity: 'O(M · N)',
    description: 'Finds the longest subsequence present in two sequences in the same relative order using a 2D grid dynamic programming approach.',
    keyPoints: ['Foundation for diff tools and DNA sequence alignment', 'dp[i][j] = 1 + dp[i-1][j-1] if match else max(dp[i-1][j], dp[i][j-1])', 'Arrows reconstruct optimal sequence']
  },

  // Searching
  'linear-search': {
    name: 'Linear Search',
    category: 'Searching',
    timeComplexity: { best: 'O(1)', average: 'O(N)', worst: 'O(N)' },
    spaceComplexity: 'O(1)',
    description: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    keyPoints: ['Works on unsorted data', 'Simple O(N) sequential scan', 'No pre-sorting overhead']
  },
  'binary-search': {
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: { best: 'O(1)', average: 'O(log N)', worst: 'O(log N)' },
    spaceComplexity: 'O(1)',
    description: 'Finds the position of a target value within a SORTED array by repeatedly dividing the search interval in half.',
    keyPoints: ['Requires sorted array', 'Halves search space each step', 'Fast O(log N) lookup']
  }
};
