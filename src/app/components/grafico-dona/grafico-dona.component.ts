import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() grafico: any = {};

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = '';
  public lenda: string = '';

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = this.grafico.labels;
    this.doughnutChartData = this.grafico.data;
    this.doughnutChartType = this.grafico.type;
    this.lenda = this.grafico.lenda;
  }

  // // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }
}
