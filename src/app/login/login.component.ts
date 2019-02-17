import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '465246190046-sv0jromgfn69tq8fkl5idhge0gts7o5k.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
}

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(resp =>  window.location.href = '/dashboard'
          // this.router.navigate(['/dashboard'])  non se sabe ben por que pero recarga mal a páxina
        );
    });
  }

  ingresar(formulario: NgForm) {

    if (formulario.invalid) {
      return;
    }

    const usuario = new Usuario(null, formulario.value.email, formulario.value.password);

    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
  }
}
