// Heavy-Light Decomposition (HLD) Step Generator

export class HLDModel {
  constructor() {
    this.n = 11;
    this.root = 1;
    this.adj = {
      1: [2, 3],
      2: [4, 5],
      3: [6, 7],
      4: [8, 9],
      5: [],
      6: [10, 11],
      7: [],
      8: [],
      9: [],
      10: [],
      11: []
    };

    // Node coordinates for SVG visualization
    this.nodePositions = {
      1: { x: 400, y: 40 },
      2: { x: 220, y: 120 },
      3: { x: 580, y: 120 },
      4: { x: 140, y: 200 },
      5: { x: 300, y: 200 },
      6: { x: 500, y: 200 },
      7: { x: 660, y: 200 },
      8: { x: 80, y: 290 },
      9: { x: 190, y: 290 },
      10: { x: 440, y: 290 },
      11: { x: 550, y: 290 }
    };

    this.parent = {};
    this.depth = {};
    this.heavy = {};
    this.head = {};
    this.pos = {};
    this.subSize = {};
    this.chainColor = {};
    this.curPos = 0;

    this.initHLD();
  }

  initHLD() {
    const dfsSize = (v, p, d) => {
      let size = 1;
      let maxCSize = 0;
      this.parent[v] = p;
      this.depth[v] = d;
      this.heavy[v] = null;

      for (const c of this.adj[v] || []) {
        if (c !== p) {
          const cSize = dfsSize(c, v, d + 1);
          size += cSize;
          if (cSize > maxCSize) {
            maxCSize = cSize;
            this.heavy[v] = c;
          }
        }
      }
      this.subSize[v] = size;
      return size;
    };

    dfsSize(this.root, null, 0);

    const colors = ['#ffffff', '#a1a1aa', '#71717a', '#d4d4d8', '#e4e4e7'];
    let colorIdx = 0;

    const decompose = (v, h) => {
      this.head[v] = h;
      this.pos[v] = ++this.curPos;
      this.chainColor[v] = colors[colorIdx % colors.length];

      if (this.heavy[v] !== null) {
        decompose(this.heavy[v], h);
      }

      for (const c of this.adj[v] || []) {
        if (c !== this.parent[v] && c !== this.heavy[v]) {
          colorIdx++;
          decompose(c, c);
        }
      }
    };

    decompose(this.root, this.root);
  }

  generatePathQuerySteps(uStart, vStart) {
    const steps = [];
    let u = uStart;
    let v = vStart;
    const coveredChains = [];
    const activeNodes = [];

    steps.push({
      type: 'INIT_PATH',
      u,
      v,
      headU: this.head[u],
      headV: this.head[v],
      coveredChains: [...coveredChains],
      activeNodes: [u, v],
      description: `Starting HLD Path Query from Node ${u} to Node ${v}. Chain Head(u)=${this.head[u]}, Chain Head(v)=${this.head[v]}.`,
      line: 25
    });

    while (this.head[u] !== this.head[v]) {
      if (this.depth[this.head[u]] > this.depth[this.head[v]]) {
        [u, v] = [v, u];
      }

      const chainHead = this.head[v];
      coveredChains.push({ from: chainHead, to: v, type: 'HEAVY_CHAIN' });
      activeNodes.push(chainHead, v);

      steps.push({
        type: 'JUMP_CHAIN',
        u,
        v,
        headU: this.head[u],
        headV: this.head[v],
        jumpedFrom: v,
        jumpedTo: this.parent[chainHead],
        chainHead,
        coveredChains: [...coveredChains],
        activeNodes: [u, v, chainHead],
        description: `Node ${v}'s chain head ${chainHead} is deeper than ${u}'s head ${this.head[u]}. Query segment [pos(${chainHead})=${this.pos[chainHead]}, pos(${v})=${this.pos[v]}], then jump light edge to parent ${this.parent[chainHead]}.`,
        line: 28
      });

      v = this.parent[chainHead];
    }

    if (this.depth[u] > this.depth[v]) {
      [u, v] = [v, u];
    }

    coveredChains.push({ from: u, to: v, type: 'FINAL_CHAIN' });
    activeNodes.push(u, v);

    steps.push({
      type: 'FINAL_INTERVAL',
      u,
      v,
      lca: u,
      coveredChains: [...coveredChains],
      activeNodes: [u, v],
      description: `Both nodes now on the same heavy chain! Query contiguous interval [pos(${u})=${this.pos[u]}, pos(${v})=${this.pos[v]}]. LCA is Node ${u}.`,
      line: 32
    });

    steps.push({
      type: 'PATH_COMPLETE',
      u,
      v,
      coveredChains: [...coveredChains],
      activeNodes: [u, v],
      description: `HLD path query decomposed into at most O(log N) contiguous linear segments in O(log² N) total time!`,
      line: 34
    });

    return steps;
  }
}
