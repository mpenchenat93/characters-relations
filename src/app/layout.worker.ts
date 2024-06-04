/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { nodes, edges } = data;

  const positions = fruchtermanReingold(nodes, edges);

  postMessage(positions);
});

function fruchtermanReingold(
  nodes: any[],
  edges: any[],
  width = 1000,
  height = 1000,
  iterations = 50
) {
  const area = width * height;
  const k = Math.sqrt(area / nodes.length);
  const positions: any = {};
  const displacement: any = {};

  nodes.forEach((node) => {
    positions[node.id] = {
      x: Math.random() * width,
      y: Math.random() * height,
    };
    displacement[node.id] = { x: 0, y: 0 };
  });

  for (let i = 0; i < iterations; i++) {
    // Forces de répulsion
    nodes.forEach((v) => {
      displacement[v.id] = { x: 0, y: 0 };
      nodes.forEach((u) => {
        if (v.id !== u.id) {
          const dx = positions[v.id].x - positions[u.id].x;
          const dy = positions[v.id].y - positions[u.id].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0) {
            const force = (k * k) / distance;
            displacement[v.id].x += (dx / distance) * force;
            displacement[v.id].y += (dy / distance) * force;
          }
        }
      });
    });

    // Forces d'attraction
    edges.forEach((edge) => {
      const source = edge.from;
      const target = edge.to;
      const dx = positions[source].x - positions[target].x;
      const dy = positions[source].y - positions[target].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        const force = (distance * distance) / k;
        displacement[source].x -= (dx / distance) * force;
        displacement[source].y -= (dy / distance) * force;
        displacement[target].x += (dx / distance) * force;
        displacement[target].y += (dy / distance) * force;
      }
    });

    // Mettre à jour les positions
    nodes.forEach((node) => {
      positions[node.id].x += displacement[node.id].x;
      positions[node.id].y += displacement[node.id].y;
      // Confinement dans la zone
      positions[node.id].x = Math.min(width, Math.max(0, positions[node.id].x));
      positions[node.id].y = Math.min(
        height,
        Math.max(0, positions[node.id].y)
      );
    });
  }

  return positions;
}
