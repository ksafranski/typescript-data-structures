/**
 * Define the BST node
 * Here we need to define a value and a left (less) and
 * a right (greater) prop for the nodes
 */
class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

/**
 * A binary search tree (BST) is a binary tree where each node
 * has a value, a left prop (less than) and a right prop
 * (greater than).
 * The left and right props are also BSTs so the tree is recursive
 * and can be traversed.
 */
class BST {
  root: BSTNode | null = null;

  insert(node: BSTNode): BSTNode | null {
    // Starting out with no nodes, make root
    if (!this.root) this.root = node;
    // Iterate to insert
    let currentNode = this.root;
    while (true) {
      if (node.value === currentNode.value) return null;
      // If less than, go left
      if (node.value < currentNode.value) {
        // No left node on current, make this the left node
        if (!currentNode.left) {
          currentNode.left = node;
          return node;
        }
        // Continue to traverse
        currentNode = currentNode.left;
      }

      // If greater than, go right
      if (node.value > currentNode.value) {
        // No right node on current, make this the right node
        if (!currentNode.right) {
          currentNode.right = node;
          return node;
        }
        // Continue to traverse
        currentNode = currentNode.right;
      }
    }
  }

  contains(value: number): boolean {
    return Boolean(this.find(value));
  }

  find(value: number): BSTNode | false {
    if (this.root === null) return false;
    let currentNode: BSTNode | null = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return false;
  }
}

//
//
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXAMPLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//
//

const BSTExample = new BST();

// Construct BST with numbers 1-20
const nodes: BSTNode[] = [];
for (let i = 1; i <= 20; i++) {
  let newNode = new BSTNode(Math.floor(Math.random() * (50 - 1 + 1) + 1));
  (() => BSTExample.insert(newNode))();
  // for debug
  nodes.push(newNode);
}

console.log(nodes.map(n => n.value).join(', '));

// Find
const findNode = BSTExample.find(nodes[3].value);
// @ts-expect-error
console.log('Find value:', nodes[3].value, '| Result', findNode.value);

// Contains
const containsTrue = BSTExample.contains(nodes[5].value); // Pull from a node
const containsFalse = BSTExample.contains(30000); // Number out of range
console.log('Contains (True)', containsTrue);
console.log('Contains (False)', containsFalse);
