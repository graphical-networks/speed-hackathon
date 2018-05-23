// Helper to sample date from Normal distribution.
// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0)
      u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0)
      v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// This function generates N-clusters with maybe K-objects. Some objects may
// be skipped due to out of boundaries.
function generate_nodes(num_clusters, num_objects_per_cluster) {
  var DIAGRAM_SIZE = 1000;
  var NODE_SIZE = 10;
  var PADDING = 50;

  // Results.
  nodes = [];
  cluster_size = DIAGRAM_SIZE / num_clusters / 2;
  var cluster;
  for (cluster = 0; cluster < num_clusters; cluster++) {
      x_cluster = Math.abs(
        PADDING + (DIAGRAM_SIZE - PADDING) * Math.random());
      y_cluster = Math.abs(
        PADDING + (DIAGRAM_SIZE - PADDING) * Math.random());
      var i;
      for (i = 0; i < num_objects_per_cluster; i++) {
        x = Math.min(x_cluster + cluster_size * randn_bm(),
                     DIAGRAM_SIZE - NODE_SIZE);
        y = Math.min(y_cluster + cluster_size * randn_bm(),
                     DIAGRAM_SIZE - NODE_SIZE);
        if (x < 0 || y < 0 || x > DIAGRAM_SIZE - NODE_SIZE ||
            y > DIAGRAM_SIZE - NODE_SIZE)
          continue;

        nodes.push({
          minX: x,
          maxX: x + NODE_SIZE,
          minY: y,
          maxY: y + NODE_SIZE,
          color: '#0000FF'});
      }
  }
  return nodes;
}
