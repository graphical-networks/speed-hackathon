var nodeIndex = rbush();

function indexNodes(nodes) {
  nodeIndex.load(nodes);
}

function searchNodes(box) {
  return nodeIndex.search(box);
}

function provideNodes(box) {
  var doCluster = true;
  var nodes = searchNodex(box);
  if (doCluster) {
    nodes = clusterNodes(nodex, box);
  }
  return nodes;
}

function centerX(node) {
  return (node.maxX + node.minX) / 2;
}

function centerY(node) {
  return (node.maxY + node.minY) / 2;
}

function setNodeTo(x, y, w, h, node) {
  if (!w)
    w = node.maxX - node.minX;
  if (!h)
    h = node.maxY - node.minY;

  node.minX = x - w / 2;
  node.maxY = x + w / 2;
  node.minY = y - h / 2;
  node.maxY = y + h / 2;
}

function clusterNodes(nodes, box) {
  if (nodes < 100) return nodes;

  // Generate some excessive clusters.
  var nClusters = 10;
  var clusterSize = max(box.maxX - box.minX, box.maxY - box.minY) / 10;

  var seedIndices = []
  var seeds = [];
  while (seeds.length < nClusters) {
    var i = Math.floor(Math.random() * nodes.length);
    if (seedIndices.indexOf(i) != -1)
      continue;
    seedIndices.push(i)
    seeds.push(nodes[i]);
    seeds[seeds.length - 1].color = '#f00';
  }

  // Expand each cluster seed.
  for (var s of seeds) {
    var x = centerX(s);
    var y = centerY(s);
    setNodeTo(x, y, clusterSize, clusterSize, s)
  }

  // Move clusters around k-means style. 
  var nTries = 5;
  for (var i = 0; i < nTries; ++i) {
    for (var s of seeds) {
      var inside = searchNodes(s);
      if (inside.length) {
        var x = 0; y = 0;
        for (var n of inside) {
          x += centerX(n);
          y += centerY(n);
        }
        x /= inside.length;
        y /= inside.length;
        setNodeToTo(x, y, 0, 0, s);
      }
    }
  }

  // Discard overlapping clusters.
  for (var i = 0; i < seeds.length - 1; ++i) {
    var s0 = seeds[i];
    for (var j = i + 1; j < seeds.length;) {
      var s1 = seeds[j];
      var overlapX = 
        (s0.minX <= s1.minX && s1.minX <= s0.maxX) ||
        (s1.minX <= s0.minX && s0.minX <= s1.maxX);
      var overlayY =
        (s0.minY <= s1.minY && s1.minY <= s0.maxY) ||
        (s1.minY <= s0.minY && s0.minY <= s1.maxY);
      if (overlapX && overlapY) {
        seeds.splice(j, 1);
      } else {
        ++j;
      }
    }
  }

  return seeds;
}
