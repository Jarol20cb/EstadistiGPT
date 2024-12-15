import { Component } from '@angular/core';

@Component({
  selector: 'app-agrupados',
  templateUrl: './agrupados.component.html',
  styleUrls: ['./agrupados.component.css'],
})
export class AgrupadosComponent {
  valorMinimo = 0;
  valorMaximo = 0;
  numeroDatos = 0;

  rango = 0;
  numeroClases = 0;
  numeroClasesDecimales = 0;
  amplitud = 0;

  clases: {
    intervalo: string;
    fi: number;
    fiAcumulado: number;
    marcaClase: number;
    hi: number;
    hiAcumulado: number;
    hiPercent: number;
    hiAcumuladoPercent: number;
  }[] = [];

  calcularRango() {
    if (this.valorMaximo > this.valorMinimo && this.numeroDatos > 0) {
      this.rango = this.valorMaximo - this.valorMinimo;

      // Regla de Sturges para número de intervalos (k)
      this.numeroClasesDecimales = 1 + 3.322 * Math.log10(this.numeroDatos);
      this.numeroClases = Math.ceil(this.numeroClasesDecimales);

      // Amplitud (w) con redondeo por exceso
      const maxDecimals = Math.max(
        this.countDecimals(this.valorMinimo),
        this.countDecimals(this.valorMaximo)
      );
      const rawAmplitude = this.rango / this.numeroClases;
      this.amplitud = parseFloat(
        (Math.ceil(rawAmplitude * Math.pow(10, maxDecimals)) / Math.pow(10, maxDecimals)).toFixed(
          maxDecimals
        )
      );

      // Generar clases
      this.generarClases();
    }
  }

  generarClases() {
    this.clases = [];
    let inicio = this.valorMinimo;
    for (let i = 0; i < this.numeroClases; i++) {
      const fin = inicio + this.amplitud;
      this.clases.push({
        intervalo: `${inicio.toFixed(2)} - ${fin.toFixed(2)}`,
        fi: 0,
        fiAcumulado: 0,
        marcaClase: parseFloat(((inicio + fin) / 2).toFixed(2)),
        hi: 0,
        hiAcumulado: 0,
        hiPercent: 0,
        hiAcumuladoPercent: 0,
      });
      inicio = fin;
    }
  }

  calcularFrecuencias() {
    let acumulado = 0;
    const totalFi = this.clases.reduce((sum, clase) => sum + clase.fi, 0);

    this.clases.forEach((clase) => {
      acumulado += clase.fi;
      clase.fiAcumulado = acumulado;
      clase.hi = totalFi ? clase.fi / totalFi : 0;
      clase.hiAcumulado = totalFi ? acumulado / totalFi : 0;
      clase.hiPercent = clase.hi * 100;
      clase.hiAcumuladoPercent = clase.hiAcumulado * 100;
    });
  }

  // Función auxiliar para contar decimales en un número
  private countDecimals(value: number): number {
    if (Math.floor(value) !== value) {
      return value.toString().split('.')[1].length || 0;
    }
    return 0;
  }
}
