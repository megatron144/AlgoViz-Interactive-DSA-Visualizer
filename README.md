# 🚀 AlgoViz — Interactive DSA Visualizer & Algorithm Engine

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)

An interactive, high-performance web application designed to bring Data Structures and Algorithms to life through **step-by-step visualizations**, **synthesized real-time audio feedback**, **synchronized multi-language code inspectors (Java, Python, C++)**, and **curated LeetCode & Codeforces practice problem integration**.

---

## 📖 Interactive Topic & Algorithm Guide

> **Tip**: Click on any topic below to expand its conceptual overview, core invariants, complexity bounds, and practice problems.

### 📦 1. Fundamental Data Structures

<details>
<summary><b>🥞 Stack (LIFO — Last In, First Out)</b></summary>

* **Core Concept**: A linear container where elements are pushed and popped strictly from the top boundary.
* **Key Invariant**: The last element inserted is always the first one to be removed ($O(1)$ operations).
* **When to use**: Function recursion call stacks, undo/redo state buffers, bracket/syntax balancing, and monotonic stack optimizations for histogram problems.
* **Complexity**: Time: $O(1)$ push / pop / peek \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 20 - Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) • [LeetCode 739 - Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) • [LeetCode 84 - Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

</details>

<details>
<summary><b>🛤️ Queue (FIFO — First In, First Out)</b></summary>

* **Core Concept**: A sequential container where items enter at the `REAR` (enqueue) and exit from the `FRONT` (dequeue).
* **Key Invariant**: Preserves exact chronological ordering of arrivals.
* **When to use**: Breadth-First Search (BFS) graph traversal, task scheduling, asynchronous event queues, and buffer streams.
* **Complexity**: Time: $O(1)$ enqueue / dequeue \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 232 - Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) • [LeetCode 622 - Design Circular Queue](https://leetcode.com/problems/design-circular-queue/) • [LeetCode 239 - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

</details>

<details>
<summary><b>↔️ Deque (Double-Ended Queue)</b></summary>

* **Core Concept**: A generalized bidirectional queue that supports $O(1)$ insertions and removals from **both** boundaries (front and back).
* **Key Invariant**: Acts as both a Stack and a Queue simultaneously.
* **When to use**: Monotonic Deque algorithms for finding sliding window minimums/maximums in $O(N)$, and 0-1 BFS graph shortest-path searches.
* **Complexity**: Time: $O(1)$ push/pop at either end \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 239 - Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) • [LeetCode 641 - Design Circular Deque](https://leetcode.com/problems/design-circular-deque/) • [Codeforces 1579E1 - Permutation Minimization by Deque](https://codeforces.com/problemset/problem/1579/E1)

</details>

<details>
<summary><b>⚡ Priority Queue (Scheduler Engine)</b></summary>

* **Core Concept**: An abstract data structure where each element carries a numerical priority weight; the element with highest (or lowest) priority is always served first.
* **Key Invariant**: Maintained dynamically via a binary or Fibonacci heap backing structure.
* **When to use**: CPU process scheduling, bandwidth throttling, Dijkstra's algorithm, Prim's Minimum Spanning Tree, and Huffman data compression.
* **Complexity**: Time: $O(\log N)$ enqueue / dequeue, $O(1)$ peek \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 215 - Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) • [LeetCode 373 - Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) • [Codeforces 1353D - Constructing the Array](https://codeforces.com/problemset/problem/1353/D)

</details>

<details>
<summary><b>🌳 Binary Heaps (Max-Heap & Min-Heap)</b></summary>

* **Core Concept**: A complete binary tree mapped into a flat array where each parent node is $\ge$ (Max-Heap) or $\le$ (Min-Heap) both of its children.
* **Key Invariant**: Zero-overhead pointer layout: `Parent = (i-1)/2`, `Left = 2i+1`, `Right = 2i+2`.
* **When to use**: Fast extremum retrieval in $O(1)$ time, $O(\log N)$ priority updates via `siftUp` and `siftDown`, and $O(N)$ bottom-up heap construction.
* **Complexity**: Time: $O(1)$ peek, $O(\log N)$ insert / extract, $O(N)$ build \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 23 - Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) • [LeetCode 295 - Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) • [LeetCode 1046 - Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

</details>

<details>
<summary><b>🌲 Disjoint Set Union (DSU / Union-Find)</b></summary>

* **Core Concept**: Maintains a collection of non-overlapping sets. Supports finding the representative root of any element (`find`) and merging two sets (`union`).
* **Key Invariant**: Optimized with **Path Compression** (flattening tree depths during lookups) and **Union by Rank** (attaching shallower trees under deeper trees).
* **When to use**: Kruskal’s Minimum Spanning Tree algorithm, dynamic graph connectivity queries, and cycle detection.
* **Complexity**: Time: $O(\alpha(N)) \approx O(1)$ amortized per operation (Inverse Ackermann function) \| Auxiliary Space: $O(N)$.
* **Practice**: [LeetCode 684 - Redundant Connection](https://leetcode.com/problems/redundant-connection/) • [LeetCode 547 - Number of Provinces](https://leetcode.com/problems/number-of-provinces/) • [Codeforces 25D - Roads not only in Berland](https://codeforces.com/problemset/problem/25/D)

</details>

---

### ⚡ 2. Advanced Competitive Programming Structures

<details>
<summary><b>🌲 Segment Tree</b></summary>

* **Core Concept**: A canonical binary tree over array intervals where each node stores aggregated range information (Sum, Min, Max, GCD).
* **Key Invariant**: Decomposes any arbitrary query range $[qL, qR]$ into at most $2 \log N$ canonical segment nodes.
* **When to use**: Dynamic point updates and range queries in $O(\log N)$ time, with optional **Lazy Propagation** for range updates.
* **Complexity**: Time: $O(\log N)$ query / update, $O(N)$ build \| Auxiliary Space: $O(4N)$.
* **Practice**: [LeetCode 307 - Range Sum Query (Mutable)](https://leetcode.com/problems/range-sum-query-mutable/) • [Codeforces 339D - Xenia and Bit Operations](https://codeforces.com/problemset/problem/339/D) • [Codeforces 242E - XOR on Segment](https://codeforces.com/problemset/problem/242/E)

</details>

<details>
<summary><b>🪜 Binary Lifting (LCA & $k$-th Ancestor)</b></summary>

* **Core Concept**: Dynamic programming technique on trees that precomputes jump tables of power-of-two sizes (`up[u][i]` = $2^i$-th ancestor of $u$).
* **Key Invariant**: Recurrence: `up[u][i] = up[up[u][i-1]][i-1]`.
* **When to use**: Fast Lowest Common Ancestor (LCA) queries and $k$-th ancestor lookups in $O(\log N)$ time per query after $O(N \log N)$ preprocessing.
* **Complexity**: Time: $O(\log N)$ per LCA query, $O(N \log N)$ build \| Auxiliary Space: $O(N \log N)$.
* **Practice**: [LeetCode 1483 - Kth Ancestor of a Tree Node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node/) • [LeetCode 236 - Lowest Common Ancestor](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) • [Codeforces 1328E - Tree Queries](https://codeforces.com/problemset/problem/1328/E)

</details>

<details>
<summary><b>📑 Sparse Table (RMQ — Range Minimum Query)</b></summary>

* **Core Concept**: Precomputes range answers for all intervals of length $2^k$ in static arrays.
* **Key Invariant**: Answers queries for **idempotent operations** ($f(x, x) = x$, such as `min`, `max`, `gcd`) by taking the overlap of two intervals: `min(ST[L][k], ST[R - 2^k + 1][k])`.
* **When to use**: High-frequency Range Minimum Queries on immutable datasets in guaranteed $O(1)$ constant time.
* **Complexity**: Time: $O(1)$ query, $O(N \log N)$ preprocessing \| Auxiliary Space: $O(N \log N)$.
* **Practice**: [Codeforces 1548B - Integers Have Friends](https://codeforces.com/problemset/problem/1548/B) • [Codeforces 5C - Longest Regular Bracket Sequence](https://codeforces.com/problemset/problem/5/C)

</details>

<details>
<summary><b>🌿 Heavy-Light Decomposition (HLD)</b></summary>

* **Core Concept**: Partitions tree edges into "heavy" and "light" chains such that any path from the root to any node crosses at most $O(\log N)$ light edges.
* **Key Invariant**: Flattens tree paths into contiguous linear ranges inside a single Segment Tree.
* **When to use**: Arbitrary path modifications (e.g. add value to all nodes on path from $u$ to $v$) and path queries in $O(\log^2 N)$ time.
* **Complexity**: Time: $O(\log^2 N)$ path query / update, $O(N)$ build \| Auxiliary Space: $O(N)$.
* **Practice**: [Codeforces 383C - Propagating tree](https://codeforces.com/problemset/problem/383/C) • [Codeforces 276E - Little Girl and Problem on Trees](https://codeforces.com/problemset/problem/276/E) • [CSES 2134 - Path Queries II](https://cses.fi/problemset/task/2134)

</details>

<details>
<summary><b>🔢 Linear Basis (XOR Basis)</b></summary>

* **Core Concept**: A minimal subset of binary numbers that spans the same XOR vector space over GF(2).
* **Key Invariant**: Array `basis[i]` stores a vector with its highest set bit at position $i$; constructed using Gaussian elimination over binary vectors.
* **When to use**: Computing maximum XOR subset sums, querying whether a value can be formed by XORing a subset, and counting reachable XOR values in $O(B)$ time ($B \le 64$).
* **Complexity**: Time: $O(B)$ insert / query, $O(N \cdot B)$ build \| Auxiliary Space: $O(B)$.
* **Practice**: [Codeforces 1100F - Ivan and Burgers](https://codeforces.com/problemset/problem/1100/F) • [Codeforces 845G - Shortest Path Problem?](https://codeforces.com/problemset/problem/845/G)

</details>

---

### 📊 3. Sorting Algorithms

<details>
<summary><b>⚡ Quick Sort</b></summary>

* **Core Concept**: Selects a pivot, partitions elements into values $\le$ pivot and $>$ pivot in-place, and sorts recursively.
* **Complexity**: Best/Avg: $O(N \log N)$ \| Worst: $O(N^2)$ \| Space: $O(\log N)$ auxiliary call stack.
* **Characteristics**: In-place, unstable, generally the fastest comparison sort in practical applications due to cache locality.
* **Practice**: [LeetCode 912 - Sort an Array](https://leetcode.com/problems/sort-an-array/) • [LeetCode 215 - Kth Largest Element (Quickselect)](https://leetcode.com/problems/kth-largest-element-in-an-array/)

</details>

<details>
<summary><b>🔀 Merge Sort</b></summary>

* **Core Concept**: Divides array in halves, sorts each half recursively, and stably merges the two sorted sequences.
* **Complexity**: Guaranteed $O(N \log N)$ worst-case \| Space: $O(N)$ auxiliary.
* **Characteristics**: Stable, ideal for linked lists and external disk-based sorting.
* **Practice**: [LeetCode 148 - Sort List](https://leetcode.com/problems/sort-list/) • [LeetCode 493 - Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) • [LeetCode 315 - Count of Smaller Numbers](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)

</details>

<details>
<summary><b>🏔️ Heap Sort</b></summary>

* **Core Concept**: Transforms array into a Max-Heap, then repeatedly extracts root to the end of the array.
* **Complexity**: Guaranteed $O(N \log N)$ time in all cases \| Space: $O(1)$ auxiliary memory.
* **Characteristics**: In-place, non-recursive, ideal for memory-constrained embedded systems.
* **Practice**: [LeetCode 23 - Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) • [LeetCode 347 - Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

</details>

<details>
<summary><b>🎯 Radix Sort (LSD) & Counting Sort</b></summary>

* **Core Concept**: Non-comparison sorting algorithms. Counting sort tallies frequencies in bounded range $[0, K]$; Radix Sort processes integer digits from least to most significant digit.
* **Complexity**: Counting Sort: $O(N + K)$ \| Radix Sort: $O(d \cdot (N + K))$.
* **Practice**: [LeetCode 164 - Maximum Gap](https://leetcode.com/problems/maximum-gap/) • [LeetCode 75 - Sort Colors](https://leetcode.com/problems/sort-colors/) • [LeetCode 1122 - Relative Sort Array](https://leetcode.com/problems/relative-sort-array/)

</details>

<details>
<summary><b>🧩 Insertion, Selection, Shell & Bubble Sort</b></summary>

* **Insertion Sort**: Shifts items to insert into sorted prefix; runs in $O(N)$ linear time on nearly-sorted data.
* **Selection Sort**: Scans for minimum element; minimizes memory writes to at most $O(N)$ swaps.
* **Shell Sort**: Diminishing gap intervals ($N/2, N/4, \dots, 1$) allowing long-distance exchanges.
* **Bubble Sort**: Adjacent swap sorting with adaptive early-exit flag.

</details>

---

### 🗺️ 4. Graph & Pathfinding Engines

<details>
<summary><b>🛣️ Dijkstra's Shortest Path Algorithm</b></summary>

* **Core Concept**: Greedily explores the minimum tentative distance node using a Min-Priority Queue.
* **Guarantee**: Guaranteed shortest path on non-negative weighted graphs in $O((V + E) \log V)$ time.
* **Practice**: [LeetCode 743 - Network Delay Time](https://leetcode.com/problems/network-delay-time/) • [LeetCode 1514 - Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/) • [Codeforces 20C - Dijkstra?](https://codeforces.com/problemset/problem/20/C)

</details>

<details>
<summary><b>🌟 A\* (A-Star) Search</b></summary>

* **Core Concept**: Informed search using evaluation function $f(n) = g(n) + h(n)$ (exact cost from start + admissible heuristic estimate to goal).
* **Superpower**: Significantly faster exploration than Dijkstra in 2D grids and robotics routing.
* **Practice**: [LeetCode 773 - Sliding Puzzle](https://leetcode.com/problems/sliding-puzzle/) • [LeetCode 1091 - Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

</details>

<details>
<summary><b>🌊 Breadth-First Search (BFS) & Depth-First Search (DFS)</b></summary>

* **BFS**: Explores radial waves using a FIFO Queue. Guarantees shortest path in unweighted graphs in $O(V + E)$.
* **DFS**: Dives deep along branches before backtracking using a Stack. Ideal for topological sort, cycle detection, and maze generation.
* **Practice**: [LeetCode 200 - Number of Islands](https://leetcode.com/problems/number-of-islands/) • [LeetCode 127 - Word Ladder](https://leetcode.com/problems/word-ladder/) • [LeetCode 133 - Clone Graph](https://leetcode.com/problems/clone-graph/)

</details>

---

### 🌲 5. Trees & Balanced BST

<details>
<summary><b>⚖️ AVL Tree (Self-Balancing) & BST</b></summary>

* **Binary Search Tree (BST)**: Binary tree where `Left < Node < Right`. Can degrade to $O(N)$ linked list if unbalanced.
* **AVL Tree**: Strict self-balancing BST with balance factor $\in \{-1, 0, 1\}$. Uses 4 rotation types (LL, RR, LR, RL) to guarantee strict $O(\log N)$ worst-case lookups, insertions, and deletions.
* **Practice**: [LeetCode 98 - Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) • [LeetCode 110 - Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) • [LeetCode 1382 - Balance a BST](https://leetcode.com/problems/balance-a-binary-search-tree/)

</details>

---

### 💡 6. Dynamic Programming & Backtracking

<details>
<summary><b>🧠 0/1 Knapsack, LCS & N-Queens</b></summary>

* **Dynamic Programming (DP)**: Solves overlapping subproblems once and memoizes results to prevent redundant recalculation.
* **0/1 Knapsack**: `dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])`.
* **Longest Common Subsequence (LCS)**: Finds longest relative order sequence; foundation of `git diff` and DNA alignment.
* **N-Queens Backtracking**: Recursively explores state trees while pruning attacking configurations.
* **Practice**: [LeetCode 416 - Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) • [LeetCode 1143 - Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) • [LeetCode 51 - N-Queens](https://leetcode.com/problems/n-queens/)

</details>

---

### 🔎 7. Searching Algorithms

<details>
<summary><b>🎯 Binary Search & Linear Search</b></summary>

* **Binary Search**: Logarithmic $O(\log N)$ search on sorted arrays by repeatedly halving search intervals.
* **Linear Search**: $O(N)$ sequential scan on unsorted arrays.
* **Practice**: [LeetCode 704 - Binary Search](https://leetcode.com/problems/binary-search/) • [LeetCode 33 - Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) • [LeetCode 4 - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

</details>

---

## 🛠️ Tech Stack & Engineering

- **Frontend**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Web Audio API Oscillators
- **Visual FX**: Canvas Confetti

---

## 🚀 Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/megatron144/AlgoViz-Interactive-DSA-Visualizer.git

# 2. Enter project folder
cd AlgoViz-Interactive-DSA-Visualizer

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
