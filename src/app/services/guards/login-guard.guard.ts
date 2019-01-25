import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor (
    public _usuarioService: UsuarioService,
    public router: Router) {}

  canActivate(): boolean {

    if (this._usuarioService.estaLogueado()){
      console.log('Pasó el loginGuard');
      return true;
    } else {
      console.log('Bloqueado por el loginGuard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
