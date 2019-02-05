import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  pagina: number = 1;

  totalRegistros: number = 0;
  totalPaginas: number = 0;

  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
                            .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.pagina).subscribe((resp: any) => {
      this.totalRegistros = resp.cantidad;
      this.usuarios = resp.usuarios;
      this.totalPaginas = resp.paginas;

      this.cargando = false;
    });
  }

  cambiarPagina(avance) {
    this.pagina += avance;

    if (this.pagina <= 0) {
      this.pagina = 1;
      return;
    }

    if (this.pagina > this.totalPaginas) {
      this.pagina = this.totalPaginas;
      return;
    }

    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino) {
      this.cargando = true;

      this._usuarioService.buscarUsuarios(termino)
                          .subscribe((resp: Usuario[]) => {
                            this.usuarios = resp;
                          });

      this.cargando = false;
    } else {
      this.cargarUsuarios();
    }
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar al usuario ' + usuario.nombre + '.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, borrarlo!',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
                            .subscribe(resp => {
                              this.pagina = 1;
                              this.cargarUsuarios();
                            });
      }
    });
  }

  guardarUsuario(usuario) {
    this._usuarioService.actualizarUsuario(usuario)
                        .subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
