export const CODE_SNIPPETS = {
  // =========================================================================
  // 1. ADVANCED DATA STRUCTURES & COMPETITIVE PROGRAMMING
  // =========================================================================
  'segment-tree': {
    java: `// Segment Tree with Point Updates & Range Sum Queries in Java
class SegmentTree {
    private int n;
    private int[] tree; // Stores aggregated tree node values (4 * N space)

    public SegmentTree(int[] arr) {
        this.n = arr.length;
        this.tree = new int[4 * n];
        // Build the segment tree recursively starting from root node (index 1)
        build(arr, 1, 0, n - 1);
    }

    // Recursively construct tree nodes covering interval [start...end]
    private void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            // Leaf node represents single array element
            tree[node] = arr[start];
            return;
        }
        int mid = start + (end - start) / 2;
        // Build left child interval [start...mid] and right child [mid+1...end]
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        // Internal node stores the sum of its two children
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    // Point Update: modify element at 'idx' to 'val' in O(log N)
    public void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = start + (end - start) / 2;
        if (idx <= mid) update(2 * node, start, mid, idx, val);
        else update(2 * node + 1, mid + 1, end, idx, val);
        // Recalculate parent sum after child update
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    // Range Query: calculate sum in range [l...r] in O(log N)
    public int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // Disjoint interval: returns identity (0)
        if (l <= start && end <= r) return tree[node]; // Current range completely inside [l, r]
        
        // Partial overlap: query both children and combine results
        int mid = start + (end - start) / 2;
        return query(2 * node, start, mid, l, r) +
               query(2 * node + 1, mid + 1, end, l, r);
    }
}`,
    python: `# Segment Tree with Point Update & Range Sum Query in Python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 1, 0, self.n - 1)

    # Build tree recursively
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self.build(arr, 2 * node, start, mid)
        self.build(arr, 2 * node + 1, mid + 1, end)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    # Point Update in O(log N)
    def update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
            return
        mid = (start + end) // 2
        if idx <= mid:
            self.update(2 * node, start, mid, idx, val)
        else:
            self.update(2 * node + 1, mid + 1, end, idx, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    # Range Query in O(log N)
    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return self.query(2 * node, start, mid, l, r) + \\
               self.query(2 * node + 1, mid + 1, end, l, r)`,
    cpp: `// Segment Tree in C++ with Range Sum Queries
template<typename T>
struct SegmentTree {
    int n;
    vector<T> tree;

    SegmentTree(const vector<T>& arr) {
        n = arr.size();
        tree.assign(4 * n, 0);
        build(arr, 1, 0, n - 1);
    }

    void build(const vector<T>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    void update(int node, int start, int end, int idx, T val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2 * node, start, mid, idx, val);
        else update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    T query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node, start, mid, l, r) + query(2 * node + 1, mid + 1, end, l, r);
    }
};`
  },

  'binary-lifting': {
    java: `// Binary Lifting for LCA & k-th Ancestor in O(log N) in Java
import java.util.*;

class BinaryLifting {
    private static final int LOGN = 20; // 2^20 > 1,000,000 nodes
    private int[][] up;     // up[u][i] stores 2^i-th ancestor of node u
    private int[] depth;   // Depth of each node from root

    // Preprocessing table: O(N log N)
    public void preprocess(int root, List<List<Integer>> adj, int n) {
        up = new int[n + 1][LOGN];
        depth = new int[n + 1];
        dfs(root, root, 0, adj);
    }

    // DFS to initialize 2^0 ancestor and depths
    private void dfs(int u, int p, int d, List<List<Integer>> adj) {
        depth[u] = d;
        up[u][0] = p; // 2^0 = 1st ancestor is direct parent
        for (int i = 1; i < LOGN; i++) {
            // 2^i ancestor is 2^(i-1) ancestor of 2^(i-1) ancestor
            up[u][i] = up[up[u][i - 1]][i - 1];
        }
        for (int v : adj.get(u)) {
            if (v != p) dfs(v, u, d + 1, adj);
        }
    }

    // Query k-th ancestor of node in O(log N)
    public int getKthAncestor(int node, int k) {
        for (int i = 0; i < LOGN; i++) {
            if ((k & (1 << i)) != 0) { // Check if i-th bit is set
                node = up[node][i];
            }
        }
        return node;
    }

    // Query Lowest Common Ancestor (LCA) in O(log N)
    public int getLCA(int u, int v) {
        // Ensure u is deeper than v
        if (depth[u] < depth[v]) { int t = u; u = v; v = t; }

        // 1. Lift u up to the same depth as v
        for (int i = LOGN - 1; i >= 0; i--) {
            if (depth[u] - (1 << i) >= depth[v]) {
                u = up[u][i];
            }
        }
        if (u == v) return u;

        // 2. Jump together while ancestors differ
        for (int i = LOGN - 1; i >= 0; i--) {
            if (up[u][i] != up[v][i]) {
                u = up[u][i];
                v = up[v][i];
            }
        }
        return up[u][0]; // Parent of current node is LCA
    }
}`,
    python: `# Binary Lifting for LCA in Python
LOGN = 20

def preprocess(root, adj, n):
    up = [[0] * LOGN for _ in range(n + 1)]
    depth = [0] * (n + 1)
    
    def dfs(u, p, d):
        depth[u] = d
        up[u][0] = p
        for i in range(1, LOGN):
            up[u][i] = up[up[u][i-1]][i-1]
        for v in adj[u]:
            if v != p:
                dfs(v, u, d + 1)
    dfs(root, root, 0)
    return up, depth

def get_lca(u, v, up, depth):
    if depth[u] < depth[v]:
        u, v = v, u
    for i in range(LOGN - 1, -1, -1):
        if depth[u] - (1 << i) >= depth[v]:
            u = up[u][i]
    if u == v:
        return u
    for i in range(LOGN - 1, -1, -1):
        if up[u][i] != up[v][i]:
            u = up[u][i]
            v = up[v][i]
    return up[u][0]`,
    cpp: `const int LOGN = 20;
int up[MAXN][LOGN], depth[MAXN];

void dfs(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p;
    for (int i = 1; i < LOGN; i++) {
        up[u][i] = up[up[u][i - 1]][i - 1];
    }
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int getLCA(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    for (int i = LOGN - 1; i >= 0; i--) {
        if (depth[u] - (1 << i) >= depth[v]) u = up[u][i];
    }
    if (u == v) return u;
    for (int i = LOGN - 1; i >= 0; i--) {
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    }
    return up[u][0];
}`
  },

  'sparse-table': {
    java: `// Sparse Table for Range Minimum Query (RMQ) in O(1) in Java
class SparseTable {
    private int[][] st; // st[i][j] = min in range [i, i + 2^j - 1]
    private int[] log;  // Precomputed log2 values

    public SparseTable(int[] arr) {
        int n = arr.length;
        int k = (int) (Math.log(n) / Math.log(2)) + 1;
        st = new int[n][k];
        log = new int[n + 1];

        // 1. Precalculate log table for O(1) floor(log2) lookups
        log[1] = 0;
        for (int i = 2; i <= n; i++) log[i] = log[i / 2] + 1;

        // 2. Base intervals of length 2^0 = 1
        for (int i = 0; i < n; i++) st[i][0] = arr[i];

        // 3. Dynamic Programming to combine two sub-intervals of length 2^(j-1)
        for (int j = 1; j < k; j++) {
            for (int i = 0; i + (1 << j) <= n; i++) {
                st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    // Query minimum element in [L, R] in O(1) time
    public int query(int l, int r) {
        int len = r - l + 1;
        int j = log[len]; // Highest power of 2 <= interval length
        // Overlap two blocks of length 2^j
        return Math.min(st[l][j], st[r - (1 << j) + 1][j]);
    }
}`,
    python: `import math

# Sparse Table in Python
class SparseTable:
    def __init__(self, arr):
        self.n = len(arr)
        self.k = math.floor(math.log2(self.n)) + 1 if self.n > 0 else 1
        self.st = [[0] * self.k for _ in range(self.n)]
        for i in range(self.n):
            self.st[i][0] = arr[i]
        for j in range(1, self.k):
            for i in range(self.n - (1 << j) + 1):
                self.st[i][j] = min(self.st[i][j-1], self.st[i + (1 << (j-1))][j-1])

    def query(self, L, R):
        k = math.floor(math.log2(R - L + 1))
        return min(self.st[L][k], self.st[R - (1 << k) + 1][k])`,
    cpp: `struct SparseTable {
    vector<vector<int>> st;
    SparseTable(const vector<int>& arr) {
        int n = arr.size();
        int K = __lg(n) + 1;
        st.assign(n, vector<int>(K));
        for (int i = 0; i < n; i++) st[i][0] = arr[i];
        for (int j = 1; j < K; j++) {
            for (int i = 0; i + (1 << j) <= n; i++) {
                st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }
    int query(int L, int R) {
        int k = __lg(R - L + 1);
        return min(st[L][k], st[R - (1 << k) + 1][k]);
    }
};`
  },

  // =========================================================================
  // 2. SORTING ALGORITHMS
  // =========================================================================
  'bubble-sort': {
    java: `// Bubble Sort in Java: Repeatedly swaps adjacent inverted elements
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        // Outer loop passes over array (n - 1) times
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false; // Flag to detect already-sorted arrays early
            // Inner loop bubbles largest unsorted element to index (n - i - 1)
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no swaps occurred in pass, array is completely sorted
            if (!swapped) break;
        }
    }
}`,
    python: `# Bubble Sort in Python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    cpp: `// Bubble Sort in C++
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`
  },

  'selection-sort': {
    java: `// Selection Sort in Java: Repeatedly finds minimum element from unsorted part
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        // Move boundary of unsorted subarray one by one
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i; // Assume first unsorted element is minimum
            // Scan through remainder of array to locate smallest value
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j; // Found new minimum index
                }
            }
            // Swap found minimum element with first element of unsorted part
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }
}`,
    python: `# Selection Sort in Python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    cpp: `// Selection Sort in C++
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`
  },

  'insertion-sort': {
    java: `// Insertion Sort in Java: Inserts current element into its correct sorted position
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        // Start from second element (index 1)
        for (int i = 1; i < n; i++) {
            int key = arr[i]; // Value to be placed into sorted left subarray
            int j = i - 1;

            // Shift elements of arr[0..i-1] that are greater than key to one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            // Place key into its proper sorted slot
            arr[j + 1] = key;
        }
    }
}`,
    python: `# Insertion Sort in Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    cpp: `// Insertion Sort in C++
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
  },

  'quick-sort': {
    java: `// Quick Sort in Java: Divide-and-conquer partitioning around pivot element
public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // pi is partitioning index: arr[pi] is now in exact sorted position
            int pi = partition(arr, low, high);

            // Recursively sort elements before partition and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    // Lomuto Partitioning Scheme: places pivot at its sorted position
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Select rightmost element as pivot
        int i = low - 1;       // Index of smaller element

        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // Swap pivot with element at (i + 1) to finalize pivot placement
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    python: `# Quick Sort in Python
def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    cpp: `// Quick Sort in C++
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
  },

  'merge-sort': {
    java: `// Merge Sort in Java: Divide-and-conquer with guaranteed O(N log N) time
public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            // Find middle index to divide array into halves
            int m = l + (r - l) / 2;

            // Sort first and second halves recursively
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            // Merge the two sorted halves
            merge(arr, l, m, r);
        }
    }

    // Merges two sorted subarrays arr[l..m] and arr[m+1..r]
    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        // Create temporary auxiliary arrays
        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

        // Two pointers to merge L and R back into arr[l..r]
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }

        // Copy remaining elements of L[] if any
        while (i < n1) arr[k++] = L[i++];
        // Copy remaining elements of R[] if any
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    python: `# Merge Sort in Python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L, R = arr[:mid], arr[mid:]
        merge_sort(L); merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]: arr[k] = L[i]; i += 1
            else: arr[k] = R[j]; j += 1
            k += 1
        while i < len(L): arr[k] = L[i]; i += 1; k += 1
        while j < len(R): arr[k] = R[j]; j += 1; k += 1`,
    cpp: `// Merge Sort in C++
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`
  },

  'heap-sort': {
    java: `// Heap Sort in Java: Converts array to Max-Heap and extracts maximums
public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // 1. Build max heap (rearrange array from bottom-up internal nodes)
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // 2. Extract elements one by one from heap root
        for (int i = n - 1; i > 0; i--) {
            // Move current max root arr[0] to end index i
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Restore max heap property on reduced heap
            heapify(arr, i, 0);
        }
    }

    // Heapify subtree rooted at index i with heap size n
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;       // Initialize largest as root
        int l = 2 * i + 1;     // Left child
        int r = 2 * i + 2;     // Right child

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        // If largest is not root, swap and continue heapifying
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}`,
    python: `# Heap Sort in Python
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1; r = 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`,
    cpp: `// Heap Sort in C++
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`
  },

  'shell-sort': {
    java: `// Shell Sort in Java: Optimization of insertion sort using decreasing gap sequences
public class ShellSort {
    public static void shellSort(int[] arr) {
        int n = arr.length;
        // Start with a large gap, then reduce the gap in half each iteration
        for (int gap = n / 2; gap > 0; gap /= 2) {
            // Perform gapped insertion sort for this gap size
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                // Shift earlier gap-sorted elements up until correct location found
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }
}`,
    python: `# Shell Sort in Python
def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    cpp: `// Shell Sort in C++
void shellSort(vector<int>& arr) {
    int n = arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`
  },

  'radix-sort': {
    java: `// Radix Sort (LSD) in Java: Non-comparison integer sorting by digit position
import java.util.Arrays;

public class RadixSort {
    public static void radixSort(int[] arr) {
        // Find the maximum number to know maximum number of digits
        int max = getMax(arr);

        // Do counting sort for every digit place: 1s (exp=1), 10s (exp=10), etc.
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countSortByDigit(arr, exp);
        }
    }

    // Stable counting sort subroutine applied on digit place (exp)
    private static void countSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10]; // Buckets for digits 0-9

        // 1. Store count of occurrences of each digit
        for (int i = 0; i < n; i++) {
            int digit = (arr[i] / exp) % 10;
            count[digit]++;
        }

        // 2. Change count[i] so that count[i] contains actual position in output[]
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // 3. Build output array in reverse order to preserve stable ordering
        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        // 4. Copy sorted output back to arr[]
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }

    private static int getMax(int[] arr) {
        int mx = arr[0];
        for (int x : arr) if (x > mx) mx = x;
        return mx;
    }
}`,
    python: `# Radix Sort (LSD) in Python
def counting_sort_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_digit(arr, exp)
        exp *= 10
    return arr`,
    cpp: `// Radix Sort in C++
void countSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n), count(10, 0);
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int d = (arr[i] / exp) % 10;
        output[count[d] - 1] = arr[i];
        count[d]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(vector<int>& arr) {
    if (arr.empty()) return;
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countSort(arr, exp);
    }
}`
  },

  // =========================================================================
  // 3. SEARCHING ALGORITHMS
  // =========================================================================
  'binary-search': {
    java: `// Binary Search in Java: O(log N) lookup in sorted arrays
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            // Avoid integer overflow with low + (high - low) / 2
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid; // Target found at index mid
            } else if (arr[mid] < target) {
                low = mid + 1; // Discard left half
            } else {
                high = mid - 1; // Discard right half
            }
        }
        return -1; // Target element not present
    }
}`,
    python: `# Binary Search in Python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    cpp: `// Binary Search in C++
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
  }
};
