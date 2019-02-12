import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;
  totalPaginas: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
                    .map((resp: any) => {

                      this.totalPaginas = resp.paginas;
                      this.totalMedicos = resp.cantidad;

                      return resp.medicos;
                    });
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
      .map((resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
                    .map((resp: any) => {
                      this.totalMedicos = resp.cantidad;
                      this.totalPaginas = resp.paginas;

                      swal('¡Médico borrado!', 'El médico ' + resp.medico.nombre + ' ha sido borrado correctamente', 'success');

                      return true;
                    });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
                      .map((resp: any) => {
                        swal('¡Médico actualizado!', 'El médico ' + medico.nombre + ' se ha actualizado correctamente', 'success');
                        return resp.medico;
                      });
    } else {
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
                      .map((resp: any) => {
                        swal('¡Médico creado!', 'El médico ' + medico.nombre + ' se ha creado correctamente', 'success');
                        return resp.medico;
                      });
    }
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
               .map((resp: any) => resp.medico);
  }
}
