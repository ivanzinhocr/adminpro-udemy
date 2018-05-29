import { Component } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component {

  graficos: any = {
    'grafico1': {
      'labels': ['Xamón', 'Chourio', 'Touciño'],
      'data': [24, 30, 46],
      'type': 'doughnut',
      'lenda': 'O pan comese con'
    },
    'grafico2': {
      'labels': ['Homes', 'Mulleres'],
      'data': [4500, 6000],
      'type': 'doughnut',
      'lenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'Non'],
      'data': [95, 5],
      'type': 'doughnut',
      'lenda': '¿Ten ganas de touciño?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data': [85, 15],
      'type': 'doughnut',
      'lenda': '¿impórtalle engordinflonar?'
    },
  };

  constructor() { }
}
