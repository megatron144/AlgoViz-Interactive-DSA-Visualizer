export const CODE_SNIPPETS = {
  // Advanced CP
  'segment-tree': {
    javascript: `// Segment Tree with Range Sum & Point Update
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 1, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(arr, 2 * node, start, mid);
    this.build(arr, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  update(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) this.update(2 * node, start, mid, idx, val);
    else this.update(2 * node + 1, mid + 1, end, idx, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  query(node, start, end, l, r) {
    if (r < start || end < l) return 0; // Disjoint
    if (l <= start && end <= r) return this.tree[node]; // Contained
    const mid = Math.floor((start + end) / 2);
    return this.query(2 * node, start, mid, l, r) +
           this.query(2 * node + 1, mid + 1, end, l, r);
  }
}`,
    python: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 1, 0, self.n - 1)

    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self.build(arr, 2 * node, start, mid)
        self.build(arr, 2 * node + 1, mid + 1, end)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

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

    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return self.query(2 * node, start, mid, l, r) + \\
               self.query(2 * node + 1, mid + 1, end, l, r)`,
    cpp: `template<typename T>
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
    javascript: `// Binary Lifting: LCA and k-th ancestor in O(log N)
const LOGN = 20;
let up = []; // up[node][i] = 2^i-th ancestor
let depth = [];

function dfs(u, p, d) {
  depth[u] = d;
  up[u][0] = p;
  for (let i = 1; i < LOGN; i++) {
    up[u][i] = up[up[u][i - 1]][i - 1];
  }
  for (let v of adj[u]) {
    if (v !== p) dfs(v, u, d + 1);
  }
}

function getKthAncestor(node, k) {
  for (let i = 0; i < LOGN; i++) {
    if ((k & (1 << i)) !== 0) {
      node = up[node][i];
      if (node === -1) break;
    }
  }
  return node;
}

function getLCA(u, v) {
  if (depth[u] < depth[v]) [u, v] = [v, u];
  // 1. Align depths
  for (let i = LOGN - 1; i >= 0; i--) {
    if (depth[u] - (1 << i) >= depth[v]) {
      u = up[u][i];
    }
  }
  if (u === v) return u;
  // 2. Jump together
  for (let i = LOGN - 1; i >= 0; i--) {
    if (up[u][i] !== up[v][i]) {
      u = up[u][i];
      v = up[v][i];
    }
  }
  return up[u][0];
}`,
    python: `LOGN = 20

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
    javascript: `// Sparse Table for RMQ in O(1) query time
class SparseTable {
  constructor(arr) {
    this.n = arr.length;
    this.K = Math.floor(Math.log2(this.n)) + 1;
    this.st = Array.from({ length: this.n }, () => new Array(this.K).fill(0));
    this.build(arr);
  }

  build(arr) {
    for (let i = 0; i < this.n; i++) this.st[i][0] = arr[i];
    for (let j = 1; j < this.K; j++) {
      for (let i = 0; i + (1 << j) <= this.n; i++) {
        this.st[i][j] = Math.min(
          this.st[i][j - 1],
          this.st[i + (1 << (j - 1))][j - 1]
        );
      }
    }
  }

  query(L, R) {
    const len = R - L + 1;
    const k = Math.floor(Math.log2(len));
    return Math.min(this.st[L][k], this.st[R - (1 << k) + 1][k]);
  }
}`,
    python: `import math

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

  'hld': {
    javascript: `// Heavy-Light Decomposition
let parent = [], depth = [], heavy = [], head = [], pos = [];
let curPos = 0;

function dfsHLD(v, p, d) {
  let size = 1, maxCSize = 0;
  parent[v] = p; depth[v] = d; heavy[v] = -1;
  for (let c of adj[v]) {
    if (c !== p) {
      let cSize = dfsHLD(c, v, d + 1);
      size += cSize;
      if (cSize > maxCSize) {
        maxCSize = cSize;
        heavy[v] = c; // Heavy Child
      }
    }
  }
  return size;
}

function decompose(v, h) {
  head[v] = h;
  pos[v] = ++curPos;
  if (heavy[v] !== -1) decompose(heavy[v], h);
  for (let c of adj[v]) {
    if (c !== parent[v] && c !== heavy[v]) {
      decompose(c, c); // New Light Chain Head
    }
  }
}

function queryPath(u, v) {
  let res = 0;
  while (head[u] !== head[v]) {
    if (depth[head[u]] > depth[head[v]]) [u, v] = [v, u];
    res += segTree.query(pos[head[v]], pos[v]);
    v = parent[head[v]];
  }
  if (depth[u] > depth[v]) [u, v] = [v, u];
  res += segTree.query(pos[u], pos[v]);
  return res;
}`,
    python: `def dfs_size(u, p, d, parent, depth, heavy, adj):
    size = 1
    max_c_size = 0
    parent[u] = p
    depth[u] = d
    heavy[u] = -1
    for v in adj[u]:
        if v != p:
            c_size = dfs_size(v, u, d + 1, parent, depth, heavy, adj)
            size += c_size
            if c_size > max_c_size:
                max_c_size = c_size
                heavy[u] = v
    return size

def decompose(u, h, parent, heavy, head, pos, adj, cur_pos):
    head[u] = h
    pos[u] = cur_pos[0]
    cur_pos[0] += 1
    if heavy[u] != -1:
        decompose(heavy[u], h, parent, heavy, head, pos, adj, cur_pos)
    for v in adj[u]:
        if v != parent[u] and v != heavy[u]:
            decompose(v, v, parent, heavy, head, pos, adj, cur_pos)`,
    cpp: `int parent_node[N], depth[N], heavy[N], head[N], pos[N], cur_pos;

int dfs(int v, int p = 0, int d = 0) {
    int size = 1, max_c_size = 0;
    depth[v] = d; parent_node[v] = p; heavy[v] = -1;
    for (int c : adj[v]) {
        if (c != p) {
            int c_size = dfs(c, v, d + 1);
            size += c_size;
            if (c_size > max_c_size) {
                max_c_size = c_size;
                heavy[v] = c;
            }
        }
    }
    return size;
}

void decompose(int v, int h) {
    head[v] = h; pos[v] = ++cur_pos;
    if (heavy[v] != -1) decompose(heavy[v], h);
    for (int c : adj[v]) {
        if (c != parent_node[v] && c != heavy[v]) decompose(c, c);
    }
}`
  },

  'linear-basis': {
    javascript: `// Linear Basis over GF(2) / XOR Vector Space
class LinearBasis {
  constructor(bits = 32) {
    this.bits = bits;
    this.basis = new Array(bits).fill(0);
  }

  insert(mask) {
    for (let i = this.bits - 1; i >= 0; i--) {
      if ((mask & (1 << i)) === 0) continue;
      if (!this.basis[i]) {
        this.basis[i] = mask; // Linear independent vector found
        return true;
      }
      mask ^= this.basis[i]; // Reduce using basis vector
    }
    return false; // Linearly dependent
  }

  getMaxXor() {
    let maxXor = 0;
    for (let i = this.bits - 1; i >= 0; i--) {
      if ((maxXor ^ this.basis[i]) > maxXor) {
        maxXor ^= this.basis[i];
      }
    }
    return maxXor;
  }

  canForm(mask) {
    for (let i = this.bits - 1; i >= 0; i--) {
      if ((mask & (1 << i)) === 0) continue;
      if (!this.basis[i]) return false;
      mask ^= this.basis[i];
    }
    return mask === 0;
  }
}`,
    python: `class LinearBasis:
    def __init__(self, bits=32):
        self.bits = bits
        self.basis = [0] * bits

    def insert(self, mask):
        for i in range(self.bits - 1, -1, -1):
            if not (mask & (1 << i)):
                continue
            if not self.basis[i]:
                self.basis[i] = mask
                return True
            mask ^= self.basis[i]
        return False

    def get_max_xor(self):
        max_xor = 0
        for i in range(self.bits - 1, -1, -1):
            if (max_xor ^ self.basis[i]) > max_xor:
                max_xor ^= self.basis[i]
        return max_xor`,
    cpp: `struct LinearBasis {
    static const int BITS = 32;
    int basis[BITS];
    LinearBasis() { memset(basis, 0, sizeof(basis)); }

    bool insert(int mask) {
        for (int i = BITS - 1; i >= 0; i--) {
            if (!(mask & (1 << i))) continue;
            if (!basis[i]) { basis[i] = mask; return true; }
            mask ^= basis[i];
        }
        return false;
    }

    int getMaxXor() {
        int res = 0;
        for (int i = BITS - 1; i >= 0; i--) {
            if ((res ^ basis[i]) > res) res ^= basis[i];
        }
        return res;
    }
};`
  },

  // Standard Sorting
  'bubble-sort': {
    javascript: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
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
    cpp: `void bubbleSort(vector<int>& arr) {
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

  'quick-sort': {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
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
    cpp: `int partition(vector<int>& arr, int low, int high) {
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
    javascript: `function mergeSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`,
    python: `def merge_sort(arr):
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
    cpp: `void merge(vector<int>& arr, int l, int m, int r) {
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
  }
};
