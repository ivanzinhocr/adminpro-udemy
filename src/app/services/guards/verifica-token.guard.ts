import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor (
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('token guard');

    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return this.verificaRenovacion(payload.exp);
    }
  }

  verificaRenovacion(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date(); // mellor trae a data da base de datos para que non
                                // dependa de se o usuario cambia a data no seu equipo

      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000);
      console.log(tokenExp);
      console.log(ahora);

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
                            .subscribe(() => {
                              console.log('token renovado');
                              resolve(true);
                            },
                            () => {
                              this.router.navigate(['/login']);
                              reject(false);
                            });
      }
    });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora)  {
      return true;
    } else {
      return false;
    }
  }
}
