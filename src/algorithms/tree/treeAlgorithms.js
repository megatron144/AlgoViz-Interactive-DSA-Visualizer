// Binary Search Tree (BST) and AVL Self-Balancing Tree Algorithms

export class AVLNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class TreeModel {
  constructor(isAVL = false) {
    this.root = null;
    this.isAVL = isAVL;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(val) {
    const steps = [];

    const insertNode = (node, v) => {
      if (!node) {
        steps.push({
          type: 'INSERT_LEAF',
          val: v,
          description: `Created new node with value ${v}.`
        });
        return new AVLNode(v);
      }

      steps.push({
        type: 'COMPARE',
        current: node.val,
        val: v,
        description: `Comparing insert value ${v} with current node ${node.val}.`
      });

      if (v < node.val) {
        node.left = insertNode(node.left, v);
      } else if (v > node.val) {
        node.right = insertNode(node.right, v);
      } else {
        steps.push({
          type: 'DUPLICATE',
          val: v,
          description: `Value ${v} already exists in tree.`
        });
        return node;
      }

      this.updateHeight(node);

      if (this.isAVL) {
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && v < node.left.val) {
          steps.push({
            type: 'ROTATE',
            rotation: 'Right Rotation (LL)',
            node: node.val,
            description: `AVL Balance factor = ${balance} > 1. Performing Right Rotation on node ${node.val}.`
          });
          return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && v > node.right.val) {
          steps.push({
            type: 'ROTATE',
            rotation: 'Left Rotation (RR)',
            node: node.val,
            description: `AVL Balance factor = ${balance} < -1. Performing Left Rotation on node ${node.val}.`
          });
          return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && v > node.left.val) {
          steps.push({
            type: 'ROTATE',
            rotation: 'Left-Right Rotation (LR)',
            node: node.val,
            description: `AVL Balance factor = ${balance}. Left Rotate child ${node.left.val}, then Right Rotate ${node.val}.`
          });
          node.left = this.leftRotate(node.left);
          return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && v < node.right.val) {
          steps.push({
            type: 'ROTATE',
            rotation: 'Right-Left Rotation (RL)',
            node: node.val,
            description: `AVL Balance factor = ${balance}. Right Rotate child ${node.right.val}, then Left Rotate ${node.val}.`
          });
          node.right = this.rightRotate(node.right);
          return this.leftRotate(node);
        }
      }

      return node;
    };

    this.root = insertNode(this.root, val);
    return steps;
  }

  generateSearchSteps(val) {
    const steps = [];
    let cur = this.root;

    steps.push({
      type: 'SEARCH_START',
      val,
      description: `Searching for value ${val} starting from root.`
    });

    while (cur) {
      steps.push({
        type: 'SEARCH_VISIT',
        node: cur.val,
        val,
        description: `Inspecting node ${cur.val}.`
      });

      if (cur.val === val) {
        steps.push({
          type: 'SEARCH_FOUND',
          node: cur.val,
          val,
          description: `Found target value ${val}!`
        });
        return steps;
      } else if (val < cur.val) {
        steps.push({
          type: 'SEARCH_LEFT',
          node: cur.val,
          val,
          description: `${val} < ${cur.val} ➔ moving to left child.`
        });
        cur = cur.left;
      } else {
        steps.push({
          type: 'SEARCH_RIGHT',
          node: cur.val,
          val,
          description: `${val} > ${cur.val} ➔ moving to right child.`
        });
        cur = cur.right;
      }
    }

    steps.push({
      type: 'SEARCH_NOT_FOUND',
      val,
      description: `Target value ${val} does not exist in the tree.`
    });

    return steps;
  }

  generateTraversalSteps(type) {
    const steps = [];
    const sequence = [];

    if (type === 'inorder') {
      const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        sequence.push(node.val);
        steps.push({
          type: 'TRAVERSAL_VISIT',
          node: node.val,
          sequence: [...sequence],
          description: `Inorder visit: ${node.val} (Left ➔ Root ➔ Right)`
        });
        inorder(node.right);
      };
      inorder(this.root);
    } else if (type === 'preorder') {
      const preorder = (node) => {
        if (!node) return;
        sequence.push(node.val);
        steps.push({
          type: 'TRAVERSAL_VISIT',
          node: node.val,
          sequence: [...sequence],
          description: `Preorder visit: ${node.val} (Root ➔ Left ➔ Right)`
        });
        preorder(node.left);
        preorder(node.right);
      };
      preorder(this.root);
    } else if (type === 'postorder') {
      const postorder = (node) => {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        sequence.push(node.val);
        steps.push({
          type: 'TRAVERSAL_VISIT',
          node: node.val,
          sequence: [...sequence],
          description: `Postorder visit: ${node.val} (Left ➔ Right ➔ Root)`
        });
      };
      postorder(this.root);
    } else if (type === 'bfs') {
      if (this.root) {
        const queue = [this.root];
        while (queue.length > 0) {
          const cur = queue.shift();
          sequence.push(cur.val);
          steps.push({
            type: 'TRAVERSAL_VISIT',
            node: cur.val,
            sequence: [...sequence],
            description: `Level-order visit: ${cur.val}`
          });
          if (cur.left) queue.push(cur.left);
          if (cur.right) queue.push(cur.right);
        }
      }
    }

    return steps;
  }
}
