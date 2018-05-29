import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() lenda: string = 'Lenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {  }

  ngOnInit() {
  }

  cambiarProgreso( valor: number) {
    this.progreso += valor;

    if (this.progreso < 0) {
      this.progreso = 0;
    } else if (this.progreso > 100) {
      this.progreso = 100;
    }

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

  onChange(novoValor: number) {

    this.progreso = novoValor;

    if (this.progreso < 0) {
      this.progreso = 0;
    } else if (this.progreso > 100) {
      this.progreso = 100;
    }

    this.txtProgress.nativeElement.value = Number(this.progreso);

    this.cambioValor.emit(this.progreso);
  }
}
