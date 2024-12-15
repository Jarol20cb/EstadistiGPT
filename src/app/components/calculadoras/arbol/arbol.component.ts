import { Component } from '@angular/core';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css'],
})
export class ArbolComponent {
  branches: number = 2; // Número de ramas iniciales
  treeNodes: any[] = []; // Lista de nodos del árbol
  totalFavor: number = 0; // Probabilidad total a favor
  totalContra: number = 0; // Probabilidad total en contra

  // Generar árbol inicial
  generateTree() {
    this.treeNodes = Array.from({ length: this.branches }, () => ({
      probability: 0,
      subNodes: [
        { probability: 0, subNodes: [] }, // Subnodo 1
        { probability: 0, subNodes: [] }, // Subnodo 2
      ],
    }));
    this.updateDiagram();
  }

  // Actualizar el diagrama con nodos y subnodos
  updateDiagram() {
    const element = document.getElementById('tree-diagram');
    if (!element || !(element instanceof SVGSVGElement)) {
      console.error('El elemento con id "tree-diagram" no es un SVG válido.');
      return;
    }

    const svg = element as SVGSVGElement;
    svg.innerHTML = '';

    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 600;

    const drawNode = (x: number, y: number, label: string, color: string) => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '35'); // Tamaño del nodo ajustado
      circle.setAttribute('fill', color);
      circle.setAttribute('stroke', '#fff');
      circle.setAttribute('stroke-width', '2'); // Borde blanco
      svg.appendChild(circle);

      const text = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      text.setAttribute('x', x.toString());
      text.setAttribute('y', (y + 5).toString());
      text.setAttribute('fill', '#fff');
      text.style.fontSize = '18px'; // Tamaño del texto ajustado
      text.style.fontWeight = 'bold';
      text.style.textAnchor = 'middle'; // Centramos el texto
      text.textContent = label;
      svg.appendChild(text);
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('x1', x1.toString());
      line.setAttribute('y1', y1.toString());
      line.setAttribute('x2', x2.toString());
      line.setAttribute('y2', y2.toString());
      line.setAttribute('stroke', '#ccc');
      line.setAttribute('stroke-width', '2');
      svg.insertBefore(line, svg.firstChild); // Inserta la línea antes que los círculos
    };

    const drawTree = (
      nodes: any[],
      x: number,
      y: number,
      level: number,
      totalWidth: number
    ) => {
      const hSpacing = totalWidth / (nodes.length + 1); // Espaciado horizontal dinámico
      const vSpacing = 150; // Espaciado vertical fijo

      nodes.forEach((node, i) => {
        const childX = x + hSpacing * (i + 1) - totalWidth / 2;
        const childY = y + vSpacing;

        drawLine(x, y, childX, childY); // Dibujar línea antes del círculo
        drawNode(childX, childY, node.probability.toString(), '#FF477E'); // Dibujar círculo

        if (node.subNodes.length > 0) {
          const subWidth = totalWidth / (node.subNodes.length + 1);
          drawTree(node.subNodes, childX, childY, level + 1, subWidth);
        }
      });
    };

    drawTree(this.treeNodes, width / 2, 50, 0, width - 100); // Ajuste inicial
  }

  // Actualizar probabilidades y calcular total
  updateProbabilities() {
    this.totalFavor = this.treeNodes.reduce((sum, node) => {
      const sub1 = node.subNodes[0]?.probability || 0;
      return sum + node.probability * sub1;
    }, 0);

    // Calculamos el total en contra directamente
    this.totalContra = 1 - this.totalFavor;

    // Actualizamos el diagrama visual
    this.updateDiagram();
  }

  // Actualización del subnodo con cálculo automático de la probabilidad restante
  updateSubNodeProbability(nodeIndex: number, subNodeIndex: number) {
    const node = this.treeNodes[nodeIndex];
    const subNode = node.subNodes[subNodeIndex];

    // Restringimos la probabilidad entre 0 y 1
    subNode.probability = Math.min(Math.max(subNode.probability, 0), 1);

    // Calculamos la probabilidad restante y la asignamos al otro subnodo
    const remainingIndex = subNodeIndex === 0 ? 1 : 0;
    node.subNodes[remainingIndex].probability = 1 - subNode.probability;

    // Actualizamos las probabilidades totales
    this.updateProbabilities();
  }
}
