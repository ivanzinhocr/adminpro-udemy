import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/services.index';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  pagina: number = 1;

  totalRegistros: number = 0;
  totalPaginas: number = 0;

  cargando: boolean = true;

  constructor(
    public _hopitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hopitalService.cargarHospitales(this.pagina).subscribe((resp: any) => {
      this.totalRegistros = resp.cantidad;
      this.hospitales = resp.hospitales;
      this.totalPaginas = resp.paginas;

      this.cargando = false;
    });
  }

  obtenerHospital(id: string) {
    this.cargando = true;

    this._hopitalService
      .obtenerHospital(id)
      .subscribe(hospital => {
        this.hospitales = hospital;

        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar el hospital ' + hospital.nombre + '.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrarlo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._hopitalService.borrarHospital(hospital._id)
          .subscribe(resp => {
            this.totalPaginas = resp;

            if (this.pagina > this.totalPaginas) {
              this.pagina = this.totalPaginas;
            }

            this.cargarHospitales();
          });
      }
    });
  }

  cambiarPagina(avance: number) {
    this.pagina = this.pagina + avance;

    if (this.pagina < 1) {
      this.pagina = 1;
    } else if (this.pagina > this.totalPaginas) {
      this.pagina = this.totalPaginas;
    } else {
      this.cargarHospitales();
    }
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital.',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear hospital',
      cancelButtonText: 'Cancelar',
      inputPlaceholder: 'Nombre del hospital',
      inputValidator: (value) => {
        return !value && 'Introduzca un nombre!';
      }
    }).then((resultado) => {

      if (resultado.value) {
        this._hopitalService.crearHospital(resultado.value)
                            .subscribe(() => this.cargarHospitales());
      }
    });
  }

  buscarHospitales(termino: string) {
    if (termino === '') {
      this.cargarHospitales();
    } else {
      this.cargando = true;

      this._hopitalService.buscarHospitales(termino)
                          .subscribe(hospital => this.hospitales = hospital );

      this.cargando = false;
    }
  }

  actualizarHospital(hospital: Hospital) {
    this._hopitalService.actualizarHospital(hospital)
                        .subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
