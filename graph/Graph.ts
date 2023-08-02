class Queue {
  items: any[] = [];

  get size() {
    return this.items.length;
  }

  push(item: GraphNode) {
    this.items.push(item);
    return this;
  }

  next(): GraphNode | undefined {
    return this.items.shift();
  }
}

type NodeValue = string;

/**
 * Define the node (vertex) of the graph
 */
class GraphNode {
  value: NodeValue;
  adjacents: GraphNode[] = [];

  constructor(value: NodeValue) {
    this.value = value;
  }

  // Determine if another node is adjacent
  isAdjacent(node: GraphNode): boolean {
    return this.adjacents.indexOf(node) > -1;
  }

  // Just pushes an adjacent onto the array
  addAdjacent(node: GraphNode): GraphNode {
    this.adjacents.push(node);
    return node;
  }

  // Removes an adjacent node by reference
  removeAdjacent(node: GraphNode): void {
    this.adjacents.filter((n: GraphNode) => n !== node);
  }
}

/**
 * Graphs are data structures with nodes (vertexes) and edges. This
 * forms a structure that allows traversal by referencing node edges
 * which connect a node to other nodes in the graph
 */
class Graph {
  nodes: Map<string, GraphNode> = new Map();

  // Defines if edges move in one direction or any
  directed: boolean = false;

  constructor(directed: boolean = false) {
    this.directed = directed;
  }

  // Just check the map for the node and return
  nodeExists(value: NodeValue): GraphNode | undefined {
    return (this.nodes.has(value) && this.nodes.get(value)) || undefined;
  }

  // Creates a new node and adds it to the graph
  addNode(value: NodeValue): GraphNode | undefined {
    const existing = this.nodeExists(value);
    if (!existing) {
      const newNode = new GraphNode(value);
      this.nodes.set(value, newNode);
      return newNode;
    }
    if (existing) return existing;
  }

  // Adds an edge by connecting the adjacents between a source node an a destination
  addEdge(
    source: NodeValue,
    destination: NodeValue
  ): (GraphNode | undefined)[] {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);
    if (sourceNode && destinationNode) {
      sourceNode.addAdjacent(destinationNode);
      if (!this.directed) {
        destinationNode.addAdjacent(sourceNode);
      }
    }
    return [sourceNode, destinationNode];
  }

  removeEdge(
    source: NodeValue,
    destination: NodeValue
  ): GraphNode[] | undefined {
    const sourceNode = this.nodeExists(source);
    const destinationNode = this.nodeExists(destination);

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
      if (!this.directed) {
        destinationNode.removeAdjacent(sourceNode);
      }

      return [sourceNode, destinationNode];
    }
  }

  /**
   * Breadth-first search (BFS) starts at the tree root (or some
   * arbitrary node of a graph and explores the adjacent nodes first,
   * before moving to the next level adjacents.
   *
   * Using a generator (*) allows us to yield the next node in the
   * graph on each iteration of the loop.
   */
  *breadthSearch(first: GraphNode | undefined) {
    // Maintain a store of visited nodes during traversal
    const visited = new Map();
    const visitList = new Queue();

    if (first) visitList.push(first);

    while (visitList.size > 0) {
      const node = visitList.next();
      if (node && !visited.has(node)) {
        yield node;
        visited.set(node, null);
        node.adjacents.forEach(adj => visitList.push(adj));
      }
    }
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

const graph = new Graph(false);

const [first] = graph.addEdge('a', 'c');
graph.addEdge('a', 'b');
graph.addEdge('c', 'd');
graph.addEdge('b', 'c');

console.log('~~~~~~~~~~~~~~~~~~ \nGraph Nodes:');

for (let [key, value] of graph.nodes) {
  console.log(
    key,
    value.adjacents.map(a => a.value)
  );
}

console.log('~~~~~~~~~~~~~~~~~~ \nBreadth-First Search:');
const bfs: IterableIterator<GraphNode> = graph.breadthSearch(first);

console.log(
  bfs.next().value.value,
  '> ',
  bfs.next().value.value,
  '> ',
  bfs.next().value.value,
  '> ',
  bfs.next().value.value
);
