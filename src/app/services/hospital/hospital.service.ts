import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService) {}

  cargarHospitales(pagina: number, elementosPagina: number = 5) {
    const url = URL_SERVICIOS + '/hospital?pagina=' + pagina + '&elementosPagina=' + elementosPagina;

    return this.http.get(url);
  }

  obtenerHospital(id) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
                    .map((resp: any) => resp.hospital);
  }

  borrarHospital(id) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map((resp: any) => {
        swal('¡Borrado!', 'El hospital ' + resp.hospital.nombre + ' ha sido borrado.', 'success');
        return resp.paginas;
      });
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
                    .map((resp: any) => {
                      swal('¡Hospital creado!', 'El hospital ' + resp.hospital.nombre + ' se ha creado correctamente.', 'success');
                      return true;
                    });
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
                    .map((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                    .map(() => {
                      swal('¡Hospital actualizado!', 'El nombre del hospital se ha actualizado correctamente', 'success');
                    });
  }
}
