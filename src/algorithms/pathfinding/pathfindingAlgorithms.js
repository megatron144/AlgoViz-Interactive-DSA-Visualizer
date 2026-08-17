// Pathfinding Algorithms and Maze Generators

export const GRID_ROWS = 21;
export const GRID_COLS = 45;

export function getInitialGrid(startNode = { row: 10, col: 8 }, targetNode = { row: 10, col: 36 }) {
  const grid = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = [];
    for (let c = 0; c < GRID_COLS; c++) {
      row.push({
        row: r,
        col: c,
        isStart: r === startNode.row && c === startNode.col,
        isTarget: r === targetNode.row && c === targetNode.col,
        isWall: false,
        weight: 1, // 1 for normal, 5 for swamp/weight
        distance: Infinity,
        fScore: Infinity,
        gScore: Infinity,
        hScore: Infinity,
        isVisited: false,
        previousNode: null,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function generatePathfindingSteps(algoKey, grid, startNode, targetNode, heuristicType = 'manhattan') {
  const steps = [];
  const visitedOrder = [];
  const start = grid[startNode.row][startNode.col];
  const target = grid[targetNode.row][targetNode.col];

  function getNeighbors(node, currentGrid) {
    const neighbors = [];
    const { row, col } = node;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
        if (!currentGrid[nr][nc].isWall) {
          neighbors.push(currentGrid[nr][nc]);
        }
      }
    }
    return neighbors;
  }

  function getHeuristic(nodeA, nodeB) {
    if (heuristicType === 'euclidean') {
      return Math.hypot(nodeA.row - nodeB.row, nodeA.col - nodeB.col);
    }
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  }

  function reconstructPath(endNode) {
    const path = [];
    let cur = endNode;
    while (cur !== null) {
      path.unshift({ row: cur.row, col: cur.col });
      cur = cur.previousNode;
    }
    return path;
  }

  // Clone grid for simulation
  const g = grid.map(row => row.map(cell => ({ ...cell })));
  const simStart = g[startNode.row][startNode.col];
  const simTarget = g[targetNode.row][targetNode.col];

  switch (algoKey) {
    case 'dijkstra': {
      simStart.distance = 0;
      const unvisited = [];
      for (const row of g) {
        for (const cell of row) {
          unvisited.push(cell);
        }
      }

      let found = false;
      while (unvisited.length > 0) {
        unvisited.sort((a, b) => a.distance - b.distance);
        const closestNode = unvisited.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) break;

        closestNode.isVisited = true;
        visitedOrder.push({ row: closestNode.row, col: closestNode.col, distance: closestNode.distance });

        steps.push({
          type: 'VISIT',
          node: { row: closestNode.row, col: closestNode.col },
          visitedCount: visitedOrder.length,
          distance: closestNode.distance,
          description: `Relaxing node (${closestNode.row}, ${closestNode.col}) with distance ${closestNode.distance}.`
        });

        if (closestNode.row === simTarget.row && closestNode.col === simTarget.col) {
          found = true;
          break;
        }

        const neighbors = getNeighbors(closestNode, g);
        for (const neighbor of neighbors) {
          if (!neighbor.isVisited) {
            const tentativeDistance = closestNode.distance + neighbor.weight;
            if (tentativeDistance < neighbor.distance) {
              neighbor.distance = tentativeDistance;
              neighbor.previousNode = closestNode;
            }
          }
        }
      }

      const path = found ? reconstructPath(simTarget) : [];
      steps.push({
        type: 'FINISHED',
        found,
        path,
        visitedCount: visitedOrder.length,
        pathLength: path.length,
        cost: found ? simTarget.distance : 0,
        description: found ? `Shortest path found! Total weight cost: ${simTarget.distance}.` : 'No path possible to target!'
      });
      break;
    }

    case 'astar': {
      simStart.gScore = 0;
      simStart.hScore = getHeuristic(simStart, simTarget);
      simStart.fScore = simStart.hScore;

      const openSet = [simStart];
      const openSetLookup = new Set([`${simStart.row},${simStart.col}`]);
      let found = false;

      while (openSet.length > 0) {
        openSet.sort((a, b) => a.fScore - b.fScore);
        const current = openSet.shift();
        openSetLookup.delete(`${current.row},${current.col}`);

        current.isVisited = true;
        visitedOrder.push({ row: current.row, col: current.col, fScore: current.fScore });

        steps.push({
          type: 'VISIT',
          node: { row: current.row, col: current.col },
          visitedCount: visitedOrder.length,
          fScore: Math.round(current.fScore * 10) / 10,
          description: `Exploring node (${current.row}, ${current.col}): g=${current.gScore}, h=${Math.round(current.hScore * 10) / 10}, f=${Math.round(current.fScore * 10) / 10}.`
        });

        if (current.row === simTarget.row && current.col === simTarget.col) {
          found = true;
          break;
        }

        const neighbors = getNeighbors(current, g);
        for (const neighbor of neighbors) {
          if (neighbor.isVisited) continue;
          const tentativeGScore = current.gScore + neighbor.weight;
          if (tentativeGScore < neighbor.gScore) {
            neighbor.previousNode = current;
            neighbor.gScore = tentativeGScore;
            neighbor.hScore = getHeuristic(neighbor, simTarget);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;

            const key = `${neighbor.row},${neighbor.col}`;
            if (!openSetLookup.has(key)) {
              openSet.push(neighbor);
              openSetLookup.add(key);
            }
          }
        }
      }

      const path = found ? reconstructPath(simTarget) : [];
      steps.push({
        type: 'FINISHED',
        found,
        path,
        visitedCount: visitedOrder.length,
        pathLength: path.length,
        cost: found ? simTarget.gScore : 0,
        description: found ? `A* reached goal! Path cost: ${simTarget.gScore} across ${path.length} steps.` : 'No reachable path!'
      });
      break;
    }

    case 'bfs': {
      const queue = [simStart];
      simStart.isVisited = true;
      let found = false;

      while (queue.length > 0) {
        const current = queue.shift();
        visitedOrder.push({ row: current.row, col: current.col });

        steps.push({
          type: 'VISIT',
          node: { row: current.row, col: current.col },
          visitedCount: visitedOrder.length,
          description: `BFS Queue pop: visiting (${current.row}, ${current.col}).`
        });

        if (current.row === simTarget.row && current.col === simTarget.col) {
          found = true;
          break;
        }

        const neighbors = getNeighbors(current, g);
        for (const neighbor of neighbors) {
          if (!neighbor.isVisited) {
            neighbor.isVisited = true;
            neighbor.previousNode = current;
            queue.push(neighbor);
          }
        }
      }

      const path = found ? reconstructPath(simTarget) : [];
      steps.push({
        type: 'FINISHED',
        found,
        path,
        visitedCount: visitedOrder.length,
        pathLength: path.length,
        cost: path.length,
        description: found ? `BFS guaranteed shortest unweighted path found (${path.length} nodes).` : 'No path exists!'
      });
      break;
    }

    case 'dfs': {
      const stack = [simStart];
      simStart.isVisited = true;
      let found = false;

      while (stack.length > 0) {
        const current = stack.pop();
        visitedOrder.push({ row: current.row, col: current.col });

        steps.push({
          type: 'VISIT',
          node: { row: current.row, col: current.col },
          visitedCount: visitedOrder.length,
          description: `DFS Stack pop: diving deep into (${current.row}, ${current.col}).`
        });

        if (current.row === simTarget.row && current.col === simTarget.col) {
          found = true;
          break;
        }

        const neighbors = getNeighbors(current, g);
        for (const neighbor of neighbors) {
          if (!neighbor.isVisited) {
            neighbor.isVisited = true;
            neighbor.previousNode = current;
            stack.push(neighbor);
          }
        }
      }

      const path = found ? reconstructPath(simTarget) : [];
      steps.push({
        type: 'FINISHED',
        found,
        path,
        visitedCount: visitedOrder.length,
        pathLength: path.length,
        cost: path.length,
        description: found ? `DFS found a path (${path.length} nodes).` : 'Target unreachable!'
      });
      break;
    }

    case 'greedy-bfs': {
      simStart.hScore = getHeuristic(simStart, simTarget);
      const openSet = [simStart];
      let found = false;

      while (openSet.length > 0) {
        openSet.sort((a, b) => a.hScore - b.hScore);
        const current = openSet.shift();
        current.isVisited = true;
        visitedOrder.push({ row: current.row, col: current.col });

        steps.push({
          type: 'VISIT',
          node: { row: current.row, col: current.col },
          visitedCount: visitedOrder.length,
          description: `Greedy heuristic h=${Math.round(current.hScore * 10) / 10} at (${current.row}, ${current.col}).`
        });

        if (current.row === simTarget.row && current.col === simTarget.col) {
          found = true;
          break;
        }

        const neighbors = getNeighbors(current, g);
        for (const neighbor of neighbors) {
          if (!neighbor.isVisited) {
            neighbor.isVisited = true;
            neighbor.previousNode = current;
            neighbor.hScore = getHeuristic(neighbor, simTarget);
            openSet.push(neighbor);
          }
        }
      }

      const path = found ? reconstructPath(simTarget) : [];
      steps.push({
        type: 'FINISHED',
        found,
        path,
        visitedCount: visitedOrder.length,
        pathLength: path.length,
        cost: path.length,
        description: found ? `Greedy BFS reached target rapidly!` : 'Unreachable!'
      });
      break;
    }

    default:
      break;
  }

  return steps;
}

// Maze Generation Algorithms
export function generateMaze(type, startNode, targetNode) {
  const walls = [];

  if (type === 'random') {
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if ((r === startNode.row && c === startNode.col) || (r === targetNode.row && c === targetNode.col)) continue;
        if (Math.random() < 0.28) {
          walls.push({ row: r, col: c });
        }
      }
    }
    return walls;
  }

  if (type === 'recursive-division') {
    // Add border walls first
    for (let r = 0; r < GRID_ROWS; r++) {
      walls.push({ row: r, col: 0 });
      walls.push({ row: r, col: GRID_COLS - 1 });
    }
    for (let c = 0; c < GRID_COLS; c++) {
      walls.push({ row: 0, col: c });
      walls.push({ row: GRID_ROWS - 1, col: c });
    }

    function divide(r1, r2, c1, c2) {
      if (r2 - r1 < 2 || c2 - c1 < 2) return;
      const isHorizontal = (r2 - r1) > (c2 - c1);

      if (isHorizontal) {
        const wallRow = Math.floor((r1 + r2) / 2);
        const passageCol = Math.floor(Math.random() * (c2 - c1 + 1)) + c1;

        for (let c = c1; c <= c2; c++) {
          if (c !== passageCol) {
            walls.push({ row: wallRow, col: c });
          }
        }
        divide(r1, wallRow - 1, c1, c2);
        divide(wallRow + 1, r2, c1, c2);
      } else {
        const wallCol = Math.floor((c1 + c2) / 2);
        const passageRow = Math.floor(Math.random() * (r2 - r1 + 1)) + r1;

        for (let r = r1; r <= r2; r++) {
          if (r !== passageRow) {
            walls.push({ row: r, col: wallCol });
          }
        }
        divide(r1, r2, c1, wallCol - 1);
        divide(r1, r2, wallCol + 1, c2);
      }
    }

    divide(1, GRID_ROWS - 2, 1, GRID_COLS - 2);

    return walls.filter(w => !(w.row === startNode.row && w.col === startNode.col) && !(w.row === targetNode.row && w.col === targetNode.col));
  }

  if (type === 'stair') {
    let r = GRID_ROWS - 1;
    let c = 0;
    while (r > 0 && c < GRID_COLS) {
      if (!(r === startNode.row && c === startNode.col) && !(r === targetNode.row && c === targetNode.col)) {
        walls.push({ row: r, col: c });
      }
      r--;
      c++;
    }
    while (r < GRID_ROWS - 1 && c < GRID_COLS) {
      if (!(r === startNode.row && c === startNode.col) && !(r === targetNode.row && c === targetNode.col)) {
        walls.push({ row: r, col: c });
      }
      r++;
      c++;
    }
    return walls;
  }

  return walls;
}
