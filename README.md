# 🚀 AlgoViz - Interactive DSA Visualizer & Algorithm Engine

An interactive, dark-mode web application built with **React 19**, **Vite**, and **Tailwind CSS** that visualizes algorithms and data structures step-by-step with real-time sound synthesis, synchronized Java/Python/C++ code inspectors, complexity tables, and curated LeetCode & Codeforces practice problem sets.

---

## 📚 Core Topics & Conceptual Guide

### 📦 1. Fundamental Data Structures
* **Stack (LIFO — Last In, First Out)**:
  * *Concept*: Stores elements vertically where the last element pushed is the first popped.
  * *Use Cases*: Function call stacks, expression evaluation, syntax validation, undo/redo buffers, and monotonic stack optimizations ($O(1)$ operations).
* **Queue (FIFO — First In, First Out)**:
  * *Concept*: Stores elements in a line where items enter at the `REAR` and exit from the `FRONT`.
  * *Use Cases*: Breadth-First Search (BFS), task scheduling, web request buffering, and asynchronous event loops.
* **Deque (Double-Ended Queue)**:
  * *Concept*: Generalized queue supporting $O(1)$ insertion and removal at **both** front and rear boundaries.
  * *Use Cases*: Sliding Window Maximum/Minimum (Monotonic Deque), 0-1 BFS graph traversal, and dual-ended undo caches.
* **Priority Queue (Scheduler Engine)**:
  * *Concept*: Abstract collection where each element has a priority weight; the element with highest/lowest priority is served first.
  * *Use Cases*: Dijkstra's shortest path, Prim's Minimum Spanning Tree, CPU process scheduling, and Huffman coding.
* **Binary Heaps (Max-Heap & Min-Heap)**:
  * *Concept*: Complete binary tree stored in contiguous array memory where parent nodes are $\ge$ (Max-Heap) or $\le$ (Min-Heap) their children.
  * *Use Cases*: $O(1)$ instant extremum peek, $O(\log N)$ inserts/deletions with `siftUp` and `siftDown`, and $O(N)$ bottom-up heap construction.
* **Disjoint Set Union (DSU / Union-Find)**:
  * *Concept*: Maintains non-overlapping partitioned sets with $O(\alpha(N))$ `find(u)` (find root) and `union(u, v)` (merge sets) using **Path Compression** and **Union by Rank**.
  * *Use Cases*: Kruskal’s Minimum Spanning Tree, dynamic graph connectivity, and cycle detection.

---

### ⚡ 2. Advanced Competitive Programming Data Structures
* **Segment Tree**:
  * *Concept*: Binary tree over array intervals where each node stores aggregated range values (Sum, Min, Max, GCD).
  * *Use Cases*: $O(\log N)$ point updates and arbitrary range queries with optional **Lazy Propagation** for $O(\log N)$ range updates.
* **Binary Lifting (LCA & $k$-th Ancestor)**:
  * *Concept*: Precomputes jump tables of power-of-two sizes (`up[u][i]` = $2^i$-th ancestor) in $O(N \log N)$.
  * *Use Cases*: Answers Lowest Common Ancestor (LCA) and $k$-th tree ancestor queries in $O(\log N)$ time per query.
* **Sparse Table (RMQ)**:
  * *Concept*: Precomputes query answers for intervals of length $2^k$ in $O(N \log N)$ preprocessing.
  * *Use Cases*: Answers static range queries for idempotent operations ($f(x, x) = x$, like `min`, `max`, `gcd`) in guaranteed $O(1)$ constant time.
* **Heavy-Light Decomposition (HLD)**:
  * *Concept*: Decomposes trees into disjoint heavy chains so any root-to-node path crosses at most $O(\log N)$ light edges.
  * *Use Cases*: Flattens tree paths into contiguous ranges for $O(\log^2 N)$ tree path updates and queries via Segment Tree.
* **Linear Basis (XOR Basis)**:
  * *Concept*: Spanning basis for vector spaces over GF(2) representing all possible XOR subset combinations.
  * *Use Cases*: Finds maximum XOR subset sums and queries linear independence in $O(B)$ time.

---

### 📊 3. Sorting Algorithms
* **Quick Sort**:
  * *Concept*: Divide-and-conquer partition algorithm placing elements $\le$ pivot to the left and $>$ pivot to the right.
  * *Complexity*: $O(N \log N)$ average, in-place, fastest comparison sort in practice.
* **Merge Sort**:
  * *Concept*: Recursively halves the array, sorts each half, and stably merges them back together.
  * *Complexity*: Guaranteed $O(N \log N)$ worst-case, stable sorting.
* **Heap Sort**:
  * *Concept*: Builds a Max-Heap in $O(N)$ and repeatedly extracts the root to the array tail.
  * *Complexity*: Guaranteed $O(N \log N)$ time, in-place with $O(1)$ auxiliary space.
* **Radix Sort (LSD)**:
  * *Concept*: Non-comparison integer sorting digit-by-digit from least to most significant digit using stable counting sort.
  * *Complexity*: Linear $O(d \cdot (N + K))$ time.
* **Counting Sort**:
  * *Concept*: Tallies element occurrences in bounded integer range $[0, K]$ and calculates cumulative positions.
  * *Complexity*: Linear $O(N + K)$ time.
* **Insertion Sort**:
  * *Concept*: Iteratively shifts elements to insert the next item into its sorted position.
  * *Complexity*: $O(N)$ on nearly sorted data, $O(N^2)$ worst case.
* **Selection Sort**:
  * *Concept*: Scans unsorted slice for minimum element and swaps it to the front.
  * *Complexity*: $O(N^2)$ time with minimal $O(N)$ memory swaps.
* **Shell Sort**:
  * *Concept*: Generalization of insertion sort with diminishing gap intervals.
* **Bubble Sort**:
  * *Concept*: Repeatedly compares and swaps adjacent out-of-order elements until fully sorted.

---

### 🗺️ 4. Graph & Pathfinding Engines
* **Dijkstra's Algorithm**:
  * *Concept*: Greedily relaxes the shortest distance node using a Min-Priority Queue.
  * *Guarantee*: Finds optimal shortest paths on non-negative weighted graphs in $O((V + E) \log V)$ time.
* **A\* (A-Star) Search**:
  * *Concept*: Informed search using heuristic evaluation $f(n) = g(n) + h(n)$ (cost from start + estimated distance to goal).
  * *Guarantee*: Dramatically faster than Dijkstra while guaranteeing optimal path if $h(n)$ is admissible.
* **Breadth-First Search (BFS)**:
  * *Concept*: Explores nodes radial layer-by-layer using a FIFO Queue.
  * *Guarantee*: Guaranteed shortest path in unweighted graphs in $O(V + E)$ time.
* **Depth-First Search (DFS)**:
  * *Concept*: Explores as deep as possible along each branch before backtracking.
  * *Use Cases*: Topological sorting, cycle detection, strongly connected components, and maze generation.
* **Greedy Best-First Search**:
  * *Concept*: Expands node closest to goal purely based on heuristic $h(n)$ for fast scouting.
* **Bidirectional BFS**:
  * *Concept*: Runs concurrent forward and backward searches, shrinking search space from $O(b^d)$ to $O(2 \cdot b^{d/2})$.

---

### 🌲 5. Trees & Balanced BST
* **Binary Search Tree (BST)**:
  * *Concept*: Binary tree with left children $<$ node $<$ right children. Inorder traversal yields sorted order.
* **AVL Tree (Self-Balancing)**:
  * *Concept*: Strict self-balancing BST with balance factor $\in \{-1, 0, 1\}$.
  * *Rotations*: Employs LL, RR, LR, RL rotations to guarantee strict $O(\log N)$ worst-case lookup and modifications.
* **Tree Traversals**:
  * *Inorder (Left-Root-Right)*: Ascending sorted output for BSTs.
  * *Preorder (Root-Left-Right)*: Tree cloning and prefix expressions.
  * *Postorder (Left-Right-Root)*: Bottom-up evaluation and memory teardown.

---

### 💡 6. Dynamic Programming & Backtracking
* **Dynamic Programming (DP)**:
  * *Concept*: Decomposes problems into overlapping subproblems and stores solutions in DP lookup tables to eliminate redundant calculations.
* **0/1 Knapsack Problem**:
  * *Recurrence*: `dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])`.
  * *Application*: Resource optimization under capacity bounds.
* **Longest Common Subsequence (LCS)**:
  * *Recurrence*: `dp[i][j] = 1 + dp[i-1][j-1]` on match, else `max(dp[i-1][j], dp[i][j-1])`.
  * *Application*: Foundations of `git diff`, text comparing utilities, and bioinformatic sequence alignment.
* **N-Queens Backtracking**:
  * *Concept*: Places $N$ non-attacking queens on an $N \times N$ chessboard by exploring state trees and pruning invalid configurations.

---

### 🔎 7. Searching Algorithms
* **Binary Search**:
  * *Concept*: Logarithmic search on sorted arrays by repeatedly halving search intervals.
  * *Complexity*: $O(\log N)$ time (searches 4 billion elements in 32 comparisons).
* **Linear Search**:
  * *Concept*: Sequential scan across unsorted arrays in $O(N)$ time.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound Engine**: Web Audio API Synthesizer
- **Visual FX**: Canvas Confetti

---

## 🚀 Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/megatron144/AlgoViz-Interactive-DSA-Visualizer.git

# 2. Navigate to project directory
cd AlgoViz-Interactive-DSA-Visualizer

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles production build.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs Oxlint checks.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
