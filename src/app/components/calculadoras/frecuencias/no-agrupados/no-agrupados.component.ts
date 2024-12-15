import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-no-agrupados',
  templateUrl: './no-agrupados.component.html',
  styleUrls: ['./no-agrupados.component.css']
})
export class NoAgrupadosComponent {
  data: {
    nombre: string;
    fi: number;
    fiAcumulado: number;
    hi: number;
    hiAcumulado: number;
    fiPercent: number;
    hiPercent: number;
  }[] = [
    {
      nombre: '',
      fi: 0,
      fiAcumulado: 0,
      hi: 0,
      hiAcumulado: 0,
      fiPercent: 0,
      hiPercent: 0,
    },
  ];

  chart: any;
  totalFi = 0;

  // Método para agregar una fila
  addRow() {
    this.data.push({
      nombre: '',
      fi: 0,
      fiAcumulado: 0,
      hi: 0,
      hiAcumulado: 0,
      fiPercent: 0,
      hiPercent: 0,
    });
    this.updateCalculations();
  }

  // Método para eliminar una fila
  removeRow(index: number) {
    this.data.splice(index, 1);
    this.updateCalculations();
  }

  // Método para calcular valores y actualizar el gráfico
  updateCalculations() {
    this.totalFi = this.data.reduce((sum, row) => sum + row.fi, 0);
    let cumulativeFi = 0;

    this.data.forEach((row) => {
      cumulativeFi += row.fi;
      row.fiAcumulado = cumulativeFi;
      row.hi = this.totalFi ? row.fi / this.totalFi : 0;
      row.hiAcumulado = this.totalFi ? cumulativeFi / this.totalFi : 0;
      row.fiPercent = row.hi * 100;
      row.hiPercent = row.hiAcumulado * 100;
    });

    this.updateChart();
  }

  // Método para generar el gráfico
  updateChart() {
    if (this.chart) this.chart.destroy();
    if (this.totalFi > 0) {
      this.chart = new Chart('chart', {
        type: 'bar',
        data: {
          labels: this.data.map((row) => row.nombre || 'Sin Nombre'),
          datasets: [
            {
              label: 'Frecuencia Absoluta (Fi)',
              data: this.data.map((row) => row.fi),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }
}
