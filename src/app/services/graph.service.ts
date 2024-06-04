import { Injectable } from '@angular/core';

interface Node {
  id: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
  label: string;
  arrows: string;
}

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor() {}

  filterNodesAndEdges(
    nodes: Node[],
    edges: Edge[],
    lengthBetweenNodes: number,
    nodeId: number
  ): { filteredNodes: Node[]; filteredEdges: Edge[] } {
    const nodeDict = new Map<number, Node>();
    nodes.forEach((node) => nodeDict.set(node.id, node));

    const adjList = new Map<number, number[]>();
    nodes.forEach((node) => adjList.set(node.id, []));
    edges.forEach((edge) => {
      adjList.get(edge.from)?.push(edge.to);
      adjList.get(edge.to)?.push(edge.from);
    });

    const visited = new Set<number>();
    const distance = new Map<number, number>([[nodeId, 0]]);
    const queue: number[] = [nodeId];

    visited.add(nodeId);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      const currentDistance = distance.get(currentNode)!;

      if (currentDistance < lengthBetweenNodes) {
        adjList.get(currentNode)?.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            distance.set(neighbor, currentDistance + 1);
            queue.push(neighbor);
          }
        });
      }
    }

    const filteredNodes = nodes.filter((node) => visited.has(node.id));
    const filteredEdges = edges.filter(
      (edge) => visited.has(edge.from) && visited.has(edge.to)
    );

    return { filteredNodes, filteredEdges };
  }
}
