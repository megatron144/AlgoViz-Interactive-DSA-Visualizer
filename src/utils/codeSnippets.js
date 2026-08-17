export const CODE_SNIPPETS = {
  // =========================================================================
  // 0. FUNDAMENTAL DATA STRUCTURES (Stack, Queue, Heaps)
  // =========================================================================
  'stack': {
    java: `// Stack (LIFO - Last In, First Out) Implementation in Java
public class Stack {
    private int maxSize;
    private int[] stackArray;
    private int top; // Index of top element

    public Stack(int size) {
        this.maxSize = size;
        this.stackArray = new int[maxSize];
        this.top = -1; // Empty stack indicator
    }

    // Push: Inserts an element on top of the stack in O(1)
    public void push(int value) {
        if (isFull()) {
            throw new IllegalStateException("Stack Overflow: Stack is full.");
        }
        stackArray[++top] = value;
    }

    // Pop: Removes and returns the top element in O(1)
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack Underflow: Stack is empty.");
        }
        return stackArray[top--];
    }

    // Peek: Returns top element without removing it in O(1)
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty.");
        }
        return stackArray[top];
    }

    public boolean isEmpty() { return top == -1; }
    public boolean isFull() { return top == maxSize - 1; }
    public int size() { return top + 1; }
}`,
    python: `# Stack (LIFO) in Python
class Stack:
    def __init__(self, max_size=100):
        self.max_size = max_size
        self.stack = []

    # Push in O(1)
    def push(self, value):
        if len(self.stack) >= self.max_size:
            raise OverflowError("Stack Overflow")
        self.stack.append(value)

    # Pop in O(1)
    def pop(self):
        if not self.stack:
            raise IndexError("Stack Underflow: pop from empty stack")
        return self.stack.pop()

    # Peek in O(1)
    def peek(self):
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1]

    def is_empty(self): return len(self.stack) == 0
    def is_full(self): return len(self.stack) >= self.max_size
    def size(self): return len(self.stack)`,
    cpp: `// Stack (LIFO) in C++
template<typename T>
class Stack {
private:
    vector<T> elements;
    int maxSize;

public:
    Stack(int size = 100) : maxSize(size) {}

    void push(T val) {
        if (elements.size() >= maxSize) throw runtime_error("Stack Overflow");
        elements.push_back(val);
    }

    T pop() {
        if (elements.empty()) throw runtime_error("Stack Underflow");
        T val = elements.back();
        elements.pop_back();
        return val;
    }

    T peek() const {
        if (elements.empty()) throw runtime_error("Stack is empty");
        return elements.back();
    }

    bool isEmpty() const { return elements.empty(); }
    bool isFull() const { return elements.size() >= maxSize; }
    int size() const { return elements.size(); }
};`
  },

  'queue': {
    java: `// Circular Queue (FIFO - First In, First Out) Implementation in Java
public class Queue {
    private int capacity;
    private int[] queueArray;
    private int front;
    private int rear;
    private int count;

    public Queue(int capacity) {
        this.capacity = capacity;
        this.queueArray = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    // Enqueue: Inserts element at the REAR in O(1)
    public void enqueue(int item) {
        if (isFull()) {
            throw new IllegalStateException("Queue Overflow: Queue is full.");
        }
        rear = (rear + 1) % capacity;
        queueArray[rear] = item;
        count++;
    }

    // Dequeue: Removes and returns element from the FRONT in O(1)
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue Underflow: Queue is empty.");
        }
        int item = queueArray[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    // Peek: Returns front element in O(1)
    public int peekFront() {
        if (isEmpty()) throw new IllegalStateException("Queue is empty.");
        return queueArray[front];
    }

    public boolean isEmpty() { return count == 0; }
    public boolean isFull() { return count == capacity; }
    public int size() { return count; }
}`,
    python: `# Queue (FIFO) in Python
class Queue:
    def __init__(self, capacity=100):
        self.capacity = capacity
        self.queue = []

    # Enqueue in O(1)
    def enqueue(self, item):
        if len(self.queue) >= self.capacity:
            raise OverflowError("Queue Overflow")
        self.queue.append(item)

    # Dequeue in O(1)
    def dequeue(self):
        if not self.queue:
            raise IndexError("Queue Underflow: dequeue from empty queue")
        return self.queue.pop(0)

    # Peek in O(1)
    def peek(self):
        if not self.queue:
            raise IndexError("Queue is empty")
        return self.queue[0]

    def is_empty(self): return len(self.queue) == 0
    def is_full(self): return len(self.queue) >= self.capacity
    def size(self): return len(self.queue)`,
    cpp: `// Circular Queue (FIFO) in C++
template<typename T>
class Queue {
private:
    vector<T> arr;
    int front, rear, count, capacity;

public:
    Queue(int cap = 100) : capacity(cap), front(0), rear(-1), count(0), arr(cap) {}

    void enqueue(T item) {
        if (count >= capacity) throw runtime_error("Queue Overflow");
        rear = (rear + 1) % capacity;
        arr[rear] = item;
        count++;
    }

    T dequeue() {
        if (count == 0) throw runtime_error("Queue Underflow");
        T item = arr[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    T peek() const {
        if (count == 0) throw runtime_error("Queue is empty");
        return arr[front];
    }

    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }
    int size() const { return count; }
};`
  },

  'max-heap': {
    java: `// Binary Max-Heap Implementation in Java
import java.util.*;

public class MaxHeap {
    private ArrayList<Integer> heap = new ArrayList<>();

    // Insert new element into Max-Heap: O(log N)
    public void insert(int val) {
        heap.add(val);
        siftUp(heap.size() - 1);
    }

    // Extract maximum root element: O(log N)
    public int extractMax() {
        if (heap.isEmpty()) throw new NoSuchElementException("Heap is empty.");
        int maxVal = heap.get(0);
        int lastVal = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, lastVal);
            siftDown(0);
        }
        return maxVal;
    }

    // Restore heap invariant upwards
    private void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (heap.get(i) > heap.get(parent)) {
                Collections.swap(heap, i, parent);
                i = parent;
            } else break;
        }
    }

    // Restore heap invariant downwards
    private void siftDown(int i) {
        int n = heap.size();
        while (i < n) {
            int largest = i;
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && heap.get(l) > heap.get(largest)) largest = l;
            if (r < n && heap.get(r) > heap.get(largest)) largest = r;
            if (largest != i) {
                Collections.swap(heap, i, largest);
                i = largest;
            } else break;
        }
    }

    public int peekMax() {
        if (heap.isEmpty()) throw new NoSuchElementException("Heap is empty.");
        return heap.get(0);
    }

    public int size() { return heap.size(); }
    public boolean isEmpty() { return heap.isEmpty(); }
}`,
    python: `# Max-Heap in Python
class MaxHeap:
    def __init__(self):
        self.heap = []

    def insert(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def extract_max(self):
        if not self.heap: raise IndexError("Heap is empty")
        max_val = self.heap[0]
        last_val = self.heap.pop()
        if self.heap:
            self.heap[0] = last_val
            self._sift_down(0)
        return max_val

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else: break

    def _sift_down(self, i):
        n = len(self.heap)
        while i < n:
            largest = i
            l, r = 2 * i + 1, 2 * i + 2
            if l < n and self.heap[l] > self.heap[largest]: largest = l
            if r < n and self.heap[r] > self.heap[largest]: largest = r
            if largest != i:
                self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
                i = largest
            else: break`,
    cpp: `// Max-Heap in C++
class MaxHeap {
private:
    vector<int> heap;

    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (heap[i] > heap[p]) {
                swap(heap[i], heap[p]);
                i = p;
            } else break;
        }
    }

    void siftDown(int i) {
        int n = heap.size();
        while (i < n) {
            int largest = i;
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && heap[l] > heap[largest]) largest = l;
            if (r < n && heap[r] > heap[largest]) largest = r;
            if (largest != i) {
                swap(heap[i], heap[largest]);
                i = largest;
            } else break;
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        siftUp(heap.size() - 1);
    }

    int extractMax() {
        if (heap.empty()) throw runtime_error("Empty heap");
        int maxVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) siftDown(0);
        return maxVal;
    }
};`
  },

  'min-heap': {
    java: `// Binary Min-Heap Implementation in Java
import java.util.*;

public class MinHeap {
    private ArrayList<Integer> heap = new ArrayList<>();

    // Insert new element into Min-Heap: O(log N)
    public void insert(int val) {
        heap.add(val);
        siftUp(heap.size() - 1);
    }

    // Extract minimum root element: O(log N)
    public int extractMin() {
        if (heap.isEmpty()) throw new NoSuchElementException("Heap is empty.");
        int minVal = heap.get(0);
        int lastVal = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, lastVal);
            siftDown(0);
        }
        return minVal;
    }

    // Restore heap invariant upwards
    private void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (heap.get(i) < heap.get(parent)) {
                Collections.swap(heap, i, parent);
                i = parent;
            } else break;
        }
    }

    // Restore heap invariant downwards
    private void siftDown(int i) {
        int n = heap.size();
        while (i < n) {
            int smallest = i;
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && heap.get(l) < heap.get(smallest)) smallest = l;
            if (r < n && heap.get(r) < heap.get(smallest)) smallest = r;
            if (smallest != i) {
                Collections.swap(heap, i, smallest);
                i = smallest;
            } else break;
        }
    }

    public int peekMin() {
        if (heap.isEmpty()) throw new NoSuchElementException("Heap is empty.");
        return heap.get(0);
    }

    public int size() { return heap.size(); }
    public boolean isEmpty() { return heap.isEmpty(); }
}`,
    python: `# Min-Heap in Python
class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def extract_min(self):
        if not self.heap: raise IndexError("Heap is empty")
        min_val = self.heap[0]
        last_val = self.heap.pop()
        if self.heap:
            self.heap[0] = last_val
            self._sift_down(0)
        return min_val

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] < self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else: break

    def _sift_down(self, i):
        n = len(self.heap)
        while i < n:
            smallest = i
            l, r = 2 * i + 1, 2 * i + 2
            if l < n and self.heap[l] < self.heap[smallest]: smallest = l
            if r < n and self.heap[r] < self.heap[smallest]: smallest = r
            if smallest != i:
                self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
                i = smallest
            else: break`,
    cpp: `// Min-Heap in C++
class MinHeap {
private:
    vector<int> heap;

    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (heap[i] < heap[p]) {
                swap(heap[i], heap[p]);
                i = p;
            } else break;
        }
    }

    void siftDown(int i) {
        int n = heap.size();
        while (i < n) {
            int smallest = i;
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < n && heap[l] < heap[smallest]) smallest = l;
            if (r < n && heap[r] < heap[smallest]) smallest = r;
            if (smallest != i) {
                swap(heap[i], heap[smallest]);
                i = smallest;
            } else break;
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        siftUp(heap.size() - 1);
    }

    int extractMin() {
        if (heap.empty()) throw runtime_error("Empty heap");
        int minVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) siftDown(0);
        return minVal;
    }
};`
  },

  'deque': {
    java: `// Circular Array Deque (Double-Ended Queue) in Java
public class Deque {
    private int[] arr;
    private int front, rear, size, capacity;

    public Deque(int cap) {
        this.capacity = cap;
        this.arr = new int[cap];
        this.front = -1;
        this.rear = 0;
        this.size = 0;
    }

    // Insert element at Front: O(1)
    public void pushFront(int val) {
        if (isFull()) throw new IllegalStateException("Deque Overflow");
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (front == 0) {
            front = capacity - 1;
        } else {
            front--;
        }
        arr[front] = val;
        size++;
    }

    // Insert element at Back: O(1)
    public void pushBack(int val) {
        if (isFull()) throw new IllegalStateException("Deque Overflow");
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (rear == capacity - 1) {
            rear = 0;
        } else {
            rear++;
        }
        arr[rear] = val;
        size++;
    }

    // Remove element from Front: O(1)
    public int popFront() {
        if (isEmpty()) throw new IllegalStateException("Deque Underflow");
        int val = arr[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (front == capacity - 1) {
            front = 0;
        } else {
            front++;
        }
        size--;
        return val;
    }

    // Remove element from Back: O(1)
    public int popBack() {
        if (isEmpty()) throw new IllegalStateException("Deque Underflow");
        int val = arr[rear];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (rear == 0) {
            rear = capacity - 1;
        } else {
            rear--;
        }
        size--;
        return val;
    }

    public int peekFront() {
        if (isEmpty()) throw new IllegalStateException("Deque is empty");
        return arr[front];
    }

    public int peekBack() {
        if (isEmpty()) throw new IllegalStateException("Deque is empty");
        return arr[rear];
    }

    public boolean isFull() { return size == capacity; }
    public boolean isEmpty() { return size == 0; }
    public int size() { return size; }
}`,
    python: `# Double-Ended Queue (Deque) in Python
from collections import deque

class Deque:
    def __init__(self, capacity=100):
        self.capacity = capacity
        self.items = deque()

    # O(1) operations
    def push_front(self, val):
        if len(self.items) >= self.capacity: raise OverflowError("Deque Full")
        self.items.appendleft(val)

    def push_back(self, val):
        if len(self.items) >= self.capacity: raise OverflowError("Deque Full")
        self.items.append(val)

    def pop_front(self):
        if not self.items: raise IndexError("Deque Empty")
        return self.items.popleft()

    def pop_back(self):
        if not self.items: raise IndexError("Deque Empty")
        return self.items.pop()

    def peek_front(self): return self.items[0] if self.items else None
    def peek_back(self): return self.items[-1] if self.items else None
    def is_empty(self): return len(self.items) == 0
    def size(self): return len(self.items)`,
    cpp: `// Double-Ended Queue (Deque) in C++
#include <vector>
#include <stdexcept>
using namespace std;

template<typename T>
class Deque {
private:
    vector<T> arr;
    int front, rear, size, capacity;

public:
    Deque(int cap = 100) : capacity(cap), front(-1), rear(0), size(0), arr(cap) {}

    void pushFront(T val) {
        if (size == capacity) throw runtime_error("Deque Overflow");
        if (front == -1) front = 0, rear = 0;
        else if (front == 0) front = capacity - 1;
        else front--;
        arr[front] = val;
        size++;
    }

    void pushBack(T val) {
        if (size == capacity) throw runtime_error("Deque Overflow");
        if (front == -1) front = 0, rear = 0;
        else if (rear == capacity - 1) rear = 0;
        else rear++;
        arr[rear] = val;
        size++;
    }

    T popFront() {
        if (size == 0) throw runtime_error("Deque Underflow");
        T val = arr[front];
        if (front == rear) front = -1, rear = -1;
        else if (front == capacity - 1) front = 0;
        else front++;
        size--;
        return val;
    }

    T popBack() {
        if (size == 0) throw runtime_error("Deque Underflow");
        T val = arr[rear];
        if (front == rear) front = -1, rear = -1;
        else if (rear == 0) rear = capacity - 1;
        else rear--;
        size--;
        return val;
    }
};`
  },

  'priority-queue': {
    java: `// Priority Queue in Java using Max-Heap ordering
import java.util.*;

public class PriorityQueueEngine<T> {
    public static class Task implements Comparable<Task> {
        String name;
        int priority;

        public Task(String name, int priority) {
            this.name = name;
            this.priority = priority;
        }

        // Higher priority integer executes first
        @Override
        public int compareTo(Task other) {
            return Integer.compare(other.priority, this.priority);
        }
    }

    private PriorityQueue<Task> pq = new PriorityQueue<>();

    // Insert task in O(log N)
    public void enqueue(String name, int priority) {
        pq.offer(new Task(name, priority));
    }

    // Serve highest priority task in O(log N)
    public Task dequeue() {
        if (pq.isEmpty()) throw new NoSuchElementException("Priority Queue Empty");
        return pq.poll();
    }

    public Task peek() { return pq.peek(); }
    public boolean isEmpty() { return pq.isEmpty(); }
    public int size() { return pq.size(); }
}`,
    python: `# Priority Queue in Python using heapq
import heapq

class PriorityQueue:
    def __init__(self):
        self._heap = []
        self._index = 0

    # Insert with custom priority in O(log N)
    def enqueue(self, item, priority):
        # Negate priority for Max-Priority ordering
        heapq.heappush(self._heap, (-priority, self._index, item))
        self._index += 1

    # Extract top priority in O(log N)
    def dequeue(self):
        if not self._heap: raise IndexError("Priority Queue Empty")
        priority, _, item = heapq.heappop(self._heap)
        return item, -priority

    def peek(self):
        if not self._heap: return None
        return self._heap[0][2], -self._heap[0][0]

    def is_empty(self): return len(self._heap) == 0
    def size(self): return len(self._heap)`,
    cpp: `// Priority Queue in C++
#include <queue>
#include <string>
using namespace std;

struct Task {
    string name;
    int priority;

    bool operator<(const Task& other) const {
        return priority < other.priority; // Max-Priority
    }
};

class PriorityQueueEngine {
private:
    priority_queue<Task> pq;

public:
    void enqueue(string name, int priority) {
        pq.push({name, priority});
    }

    Task dequeue() {
        if (pq.empty()) throw runtime_error("Priority Queue is Empty");
        Task t = pq.top();
        pq.pop();
        return t;
    }

    Task peek() const { return pq.top(); }
    bool isEmpty() const { return pq.empty(); }
    int size() const { return pq.size(); }
};`
  },

  'dsu': {
    java: `// Disjoint Set Union (DSU / Union-Find) in Java
// Optimized with Path Compression and Union by Rank: O(alpha(N)) per operation
public class DSU {
    private int[] parent;
    private int[] rank;
    private int components;

    public DSU(int n) {
        this.parent = new int[n];
        this.rank = new int[n];
        this.components = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i; // Each node starts as its own representative root
            rank[i] = 0;
        }
    }

    // Find Root with Path Compression: O(alpha(N))
    public int find(int i) {
        if (parent[i] != i) {
            // Path Compression: point directly to root
            parent[i] = find(parent[i]);
        }
        return parent[i];
    }

    // Union by Rank: O(alpha(N))
    public boolean union(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);

        if (rootU == rootV) return false; // Already in same set (cycle detected)

        // Attach smaller rank tree under larger rank tree
        if (rank[rootU] < rank[rootV]) {
            parent[rootU] = rootV;
        } else if (rank[rootU] > rank[rootV]) {
            parent[rootV] = rootU;
        } else {
            parent[rootV] = rootU;
            rank[rootU]++;
        }
        components--;
        return true;
    }

    // Check if two elements belong to the same component
    public boolean isConnected(int u, int v) {
        return find(u) == find(v);
    }

    public int getComponentCount() { return components; }
}`,
    python: `# Disjoint Set Union (DSU / Union-Find) in Python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    # Find root with Path Compression
    def find(self, i):
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    # Union by Rank
    def union(self, u, v):
        root_u, root_v = self.find(u), self.find(v)
        if root_u == root_v: return False # Cycle
        
        if self.rank[root_u] < self.rank[root_v]:
            self.parent[root_u] = root_v
        elif self.rank[root_u] > self.rank[root_v]:
            self.parent[root_v] = root_u
        else:
            self.parent[root_v] = root_u
            self.rank[root_u] += 1
        self.components -= 1
        return True

    def is_connected(self, u, v):
        return self.find(u) == self.find(v)`,
    cpp: `// Disjoint Set Union (DSU / Union-Find) in C++
#include <vector>
#include <numeric>
using namespace std;

class DSU {
private:
    vector<int> parent;
    vector<int> rank;
    int components;

public:
    DSU(int n) : parent(n), rank(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }

    // Find with Path Compression: O(alpha(N))
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    // Union by Rank: O(alpha(N))
    bool unionSets(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU == rootV) return false;

        if (rank[rootU] < rank[rootV]) {
            parent[rootU] = rootV;
        } else if (rank[rootU] > rank[rootV]) {
            parent[rootV] = rootU;
        } else {
            parent[rootV] = rootU;
            rank[rootU]++;
        }
        components--;
        return true;
    }

    bool isConnected(int u, int v) {
        return find(u) == find(v);
    }

    int count() const { return components; }
};`
  },

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
    cpp: `// Binary Lifting in C++
const int LOGN = 20;
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
    python: `# Sparse Table in Python
import math

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
    cpp: `// Sparse Table in C++
struct SparseTable {
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
    java: `// Heavy-Light Decomposition (HLD) in Java
import java.util.*;

class HeavyLightDecomposition {
    int[] parent, depth, heavy, head, pos;
    int curPos = 0;

    public void init(int n) {
        parent = new int[n];
        depth = new int[n];
        heavy = new int[n];
        head = new int[n];
        pos = new int[n];
        Arrays.fill(heavy, -1);
    }

    // DFS 1: Computes subtree sizes, depths, and identifies heavy edges
    public int dfs(int v, int p, int d, List<List<Integer>> adj) {
        int size = 1, maxCSize = 0;
        depth[v] = d; parent[v] = p;
        for (int c : adj.get(v)) {
            if (c != p) {
                int cSize = dfs(c, v, d + 1, adj);
                size += cSize;
                if (cSize > maxCSize) {
                    maxCSize = cSize;
                    heavy[v] = c; // Heavy child with largest subtree
                }
            }
        }
        return size;
    }

    // DFS 2: Decomposes tree into contiguous segments for segment tree queries
    public void decompose(int v, int h, List<List<Integer>> adj) {
        head[v] = h;
        pos[v] = ++curPos;
        if (heavy[v] != -1) decompose(heavy[v], h, adj); // Continue heavy chain
        for (int c : adj.get(v)) {
            if (c != parent[v] && c != heavy[v]) {
                decompose(c, c, adj); // Start new light chain
            }
        }
    }
}`,
    python: `# Heavy-Light Decomposition in Python
def dfs_size(u, p, d, parent, depth, heavy, adj):
    size = 1; max_c_size = 0
    parent[u] = p; depth[u] = d; heavy[u] = -1
    for v in adj[u]:
        if v != p:
            c_size = dfs_size(v, u, d + 1, parent, depth, heavy, adj)
            size += c_size
            if c_size > max_c_size:
                max_c_size = c_size; heavy[u] = v
    return size

def decompose(u, h, parent, heavy, head, pos, adj, cur_pos):
    head[u] = h; pos[u] = cur_pos[0]; cur_pos[0] += 1
    if heavy[u] != -1:
        decompose(heavy[u], h, parent, heavy, head, pos, adj, cur_pos)
    for v in adj[u]:
        if v != parent[u] and v != heavy[u]:
            decompose(v, v, parent, heavy, head, pos, adj, cur_pos)`,
    cpp: `// Heavy-Light Decomposition in C++
int parent_node[N], depth[N], heavy[N], head[N], pos[N], cur_pos;

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
}`
  },

  'linear-basis': {
    java: `// Linear Basis over GF(2) (XOR Basis) in Java
class LinearBasis {
    private static final int BITS = 32;
    private int[] basis = new int[BITS]; // basis[i] has highest bit at index i

    // Inserts a number into the basis; returns true if linearly independent
    public boolean insert(int mask) {
        for (int i = BITS - 1; i >= 0; i--) {
            if ((mask & (1 << i)) == 0) continue;
            if (basis[i] == 0) {
                basis[i] = mask; // Found new basis vector
                return true;
            }
            mask ^= basis[i]; // Reduce using existing basis vector
        }
        return false; // Vector was linearly dependent (reducible to 0)
    }

    // Returns the maximum XOR sum achievable by any subset of elements
    public int getMaxXor() {
        int maxXor = 0;
        for (int i = BITS - 1; i >= 0; i--) {
            if ((maxXor ^ basis[i]) > maxXor) {
                maxXor ^= basis[i];
            }
        }
        return maxXor;
    }
}`,
    python: `# Linear Basis in Python
class LinearBasis:
    def __init__(self, bits=32):
        self.bits = bits
        self.basis = [0] * bits

    def insert(self, mask):
        for i in range(self.bits - 1, -1, -1):
            if not (mask & (1 << i)): continue
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
    cpp: `// Linear Basis in C++
struct LinearBasis {
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
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // Terminate early if no swaps occurred
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
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i; // Assume first unsorted element is minimum
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j; // Found new minimum index
                }
            }
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
        for (int i = 1; i < n; i++) {
            int key = arr[i]; // Value to place into sorted left subarray
            int j = i - 1;

            // Shift elements greater than key to one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
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
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    // Lomuto Partitioning Scheme
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Rightmost element as pivot
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
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
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
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
        // 1. Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);

        // 2. Extract elements one by one from heap root
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

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
        int max = getMax(arr);

        // Do counting sort for every digit place: 1s (exp=1), 10s (exp=10), etc.
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countSortByDigit(arr, exp);
        }
    }

    private static void countSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10]; // Buckets 0-9

        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
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

  'counting-sort': {
    java: `// Counting Sort in Java: Linear time O(N + K) for bounded integers
public class CountingSort {
    public static void countingSort(int[] arr) {
        int n = arr.length;
        int max = arr[0], min = arr[0];
        for (int x : arr) {
            if (x > max) max = x;
            if (x < min) min = x;
        }

        int range = max - min + 1;
        int[] count = new int[range];
        int[] output = new int[n];

        // 1. Store count of each number
        for (int i = 0; i < n; i++) count[arr[i] - min]++;

        // 2. Cumulative count for stable indices
        for (int i = 1; i < range; i++) count[i] += count[i - 1];

        // 3. Build output array
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        // 4. Copy back
        for (int i = 0; i < n; i++) arr[i] = output[i];
    }
}`,
    python: `# Counting Sort in Python
def counting_sort(arr):
    if not arr: return arr
    min_val, max_val = min(arr), max(arr)
    count = [0] * (max_val - min_val + 1)
    for x in arr: count[x - min_val] += 1
    idx = 0
    for i, c in enumerate(count):
        for _ in range(c):
            arr[idx] = i + min_val
            idx += 1
    return arr`,
    cpp: `// Counting Sort in C++
void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal - minVal + 1, 0);
    for (int x : arr) count[x - minVal]++;
    int idx = 0;
    for (int i = 0; i < count.size(); i++) {
        while (count[i]-- > 0) arr[idx++] = i + minVal;
    }
}`
  },

  // =========================================================================
  // 3. PATHFINDING ALGORITHMS
  // =========================================================================
  'astar': {
    java: `// A* Search Algorithm in Java: Pathfinding with Manhattan Heuristic
import java.util.*;

public class AStarSearch {
    static class Node implements Comparable<Node> {
        int r, c, g, f;
        Node(int r, int c, int g, int h) {
            this.r = r; this.c = c; this.g = g; this.f = g + h;
        }
        public int compareTo(Node o) { return Integer.compare(this.f, o.f); }
    }

    public static int heuristic(int r1, int c1, int r2, int c2) {
        return Math.abs(r1 - r2) + Math.abs(c1 - c2); // Manhattan distance
    }

    public static List<int[]> findPath(int[][] grid, int[] start, int[] target) {
        int rows = grid.length, cols = grid[0].length;
        PriorityQueue<Node> pq = new PriorityQueue<>();
        int[][] gScore = new int[rows][cols];
        for (int[] row : gScore) Arrays.fill(row, Integer.MAX_VALUE);

        gScore[start[0]][start[1]] = 0;
        pq.add(new Node(start[0], start[1], 0, heuristic(start[0], start[1], target[0], target[1])));

        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            if (curr.r == target[0] && curr.c == target[1]) return new ArrayList<>(); // Reconstruct path

            for (int[] d : dirs) {
                int nr = curr.r + d[0], nc = curr.c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0) {
                    int tentativeG = curr.g + 1;
                    if (tentativeG < gScore[nr][nc]) {
                        gScore[nr][nc] = tentativeG;
                        pq.add(new Node(nr, nc, tentativeG, heuristic(nr, nc, target[0], target[1])));
                    }
                }
            }
        }
        return Collections.emptyList();
    }
}`,
    python: `# A* Search in Python
import heapq

def astar(grid, start, target):
    def h(pos): return abs(pos[0] - target[0]) + abs(pos[1] - target[1])
    pq = [(h(start), 0, start, [start])]
    visited = set()
    while pq:
        f, g, curr, path = heapq.heappop(pq)
        if curr == target: return path
        if curr in visited: continue
        visited.add(curr)
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = curr[0] + dr, curr[1] + dc
            if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 0:
                if (nr, nc) not in visited:
                    heapq.heappush(pq, (g + 1 + h((nr, nc)), g + 1, (nr, nc), path + [(nr, nc)]))
    return None`,
    cpp: `// A* Search in C++
struct Cell {
    int r, c, g, f;
    bool operator>(const Cell& o) const { return f > o.f; }
};`
  },

  'dijkstra': {
    java: `// Dijkstra's Shortest Path in Java: Guaranteed shortest path for non-negative weights
import java.util.*;

public class Dijkstra {
    static class Node implements Comparable<Node> {
        int id, dist;
        Node(int id, int dist) { this.id = id; this.dist = dist; }
        public int compareTo(Node o) { return Integer.compare(this.dist, o.dist); }
    }

    public static int[] dijkstra(int start, List<List<Node>> adj, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        PriorityQueue<Node> pq = new PriorityQueue<>();

        dist[start] = 0;
        pq.add(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            int u = curr.id, d = curr.dist;
            if (d > dist[u]) continue;

            for (Node edge : adj.get(u)) {
                if (dist[u] + edge.dist < dist[edge.id]) {
                    dist[edge.id] = dist[u] + edge.dist;
                    pq.add(new Node(edge.id, dist[edge.id]));
                }
            }
        }
        return dist;
    }
}`,
    python: `# Dijkstra's Algorithm in Python
import heapq

def dijkstra(start, adj, n):
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    cpp: `// Dijkstra's Algorithm in C++
vector<int> dijkstra(int start, const vector<vector<pair<int, int>>>& adj, int n) {
    vector<int> dist(n, 1e9);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`
  },

  'bfs': {
    java: `// Breadth-First Search (BFS) in Java: Unweighted Shortest Path using Queue
import java.util.*;

public class BFS {
    public static void bfs(int start, List<List<Integer>> adj, int n) {
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.add(start);

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            // Process current node
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }
}`,
    python: `# BFS in Python
from collections import deque

def bfs(start, adj):
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)`,
    cpp: `// BFS in C++
void bfs(int start, const vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`
  },

  'dfs': {
    java: `// Depth-First Search (DFS) in Java: Recursive traversal
import java.util.*;

public class DFS {
    public static void dfs(int u, boolean[] visited, List<List<Integer>> adj) {
        visited[u] = true;
        // Process node u
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfs(v, visited, adj);
            }
        }
    }
}`,
    python: `# DFS in Python
def dfs(u, visited, adj):
    visited.add(u)
    for v in adj[u]:
        if v not in visited:
            dfs(v, visited, adj)`,
    cpp: `// DFS in C++
void dfs(int u, vector<bool>& visited, const vector<vector<int>>& adj) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, visited, adj);
    }
}`
  },

  'greedy-bfs': {
    java: `// Greedy Best-First Search in Java: Expands nodes closest to target according to heuristic
import java.util.*;

public class GreedyBFS {
    static class Node implements Comparable<Node> {
        int r, c, h;
        Node(int r, int c, int h) { this.r = r; this.c = c; this.h = h; }
        public int compareTo(Node o) { return Integer.compare(this.h, o.h); }
    }
}`,
    python: `# Greedy Best-First Search in Python
import heapq

def greedy_bfs(grid, start, target):
    def h(p): return abs(p[0] - target[0]) + abs(p[1] - target[1])
    pq = [(h(start), start)]
    visited = {start}
    while pq:
        _, curr = heapq.heappop(pq)
        if curr == target: return True
        # expand neighbors
    return False`,
    cpp: `// Greedy BFS in C++
struct Node {
    int r, c, h;
    bool operator>(const Node& o) const { return h > o.h; }
};`
  },

  // =========================================================================
  // 4. TREES & BALANCED BST
  // =========================================================================
  'avl': {
    java: `// AVL Tree with Self-Balancing Rotations in Java
class AVLTree {
    static class Node {
        int key, height;
        Node left, right;
        Node(int key) { this.key = key; this.height = 1; }
    }

    int height(Node N) { return N == null ? 0 : N.height; }
    int getBalance(Node N) { return N == null ? 0 : height(N.left) - height(N.right); }

    // Right Rotation (LL Case)
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    // Left Rotation (RR Case)
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    // Self-balancing AVL insert in O(log N)
    Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);

        // LL, RR, LR, RL Rotations
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
}`,
    python: `# AVL Tree in Python
class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1`,
    cpp: `// AVL Tree in C++
struct AVLNode {
    int val, height;
    AVLNode *left, *right;
    AVLNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};`
  },

  'bst': {
    java: `// Binary Search Tree (BST) in Java
class BST {
    static class Node {
        int key;
        Node left, right;
        Node(int item) { key = item; }
    }

    Node root;

    public void insert(int key) { root = insertRec(root, key); }
    private Node insertRec(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) root.left = insertRec(root.left, key);
        else if (key > root.key) root.right = insertRec(root.right, key);
        return root;
    }

    public boolean search(Node root, int key) {
        if (root == null) return false;
        if (root.key == key) return true;
        return key < root.key ? search(root.left, key) : search(root.right, key);
    }
}`,
    python: `# BST in Python
class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None`,
    cpp: `// BST in C++
struct BSTNode {
    int key;
    BSTNode *left, *right;
    BSTNode(int k) : key(k), left(nullptr), right(nullptr) {}
};`
  },

  'tree-traversal': {
    java: `// Binary Tree Traversals in Java (Inorder, Preorder, Postorder)
class TreeTraversals {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    // Inorder: Left -> Root -> Right (Sorted order in BST)
    public static void inOrder(Node node) {
        if (node == null) return;
        inOrder(node.left);
        System.out.print(node.val + " ");
        inOrder(node.right);
    }

    // Preorder: Root -> Left -> Right
    public static void preOrder(Node node) {
        if (node == null) return;
        System.out.print(node.val + " ");
        preOrder(node.left);
        preOrder(node.right);
    }

    // Postorder: Left -> Right -> Root
    public static void postOrder(Node node) {
        if (node == null) return;
        postOrder(node.left);
        postOrder(node.right);
        System.out.print(node.val + " ");
    }
}`,
    python: `# Tree Traversals in Python
def inorder(node):
    if not node: return
    inorder(node.left)
    print(node.val, end=" ")
    inorder(node.right)`,
    cpp: `// Tree Traversals in C++
void inOrder(Node* node) {
    if (!node) return;
    inOrder(node->left);
    cout << node->val << " ";
    inOrder(node->right);
}`
  },

  // =========================================================================
  // 5. DYNAMIC PROGRAMMING
  // =========================================================================
  'n-queens': {
    java: `// N-Queens Backtracking in Java
import java.util.*;

public class NQueens {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        int[] queens = new int[n]; // queens[r] = column index of queen in row r
        solve(0, queens, n, result);
        return result;
    }

    private static void solve(int row, int[] queens, int n, List<List<String>> res) {
        if (row == n) {
            // All queens placed safely
            return;
        }
        for (int col = 0; col < n; col++) {
            if (isValid(row, col, queens)) {
                queens[row] = col;
                solve(row + 1, queens, n, res);
            }
        }
    }

    private static boolean isValid(int row, int col, int[] queens) {
        for (int r = 0; r < row; r++) {
            int c = queens[r];
            // Check same column or diagonal conflicts
            if (c == col || Math.abs(c - col) == Math.abs(r - row)) return false;
        }
        return true;
    }
}`,
    python: `# N-Queens Backtracking in Python
def solve_n_queens(n):
    res = []
    def backtrack(r, cols, diag1, diag2, board):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            board[r][c] = "Q"
            backtrack(r + 1, cols, diag1, diag2, board)
            board[r][c] = "."
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    board = [["."] * n for _ in range(n)]
    backtrack(0, set(), set(), set(), board)
    return res`,
    cpp: `// N-Queens in C++
vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> solutions;
    vector<string> board(n, string(n, '.'));
    // backtracking solver
    return solutions;
}`
  },

  'knapsack': {
    java: `// 0/1 Knapsack Problem in Java using Dynamic Programming
public class Knapsack {
    public static int knapSack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];

        // Build table dp[][] in bottom-up manner
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0) {
                    dp[i][w] = 0;
                } else if (wt[i - 1] <= w) {
                    // Maximum of including item (i - 1) or excluding it
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,
    python: `# 0/1 Knapsack in Python
def knapsack(W, wt, val, n):
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`,
    cpp: `// 0/1 Knapsack in C++
int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`
  },

  'lcs': {
    java: `// Longest Common Subsequence (LCS) in Java
public class LCS {
    public static int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        // Compute LCS table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
    python: `# LCS in Python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
    cpp: `// LCS in C++
int lcs(const string& s1, const string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`
  },

  // =========================================================================
  // 6. SEARCHING ALGORITHMS
  // =========================================================================
  'binary-search': {
    java: `// Binary Search in Java: O(log N) lookup in sorted arrays
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2; // Avoid integer overflow

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
  },

  'linear-search': {
    java: `// Linear Search in Java: Sequential scanning in O(N) time
public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Element found at index i
            }
        }
        return -1; // Element not found
    }
}`,
    python: `# Linear Search in Python
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
    cpp: `// Linear Search in C++
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
  }
};
