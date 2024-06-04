import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import vis from 'vis';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph-network',
  templateUrl: './graph-network.component.html',
  styleUrls: ['./graph-network.component.css'],
})
export class GraphNetworkComponent {
  @ViewChild('visNetwork', { static: false }) visNetworkContainer:
    | ElementRef
    | undefined;

  @Input() characters?: any;
  @Input() relations?: any;
  @Input() characterId?: any;

  @Output() characterIdOut: EventEmitter<any> = new EventEmitter();

  rangeValue = 2;

  filteredNodes: any;
  filteredEdges: any;

  nodes: any = [];
  edges: any = [];
  network: any;

  selectedItem: any = {};

  selectedNodeIds: any = [];
  selectedNode: any;

  sidebarVisible = false;

  innerWidth = window.innerWidth;

  blockedPanel = true;

  private savedSelection: any = { nodes: [], edges: [] };

  constructor(private graphService: GraphService) {}

  onRangeChange(): void {
    if (this.nodes.length > 0) this.updateGraph();
  }

  ngAfterViewInit() {
    this.nodes = new vis.DataSet();
    this.edges = new vis.DataSet();

    const res = this.graphService.filterNodesAndEdges(
      this.characters,
      this.relations,
      this.rangeValue,
      this.characterId
    );

    this.nodes.add(res.filteredNodes);
    this.edges.add(res.filteredEdges);

    this.filteredEdges = res.filteredEdges;
    this.filteredNodes = res.filteredNodes;

    setTimeout(() => {
      this.initializeNetwork();
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.toggleBodyScroll(this.sidebarVisible);
  }

  toggleBodyScroll(disableScroll: boolean) {
    if (disableScroll) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  private initializeNetwork(): void {
    const data = {
      nodes: this.nodes,
      edges: this.edges,
    };

    const options = {
      interaction: {
        dragNodes: true,
        selectable: true,
      },
      manipulation: {
        enabled: false,
      },
    };

    if (this.visNetworkContainer) {
      this.network = new vis.Network(
        this.visNetworkContainer.nativeElement,
        data,
        options
      );

      let isNodeBeingDragged = false;

      const nw = this.network;

      this.network.on('click', (params: any) => {
        if (params.nodes.length === 0) {
          // No node or edge clicked, reselect the previous selection
          this.reselectPrevious();
        } else {
          // Store the current selection as the previous selection
          this.savedSelection = {
            nodes: params.nodes,
            edges: params.edges,
          };
        }
      });

      this.network.on('selectNode', (params: any) => {
        this.onSelectNode(params);
      });

      this.network.on('beforeDrawing', () => {
        if (!isNodeBeingDragged) {
          this.savedSelection = {
            nodes: this.network.getSelectedNodes(),
            edges: this.network.getSelectedEdges(),
          };
        }
      });

      this.network.on('dragStart', (params: any) => {
        if (params.nodes.length > 0) {
          isNodeBeingDragged = true;
          nw.setOptions({
            interaction: {
              selectable: false,
            },
          });
        }
      });

      nw.on('dragging', () => {
        if (isNodeBeingDragged) {
          nw.unselectAll();
        }
      });

      this.network.on('dragEnd', () => {
        if (isNodeBeingDragged) {
          isNodeBeingDragged = false;
          nw.setOptions({
            interaction: {
              selectable: true,
            },
          });
          nw.selectEdges(this.savedSelection.edges);
          nw.selectNodes(this.savedSelection.nodes);
        }
      });

      this.selectNodeProgrammatically(this.characterId);
    }
  }

  private onSelectNode(params: any): void {
    this.characterId = params.nodes[0];
    this.characterIdOut.emit(this.characterId);
    this.updateGraph();
  }

  private updateGraph(): void {
    if (
      this.rangeValue !== undefined &&
      this.characterId !== undefined &&
      this.nodes.length > 0
    ) {
      const result = this.graphService.filterNodesAndEdges(
        this.characters,
        this.relations,
        this.rangeValue,
        this.characterId
      );

      const newFilteredNodes = result.filteredNodes;
      const newFilteredEdges = result.filteredEdges;

      // Update nodes
      const existingNodeIds = this.nodes.getIds();
      const newNodeIds = newFilteredNodes.map((node: any) => node.id);

      const nodesToRemove = existingNodeIds.filter(
        (id: any) => !newNodeIds.includes(id)
      );
      const nodesToAdd = newFilteredNodes.filter(
        (node: any) => !existingNodeIds.includes(node.id)
      );

      this.nodes.remove(nodesToRemove);
      this.nodes.update(nodesToAdd);

      // Update edges
      const existingEdgeIds = this.edges.getIds();
      const newEdgeIds = newFilteredEdges.map((edge: any) => edge.id);

      const edgesToRemove = existingEdgeIds.filter(
        (id: any) => !newEdgeIds.includes(id)
      );
      const edgesToAdd = newFilteredEdges.filter(
        (edge: any) => !existingEdgeIds.includes(edge.id)
      );

      this.edges.remove(edgesToRemove);
      this.edges.update(edgesToAdd);

      this.filteredNodes = newFilteredNodes;
      this.filteredEdges = newFilteredEdges;

      this.selectNodeProgrammatically(this.characterId);
    }
  }

  private selectNodeProgrammatically(nodeId: number): void {
    if (this.network && nodeId) {
      this.network.selectNodes([nodeId]);

      const selectedNode = this.nodes.get(nodeId);
      const adjacentEdges = this.edges.get({
        filter: (edge: any) => edge.from === nodeId || edge.to === nodeId,
      });

      setTimeout(() => {
        this.selectedItem = {
          node: selectedNode,
          edges: adjacentEdges,
        };
      });

      // Store the current selection as the previous selection
      this.savedSelection = {
        nodes: [nodeId],
        edges: adjacentEdges.map((edge: any) => edge.id),
      };
    }
  }

  private reselectPrevious(): void {
    if (this.network && this.savedSelection.nodes.length > 0) {
      this.network.selectNodes(this.savedSelection.nodes);

      setTimeout(() => {
        this.selectedItem = {
          node: this.nodes.get(this.savedSelection.nodes[0]),
          edges: this.edges.get({
            filter: (edge: any) =>
              edge.from === this.savedSelection.nodes[0] ||
              edge.to === this.savedSelection.nodes[0],
          }),
        };
      });
    }
  }
}
