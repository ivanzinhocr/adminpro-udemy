import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', new Hospital(''));

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoutes: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {

      this.activatedRoutes.params.subscribe(params => {
        const id = params['id'];

        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales(1, 9999999999)
                         .subscribe((resp: any)  => this.hospitales = resp.hospitales);

    this._modalUploadService.notificacion
                            .subscribe((resp: any) => this.medico.img = resp.medico.img);
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
                       .subscribe(medico => {
                         this.medico._id = medico._id;

                         this.router.navigate(['/medico', medico._id]);
                       });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
                         .subscribe(hospital => this.medico.hospital = hospital);
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
                       .subscribe(medico => this.medico = medico);

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
