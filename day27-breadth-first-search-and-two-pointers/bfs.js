class Node { 
  constructor(value, children=[]) {
    this.value = value;
    this.children = children;
    this.next=null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  isEmpty() {
    return !this.front;
  }

  add(node) {
    const newNode = node;
    if (this.isEmpty()) {
      this.front = this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }
    const front = this.front;
    this.front = this.front.next;
    return front;
  }
}

function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.remove();

    console.log("Visiting node: ", currentNode.value);

    if (currentNode.value === searchValue) {
      console.log("Found the node!");
      return currentNode;
    }

    for (let child of currentNode.children) {
      queue.add(child);
    }
  }

  console.log("Node not found!");
  return null;
}


class Vertex {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
  }
}

class Graph {
  constructor() {
    this.vertices = [];
  }

  addVertex(value) {
    this.vertices.push(new Vertex(value));
  }

  addEdge(value1, value2) {
    const vertex1 = this.vertices.find(v => v.value === value1);
    const vertex2 = this.vertices.find(v => v.value === value2);
    vertex1.neighbors.push(vertex2);
    vertex2.neighbors.push(vertex1);
  }
  
  getVertex(value) {
    return this.vertices.find(v => v.value === value);
  }
}

function bfsGraph(graph, startValue, searchValue) {
  let startVertex = graph.getVertex(startValue);
  let queue = new Queue();
  queue.add(startVertex);
  
  let visited = new Set();
  visited.add(startVertex);

  while (!queue.isEmpty()) {
    let currentVertex = queue.remove();

    if (currentVertex.value === searchValue) {
      console.log("Found the vertex!");
      return currentVertex;
    }

    for (let neighbor of currentVertex.neighbors) {
      //if we have not visited a neighbor then queue it up and mark it as visited
      if (!visited.has(neighbor)) {
        queue.add(neighbor);
        visited.add(neighbor);
      }
    }
  }

  console.log("Vertex not found!");
  return null;
}

module.exports = {
  bfsTree,
  bfsGraph,
  Queue,
  Graph,
  Node
}
