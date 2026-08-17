// Segment Tree Step Generator and Layout Builder

export class SegmentTreeModel {
  constructor(array = [3, 1, 5, 7, 2, 4, 8, 6]) {
    this.array = [...array];
    this.n = this.array.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.nodes = []; // Detailed node objects with interval [start, end]
    this.build(1, 0, this.n - 1);
  }

  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.array[start];
      this.nodes[node] = {
        id: node,
        start,
        end,
        value: this.array[start],
        left: null,
        right: null,
        isLeaf: true
      };
      return;
    }
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node;
    const rightChild = 2 * node + 1;

    this.build(leftChild, start, mid);
    this.build(rightChild, mid + 1, end);

    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    this.nodes[node] = {
      id: node,
      start,
      end,
      value: this.tree[node],
      left: leftChild,
      right: rightChild,
      isLeaf: false
    };
  }

  // Returns array of animation steps for range sum query
  generateQuerySteps(qL, qR) {
    const steps = [];
    const activeNodes = new Set();
    const resultNodes = [];

    steps.push({
      type: 'START_QUERY',
      qL,
      qR,
      activeNode: 1,
      visitedNodes: Array.from(activeNodes),
      resultNodes: [...resultNodes],
      currentSum: 0,
      description: `Initiating Range Sum Query on interval [${qL}, ${qR}]. Starting at root [0, ${this.n - 1}].`,
      line: 23
    });

    let totalSum = 0;

    const traverse = (node, start, end) => {
      activeNodes.add(node);

      // Case 1: Completely disjoint
      if (qR < start || end < qL) {
        steps.push({
          type: 'DISJOINT',
          node,
          start,
          end,
          qL,
          qR,
          activeNode: node,
          visitedNodes: Array.from(activeNodes),
          resultNodes: [...resultNodes],
          currentSum: totalSum,
          description: `Node ${node} [${start}, ${end}] is completely outside query range [${qL}, ${qR}]. Pruning branch, returns 0.`,
          line: 24
        });
        return 0;
      }

      // Case 2: Completely contained
      if (qL <= start && end <= qR) {
        const val = this.tree[node];
        totalSum += val;
        resultNodes.push(node);
        steps.push({
          type: 'CONTAINED',
          node,
          start,
          end,
          qL,
          qR,
          activeNode: node,
          visitedNodes: Array.from(activeNodes),
          resultNodes: [...resultNodes],
          currentSum: totalSum,
          description: `Node ${node} [${start}, ${end}] is completely contained inside [${qL}, ${qR}]. Adding node sum ${val} (Total sum: ${totalSum}).`,
          line: 25
        });
        return val;
      }

      // Case 3: Partial overlap
      const mid = Math.floor((start + end) / 2);
      steps.push({
        type: 'PARTIAL',
        node,
        start,
        end,
        qL,
        qR,
        activeNode: node,
        visitedNodes: Array.from(activeNodes),
        resultNodes: [...resultNodes],
        currentSum: totalSum,
        description: `Node ${node} [${start}, ${end}] partially overlaps [${qL}, ${qR}]. Splitting into left [${start}, ${mid}] and right [${mid + 1}, ${end}].`,
        line: 26
      });

      const leftSum = traverse(2 * node, start, mid);
      const rightSum = traverse(2 * node + 1, mid + 1, end);
      return leftSum + rightSum;
    };

    const finalSum = traverse(1, 0, this.n - 1);

    steps.push({
      type: 'QUERY_COMPLETE',
      qL,
      qR,
      activeNode: null,
      visitedNodes: Array.from(activeNodes),
      resultNodes: [...resultNodes],
      currentSum: finalSum,
      description: `Query complete! Range Sum for [${qL}, ${qR}] = ${finalSum}.`,
      line: 28
    });

    return steps;
  }

  // Returns array of animation steps for point update
  generateUpdateSteps(idx, newVal) {
    const steps = [];
    const updatedArray = [...this.array];
    const oldVal = updatedArray[idx];
    updatedArray[idx] = newVal;
    const tempTree = [...this.tree];

    steps.push({
      type: 'START_UPDATE',
      idx,
      oldVal,
      newVal,
      activeNode: 1,
      arrayState: [...this.array],
      treeState: [...tempTree],
      description: `Updating array[${idx}] from ${oldVal} to ${newVal}. Traversing from root.`,
      line: 14
    });

    const updateRec = (node, start, end) => {
      steps.push({
        type: 'VISIT_UPDATE',
        node,
        start,
        end,
        idx,
        activeNode: node,
        arrayState: [...this.array],
        treeState: [...tempTree],
        description: `Inspecting Node ${node} [${start}, ${end}]. Target index ${idx} lies here.`,
        line: 19
      });

      if (start === end) {
        tempTree[node] = newVal;
        steps.push({
          type: 'LEAF_UPDATED',
          node,
          start,
          end,
          idx,
          activeNode: node,
          arrayState: [...updatedArray],
          treeState: [...tempTree],
          description: `Reached leaf Node ${node} [${start}, ${end}]. Updated value from ${oldVal} to ${newVal}.`,
          line: 16
        });
        return;
      }

      const mid = Math.floor((start + end) / 2);
      if (idx <= mid) {
        updateRec(2 * node, start, mid);
      } else {
        updateRec(2 * node + 1, mid + 1, end);
      }

      tempTree[node] = tempTree[2 * node] + tempTree[2 * node + 1];
      steps.push({
        type: 'INTERNAL_UPDATED',
        node,
        start,
        end,
        activeNode: node,
        arrayState: [...updatedArray],
        treeState: [...tempTree],
        description: `Recalculated Node ${node} [${start}, ${end}] sum = ${tempTree[2 * node]} + ${tempTree[2 * node + 1]} = ${tempTree[node]}.`,
        line: 21
      });
    };

    updateRec(1, 0, this.n - 1);
    this.array = updatedArray;
    this.tree = tempTree;

    steps.push({
      type: 'UPDATE_COMPLETE',
      idx,
      newVal,
      activeNode: null,
      arrayState: [...this.array],
      treeState: [...this.tree],
      description: `Point update complete! Array and all parent segment tree nodes updated in O(log N).`,
      line: 22
    });

    return steps;
  }
}
