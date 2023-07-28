class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  depthFirstSearch(searchValue) {
    if (this.value === searchValue) return this;
    if (this.left) {
      const leftSearchResult = this.left.depthFirstSearch(searchValue);
      if (leftSearchResult) return leftSearchResult;
    }
    if (this.right) {
      const rightSearchResult = this.right.depthFirstSearch(searchValue);
      if (rightSearchResult) return rightSearchResult;
    }
    return null;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  depthFirstSearch(searchValue) {
    if (this.value === searchValue) return this;
    for (let child of this.children) {
      const childSearchResult = child.depthFirstSearch(searchValue);
      if (childSearchResult) return childSearchResult;
    }
    return null;
  }
}
