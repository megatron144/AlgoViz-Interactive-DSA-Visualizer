// Dynamic Programming and Backtracking Step Generators

// 1. N-Queens Backtracking Generator
export function generateNQueensSteps(n = 6) {
  const steps = [];
  const board = Array.from({ length: n }, () => new Array(n).fill(0));
  const queens = []; // array of column indices for each row
  let solutionsCount = 0;

  function isSafe(row, col) {
    for (let r = 0; r < row; r++) {
      const c = queens[r];
      if (c === col || Math.abs(c - col) === Math.abs(r - row)) {
        return false;
      }
    }
    return true;
  }

  function solve(row) {
    if (row === n) {
      solutionsCount++;
      steps.push({
        type: 'SOLUTION_FOUND',
        board: board.map(r => [...r]),
        queens: [...queens],
        row,
        solutionsCount,
        description: `Found valid configuration #${solutionsCount} placing all ${n} queens safely!`
      });
      return;
    }

    for (let col = 0; col < n; col++) {
      steps.push({
        type: 'TRY_POSITION',
        board: board.map(r => [...r]),
        queens: [...queens],
        row,
        col,
        solutionsCount,
        description: `Checking position Row ${row}, Col ${col} for safety.`
      });

      if (isSafe(row, col)) {
        board[row][col] = 1;
        queens.push(col);

        steps.push({
          type: 'PLACE_QUEEN',
          board: board.map(r => [...r]),
          queens: [...queens],
          row,
          col,
          solutionsCount,
          description: `Placed Queen at (${row}, ${col}). Advancing to Row ${row + 1}.`
        });

        solve(row + 1);

        // Backtrack
        board[row][col] = 0;
        queens.pop();

        steps.push({
          type: 'BACKTRACK',
          board: board.map(r => [...r]),
          queens: [...queens],
          row,
          col,
          solutionsCount,
          description: `Backtracked: Removed Queen from (${row}, ${col}).`
        });
      } else {
        steps.push({
          type: 'CONFLICT',
          board: board.map(r => [...r]),
          queens: [...queens],
          row,
          col,
          solutionsCount,
          description: `Conflict detected at (${row}, ${col})! Under attack by existing queen.`
        });
      }
    }
  }

  steps.push({
    type: 'START',
    board: board.map(r => [...r]),
    queens: [],
    solutionsCount: 0,
    description: `Solving ${n}-Queens Backtracking puzzle on ${n}×${n} chessboard.`
  });

  solve(0);

  steps.push({
    type: 'COMPLETE',
    board: board.map(r => [...r]),
    queens: [],
    solutionsCount,
    description: `Search complete! Found a total of ${solutionsCount} solutions.`
  });

  return steps;
}

// 2. 0/1 Knapsack DP Generator
export function generateKnapsackSteps(items = [
  { name: 'Item 1', weight: 2, value: 3 },
  { name: 'Item 2', weight: 3, value: 4 },
  { name: 'Item 3', weight: 4, value: 5 },
  { name: 'Item 4', weight: 5, value: 8 }
], capacity = 7) {
  const steps = [];
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  steps.push({
    type: 'KNAPSACK_START',
    dpTable: dp.map(r => [...r]),
    items,
    capacity,
    description: `Initializing ${n + 1}×${capacity + 1} DP table for Knapsack (Capacity = ${capacity}).`
  });

  for (let i = 1; i <= n; i++) {
    const { name, weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      let excludeVal = dp[i - 1][w];
      let includeVal = 0;

      if (weight <= w) {
        includeVal = value + dp[i - 1][w - weight];
        dp[i][w] = Math.max(excludeVal, includeVal);

        steps.push({
          type: 'CELL_EVAL',
          dpTable: dp.map(r => [...r]),
          i,
          w,
          item: items[i - 1],
          excludeVal,
          includeVal,
          chosenVal: dp[i][w],
          description: `DP[${i}][${w}] (${name}, wt=${weight}, val=${value}): max(exclude=${excludeVal}, include=${value}+DP[${i - 1}][${w - weight}] (${includeVal})) = ${dp[i][w]}.`
        });
      } else {
        dp[i][w] = excludeVal;
        steps.push({
          type: 'CELL_EVAL',
          dpTable: dp.map(r => [...r]),
          i,
          w,
          item: items[i - 1],
          excludeVal,
          includeVal: null,
          chosenVal: dp[i][w],
          description: `DP[${i}][${w}]: Item weight ${weight} exceeds capacity ${w}. Inherits DP[${i - 1}][${w}] = ${excludeVal}.`
        });
      }
    }
  }

  // Backtrack to find chosen items
  const chosenItems = [];
  let curW = capacity;
  for (let i = n; i > 0 && curW > 0; i--) {
    if (dp[i][curW] !== dp[i - 1][curW]) {
      chosenItems.push(items[i - 1]);
      curW -= items[i - 1].weight;
    }
  }

  steps.push({
    type: 'KNAPSACK_COMPLETE',
    dpTable: dp.map(r => [...r]),
    maxValue: dp[n][capacity],
    chosenItems,
    description: `Optimal total value: ${dp[n][capacity]} with items: ${chosenItems.map(it => it.name).join(', ')}.`
  });

  return steps;
}

// 3. Longest Common Subsequence (LCS) Generator
export function generateLCSSteps(s1 = 'STONE', s2 = 'LONGEST') {
  const steps = [];
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  steps.push({
    type: 'LCS_START',
    dpTable: dp.map(r => [...r]),
    s1,
    s2,
    description: `Comparing string 1: "${s1}" and string 2: "${s2}". Initializing (${m + 1}×${n + 1}) matrix.`
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match = s1[i - 1] === s2[j - 1];
      if (match) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      steps.push({
        type: 'LCS_EVAL',
        dpTable: dp.map(r => [...r]),
        i,
        j,
        char1: s1[i - 1],
        char2: s2[j - 1],
        match,
        val: dp[i][j],
        description: match
          ? `Match found '${s1[i - 1]}' == '${s2[j - 1]}'! DP[${i}][${j}] = 1 + DP[${i - 1}][${j - 1}] = ${dp[i][j]}.`
          : `Mismatch '${s1[i - 1]}' != '${s2[j - 1]}'. DP[${i}][${j}] = max(top=${dp[i - 1][j]}, left=${dp[i][j - 1]}) = ${dp[i][j]}.`
      });
    }
  }

  // Reconstruct LCS string
  let lcsStr = '';
  let i = m, j = n;
  const path = [];
  while (i > 0 && j > 0) {
    path.push({ i, j });
    if (s1[i - 1] === s2[j - 1]) {
      lcsStr = s1[i - 1] + lcsStr;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  steps.push({
    type: 'LCS_COMPLETE',
    dpTable: dp.map(r => [...r]),
    lcsLength: dp[m][n],
    lcsStr,
    path,
    description: `Longest Common Subsequence length: ${dp[m][n]} ➔ "${lcsStr}".`
  });

  return steps;
}
