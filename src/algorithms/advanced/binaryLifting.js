// Binary Lifting and LCA Algorithm Step Generator

export class BinaryLiftingModel {
  constructor() {
    // Standard CP tree with 12 nodes for crystal clear visualization
    this.n = 12;
    this.root = 1;
    this.adj = {
      1: [2, 3, 4],
      2: [5, 6],
      3: [7],
      4: [8, 9],
      5: [10, 11],
      6: [12],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: []
    };

    // Node coordinates (x, y) on a viewBox of 800x400
    this.nodePositions = {
      1: { x: 400, y: 40 },
      2: { x: 200, y: 120 },
      3: { x: 400, y: 120 },
      4: { x: 620, y: 120 },
      5: { x: 120, y: 200 },
      6: { x: 280, y: 200 },
      7: { x: 400, y: 200 },
      8: { x: 550, y: 200 },
      9: { x: 690, y: 200 },
      10: { x: 70, y: 290 },
      11: { x: 170, y: 290 },
      12: { x: 280, y: 290 }
    };

    this.LOGN = 4; // 2^0 to 2^3 covers depths up to 8
    this.up = Array.from({ length: this.n + 1 }, () => new Array(this.LOGN).fill(null));
    this.depth = new Array(this.n + 1).fill(0);
    this.preprocess();
  }

  preprocess() {
    const dfs = (u, p, d) => {
      this.depth[u] = d;
      this.up[u][0] = p;
      for (let i = 1; i < this.LOGN; i++) {
        const prev = this.up[u][i - 1];
        this.up[u][i] = prev !== null ? this.up[prev][i - 1] : null;
      }
      for (const v of this.adj[u] || []) {
        if (v !== p) dfs(v, u, d + 1);
      }
    };
    dfs(this.root, null, 0);
  }

  generateKthAncestorSteps(node, k) {
    const steps = [];
    let cur = node;
    let remainingK = k;

    steps.push({
      type: 'START_KTH',
      node,
      k,
      curNode: cur,
      activeJump: null,
      tableHighlight: null,
      highlightedNodes: [node],
      description: `Searching for the ${k}-th ancestor of Node ${node}. Binary representation of ${k} = ${(k).toString(2)}₂.`,
      line: 16
    });

    for (let i = 0; i < this.LOGN; i++) {
      const bitSet = (k & (1 << i)) !== 0;
      steps.push({
        type: 'CHECK_BIT',
        node,
        k,
        curNode: cur,
        power: i,
        jumpSize: 1 << i,
        bitSet,
        tableHighlight: { node: cur, power: i },
        highlightedNodes: [cur],
        description: `Inspecting bit ${i} (value 2^${i} = ${1 << i}). Bit is ${bitSet ? 'ACTIVE (1)' : 'INACTIVE (0)'}.`,
        line: 17
      });

      if (bitSet) {
        const nextNode = this.up[cur][i];
        if (nextNode === null) {
          steps.push({
            type: 'OUT_OF_BOUNDS',
            node,
            k,
            curNode: cur,
            description: `Jump 2^${i} exceeds root. No ancestor exists.`,
            line: 19
          });
          return steps;
        }

        const prevCur = cur;
        cur = nextNode;
        remainingK -= (1 << i);

        steps.push({
          type: 'MAKE_JUMP',
          from: prevCur,
          to: cur,
          curNode: cur,
          power: i,
          jumpSize: 1 << i,
          tableHighlight: { node: prevCur, power: i },
          highlightedNodes: [cur],
          description: `Jumping 2^${i} = ${1 << i} steps: Node ${prevCur} ➔ Node ${cur}. Remaining jumps = ${remainingK}.`,
          line: 18
        });
      }
    }

    steps.push({
      type: 'KTH_FOUND',
      node,
      k,
      curNode: cur,
      highlightedNodes: [cur],
      description: `Found! The ${k}-th ancestor of Node ${node} is Node ${cur}.`,
      line: 22
    });

    return steps;
  }

  generateLCASteps(uStart, vStart) {
    const steps = [];
    let u = uStart;
    let v = vStart;

    steps.push({
      type: 'START_LCA',
      u,
      v,
      depthU: this.depth[u],
      depthV: this.depth[v],
      highlightedNodes: [u, v],
      description: `Finding Lowest Common Ancestor (LCA) for Node ${u} (depth ${this.depth[u]}) and Node ${v} (depth ${this.depth[v]}).`,
      line: 25
    });

    // Step 1: Align depths
    if (this.depth[u] < this.depth[v]) {
      [u, v] = [v, u];
      steps.push({
        type: 'SWAP_NODES',
        u,
        v,
        description: `Swapped so Node ${u} is deeper than Node ${v}.`,
        line: 26
      });
    }

    const diff = this.depth[u] - this.depth[v];
    if (diff > 0) {
      steps.push({
        type: 'LEVELING_DEPTHS',
        u,
        v,
        diff,
        description: `Leveling depths: Node ${u} needs to jump ${diff} levels up to match Node ${v}'s depth (${this.depth[v]}).`,
        line: 28
      });

      for (let i = this.LOGN - 1; i >= 0; i--) {
        if ((this.depth[u] - (1 << i)) >= this.depth[v]) {
          const prev = u;
          u = this.up[u][i];
          steps.push({
            type: 'LEVEL_JUMP',
            u,
            v,
            power: i,
            jumpSize: 1 << i,
            tableHighlight: { node: prev, power: i },
            highlightedNodes: [u, v],
            description: `Jumped Node ${prev} by 2^${i} = ${1 << i} levels ➔ now at Node ${u} (depth ${this.depth[u]}).`,
            line: 30
          });
        }
      }
    }

    if (u === v) {
      steps.push({
        type: 'LCA_FOUND',
        lca: u,
        u,
        v,
        highlightedNodes: [u],
        description: `Nodes reached the same position. LCA is Node ${u}!`,
        line: 33
      });
      return steps;
    }

    // Step 2: Jump together
    steps.push({
      type: 'SIMULTANEOUS_JUMP_START',
      u,
      v,
      description: `Both nodes at depth ${this.depth[u]}. Jumping upwards simultaneously with largest non-colliding powers of 2.`,
      line: 35
    });

    for (let i = this.LOGN - 1; i >= 0; i--) {
      if (this.up[u][i] !== this.up[v][i]) {
        const prevU = u;
        const prevV = v;
        u = this.up[u][i];
        v = this.up[v][i];

        steps.push({
          type: 'SIMULTANEOUS_JUMP',
          u,
          v,
          fromU: prevU,
          fromV: prevV,
          power: i,
          jumpSize: 1 << i,
          tableHighlight: { node: prevU, power: i },
          highlightedNodes: [u, v],
          description: `up[${prevU}][${i}] (${u}) != up[${prevV}][${i}] (${v}). Both jumped 2^${i} = ${1 << i} steps up.`,
          line: 38
        });
      } else if (this.up[u][i] !== null) {
        steps.push({
          type: 'JUMP_SKIPPED',
          u,
          v,
          power: i,
          commonAncestor: this.up[u][i],
          description: `up[${u}][${i}] == up[${v}][${i}] == Node ${this.up[u][i]}. Overshoots below the LCA, skipping jump size 2^${i}.`,
          line: 36
        });
      }
    }

    const lca = this.up[u][0];
    steps.push({
      type: 'LCA_FOUND',
      lca,
      u,
      v,
      highlightedNodes: [lca],
      description: `Target reached! The immediate parent up[${u}][0] is the LCA: Node ${lca}.`,
      line: 41
    });

    return steps;
  }
}
