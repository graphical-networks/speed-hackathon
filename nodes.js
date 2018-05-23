var nodeIndex = rbush();

function indexNodes(nodes) {
  nodeIndex.treeLoad(nodes);
}

function searchNodes(box) {
  return nodeIndex.search(box);
}
