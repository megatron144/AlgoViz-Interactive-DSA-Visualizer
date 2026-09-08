// Mo's Algorithm (Square Root Decomposition for Offline Range Queries)
// Canonical problem: Range Distinct Elements (D-Query)

export class MosAlgorithmModel {
  constructor(array = [1, 2, 1, 3, 2, 1, 4, 3, 2], queries = [[1, 4], [0, 6], [2, 7], [3, 5], [0, 2]]) {
    this.array = [...array];
    this.queries = queries.map((q, idx) => ({
      id: idx,
      l: Math.max(0, Math.min(q[0], q[1], this.array.length - 1)),
      r: Math.min(this.array.length - 1, Math.max(q[0], q[1])),
      ans: null
    }));
    this.blockSize = Math.max(1, Math.floor(Math.sqrt(this.array.length)));
  }

  setArrayAndQueries(newArray, newQueries) {
    this.array = [...newArray];
    this.blockSize = Math.max(1, Math.floor(Math.sqrt(this.array.length)));
    this.queries = newQueries.map((q, idx) => ({
      id: idx,
      l: Math.max(0, Math.min(q[0], q[1], this.array.length - 1)),
      r: Math.min(this.array.length - 1, Math.max(q[0], q[1])),
      ans: null
    }));
  }

  generateSteps() {
    const steps = [];
    const n = this.array.length;
    const b = this.blockSize;

    // Step 0: Initial state
    const originalQueries = this.queries.map(q => ({
      ...q,
      block: Math.floor(q.l / b)
    }));

    steps.push({
      type: 'INIT',
      array: [...this.array],
      blockSize: b,
      numBlocks: Math.ceil(n / b),
      queries: originalQueries.map(q => ({ ...q })),
      sortedQueries: [],
      currentQuery: null,
      currL: 0,
      currR: -1,
      freq: {},
      distinctCount: 0,
      activeAction: null,
      elementIndex: null,
      elementValue: null,
      description: `Loaded array of size N=${n}. Square root block size B = ⌊√${n}⌋ = ${b}. There are ${originalQueries.length} offline queries.`,
      line: 4
    });

    // Step 1: Sort queries using Mo's comparator with odd-even block optimization
    const sortedQueries = [...originalQueries].sort((a, bQuery) => {
      if (a.block !== bQuery.block) {
        return a.block - bQuery.block;
      }
      // Odd-even block sorting to minimize right pointer zig-zag moves
      return a.block % 2 === 1 ? bQuery.r - a.r : a.r - bQuery.r;
    });

    steps.push({
      type: 'SORT_QUERIES',
      array: [...this.array],
      blockSize: b,
      numBlocks: Math.ceil(n / b),
      queries: originalQueries.map(q => ({ ...q })),
      sortedQueries: sortedQueries.map(q => ({ ...q })),
      currentQuery: null,
      currL: 0,
      currR: -1,
      freq: {},
      distinctCount: 0,
      activeAction: null,
      elementIndex: null,
      elementValue: null,
      description: `Sorted queries by Block ID (⌊L/${b}⌋) and R (with odd-even zigzag). This guarantees total pointer shifts are bounded by O((N + Q)√N).`,
      line: 7
    });

    // Two pointer simulation
    let currL = 0;
    let currR = -1;
    let distinctCount = 0;
    const freq = {};
    const recordedAnswers = {};

    const addElement = (idx) => {
      const val = this.array[idx];
      freq[val] = (freq[val] || 0) + 1;
      let countChanged = false;
      if (freq[val] === 1) {
        distinctCount++;
        countChanged = true;
      }
      return { val, countChanged };
    };

    const removeElement = (idx) => {
      const val = this.array[idx];
      freq[val] = (freq[val] || 0) - 1;
      let countChanged = false;
      if (freq[val] === 0) {
        distinctCount--;
        countChanged = true;
        delete freq[val];
      }
      return { val, countChanged };
    };

    // Helper to push step snapshot
    const pushStep = (type, qObj, activeAction, elementIndex, elementValue, description, line) => {
      steps.push({
        type,
        array: [...this.array],
        blockSize: b,
        numBlocks: Math.ceil(n / b),
        queries: originalQueries.map(q => ({
          ...q,
          ans: recordedAnswers[q.id] !== undefined ? recordedAnswers[q.id] : null
        })),
        sortedQueries: sortedQueries.map(q => ({
          ...q,
          ans: recordedAnswers[q.id] !== undefined ? recordedAnswers[q.id] : null,
          isActive: q.id === qObj.id,
          isDone: recordedAnswers[q.id] !== undefined
        })),
        currentQuery: { ...qObj },
        currL,
        currR,
        freq: { ...freq },
        distinctCount,
        activeAction,
        elementIndex,
        elementValue,
        description,
        line
      });
    };

    for (let qIdx = 0; qIdx < sortedQueries.length; qIdx++) {
      const q = sortedQueries[qIdx];

      pushStep(
        'START_QUERY',
        q,
        'TARGET',
        null,
        null,
        `Processing Query #${q.id}: Range [${q.l}, ${q.r}] (Block ${q.block}). Current window is [${currL}, ${currR}]. Adjusting two pointers.`,
        10
      );

      // Adjust currR to the right (expand)
      while (currR < q.r) {
        currR++;
        const { val, countChanged } = addElement(currR, 'right');
        pushStep(
          'ADD_RIGHT',
          q,
          'EXPAND_RIGHT',
          currR,
          val,
          `Shift currR right to index ${currR}: Added element ${val}. count[${val}] = ${freq[val] || 0}.${countChanged ? ' (New distinct element! Distinct count +1)' : ''}`,
          14
        );
      }

      // Adjust currL to the left (expand)
      while (currL > q.l) {
        currL--;
        const { val, countChanged } = addElement(currL, 'left');
        pushStep(
          'ADD_LEFT',
          q,
          'EXPAND_LEFT',
          currL,
          val,
          `Shift currL left to index ${currL}: Added element ${val}. count[${val}] = ${freq[val] || 0}.${countChanged ? ' (New distinct element! Distinct count +1)' : ''}`,
          17
        );
      }

      // Adjust currR to the left (contract)
      while (currR > q.r) {
        const { val, countChanged } = removeElement(currR, 'right');
        currR--;
        pushStep(
          'REMOVE_RIGHT',
          q,
          'CONTRACT_RIGHT',
          currR + 1,
          val,
          `Shift currR left: Removed element ${val} at index ${currR + 1}. count[${val}] = ${freq[val] || 0}.${countChanged ? ' (Value no longer in window! Distinct count -1)' : ''}`,
          20
        );
      }

      // Adjust currL to the right (contract)
      while (currL < q.l) {
        const { val, countChanged } = removeElement(currL, 'left');
        currL++;
        pushStep(
          'REMOVE_LEFT',
          q,
          'CONTRACT_LEFT',
          currL - 1,
          val,
          `Shift currL right: Removed element ${val} at index ${currL - 1}. count[${val}] = ${freq[val] || 0}.${countChanged ? ' (Value no longer in window! Distinct count -1)' : ''}`,
          23
        );
      }

      // Record answer for current query
      recordedAnswers[q.id] = distinctCount;
      pushStep(
        'RECORD_ANSWER',
        q,
        'SOLVED',
        null,
        null,
        `Window now exactly matches Query #${q.id} range [${q.l}, ${q.r}]. Recorded Answer = ${distinctCount} distinct elements!`,
        26
      );
    }

    // Completion step
    steps.push({
      type: 'COMPLETE',
      array: [...this.array],
      blockSize: b,
      numBlocks: Math.ceil(n / b),
      queries: originalQueries.map(q => ({
        ...q,
        ans: recordedAnswers[q.id]
      })),
      sortedQueries: sortedQueries.map(q => ({
        ...q,
        ans: recordedAnswers[q.id],
        isActive: false,
        isDone: true
      })),
      currentQuery: null,
      currL,
      currR,
      freq: { ...freq },
      distinctCount,
      activeAction: 'ALL_DONE',
      elementIndex: null,
      elementValue: null,
      description: `All ${sortedQueries.length} offline queries evaluated successfully using Mo's Algorithm! Total time complexity: O((N + Q)√N).`,
      line: 30
    });

    return steps;
  }
}
