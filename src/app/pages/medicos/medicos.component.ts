import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  pagina: number = 1;

  cargando = false;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos().subscribe(medicos => {
      this.medicos = medicos;

      this.cargando = false;
    });
  }

  buscarMedicos(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos(termino)
                       .subscribe(resp => this.medicos = resp);

    this.cargando = false;
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar el médico ' + medico.nombre + '.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrarlo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico(medico._id).subscribe(() => this.cargarMedicos());
      }
    });
  }

}
