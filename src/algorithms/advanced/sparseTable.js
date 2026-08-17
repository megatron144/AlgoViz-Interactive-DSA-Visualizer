// Sparse Table Algorithm (RMQ) Step Generator

export class SparseTableModel {
  constructor(array = [4, 2, 7, 1, 9, 3, 6, 8, 5]) {
    this.array = [...array];
    this.n = this.array.length;
    this.K = Math.floor(Math.log2(this.n)) + 1;
    this.st = Array.from({ length: this.n }, () => new Array(this.K).fill(null));
    this.precompute();
  }

  precompute() {
    for (let i = 0; i < this.n; i++) {
      this.st[i][0] = this.array[i];
    }
    for (let j = 1; j < this.K; j++) {
      for (let i = 0; i + (1 << j) <= this.n; i++) {
        const left = this.st[i][j - 1];
        const right = this.st[i + (1 << (j - 1))][j - 1];
        this.st[i][j] = Math.min(left, right);
      }
    }
  }

  generateBuildSteps() {
    const steps = [];
    const tableState = Array.from({ length: this.n }, () => new Array(this.K).fill(null));

    steps.push({
      type: 'BUILD_START',
      tableState: JSON.parse(JSON.stringify(tableState)),
      description: `Initializing Sparse Table for array of size ${this.n}. Max power K = ${this.K - 1} (lengths up to 2^${this.K - 1}).`,
      line: 9
    });

    // Base level j = 0
    for (let i = 0; i < this.n; i++) {
      tableState[i][0] = this.array[i];
      steps.push({
        type: 'BUILD_BASE',
        i,
        j: 0,
        val: this.array[i],
        tableState: JSON.parse(JSON.stringify(tableState)),
        highlightCell: { i, j: 0 },
        description: `Base case: ST[${i}][0] covers interval [${i}, ${i}] (length 2^0 = 1). Value = ${this.array[i]}.`,
        line: 10
      });
    }

    // Dynamic programming transitions
    for (let j = 1; j < this.K; j++) {
      const len = 1 << j;
      const halfLen = 1 << (j - 1);
      for (let i = 0; i + len <= this.n; i++) {
        const leftVal = tableState[i][j - 1];
        const rightVal = tableState[i + halfLen][j - 1];
        const minVal = Math.min(leftVal, rightVal);
        tableState[i][j] = minVal;

        steps.push({
          type: 'BUILD_CELL',
          i,
          j,
          val: minVal,
          leftInterval: [i, i + halfLen - 1],
          rightInterval: [i + halfLen, i + len - 1],
          tableState: JSON.parse(JSON.stringify(tableState)),
          highlightCell: { i, j },
          comparingCells: [{ i, j: j - 1 }, { i: i + halfLen, j: j - 1 }],
          description: `ST[${i}][${j}] (interval [${i}, ${i + len - 1}], len 2^${j}=${len}) = min(ST[${i}][${j - 1}] (${leftVal}), ST[${i + halfLen}][${j - 1}] (${rightVal})) = ${minVal}.`,
          line: 13
        });
      }
    }

    steps.push({
      type: 'BUILD_COMPLETE',
      tableState: JSON.parse(JSON.stringify(tableState)),
      description: `Sparse Table precomputation complete in O(N log N) time! Ready for O(1) RMQ queries.`,
      line: 17
    });

    return steps;
  }

  generateQuerySteps(L, R) {
    const steps = [];
    const len = R - L + 1;
    const k = Math.floor(Math.log2(len));
    const block1_L = L;
    const block1_R = L + (1 << k) - 1;
    const block2_L = R - (1 << k) + 1;
    const block2_R = R;

    const val1 = this.st[block1_L][k];
    const val2 = this.st[block2_L][k];
    const finalAns = Math.min(val1, val2);

    steps.push({
      type: 'QUERY_INIT',
      L,
      R,
      len,
      k,
      description: `Query Range Minimum on [${L}, ${R}] (Length = ${len}). Calculating k = floor(log₂(${len})) = ${k} (Block length 2^${k} = ${1 << k}).`,
      line: 20
    });

    steps.push({
      type: 'FIRST_BLOCK',
      L,
      R,
      k,
      block1: { L: block1_L, R: block1_R, cell: { i: block1_L, j: k }, val: val1 },
      description: `Block 1: Covers [${block1_L}, ${block1_R}] ➔ ST[${block1_L}][${k}] = ${val1}.`,
      line: 22
    });

    steps.push({
      type: 'SECOND_BLOCK',
      L,
      R,
      k,
      block1: { L: block1_L, R: block1_R, cell: { i: block1_L, j: k }, val: val1 },
      block2: { L: block2_L, R: block2_R, cell: { i: block2_L, j: k }, val: val2 },
      description: `Block 2: Covers [${block2_L}, ${block2_R}] ➔ ST[${block2_L}][${k}] = ${val2}. Notice the overlap handles idempotency!`,
      line: 22
    });

    steps.push({
      type: 'QUERY_RESULT',
      L,
      R,
      k,
      block1: { L: block1_L, R: block1_R, cell: { i: block1_L, j: k }, val: val1 },
      block2: { L: block2_L, R: block2_R, cell: { i: block2_L, j: k }, val: val2 },
      result: finalAns,
      description: `Final RMQ on [${L}, ${R}] = min(${val1}, ${val2}) = ${finalAns} in O(1) time!`,
      line: 23
    });

    return steps;
  }
}
