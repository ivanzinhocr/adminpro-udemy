import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) { }

  sonIguales(campo1: string, campo2: string) {
    return(group: FormGroup) => {

      const valor1 = group.controls[campo1].value;
      const valor2 = group.controls[campo2].value;

      if (valor1 === valor2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.formulario = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      contrasinal: new FormControl( null, Validators.required ),
      contrasinal2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'contrasinal', 'contrasinal2' ) });

    this.formulario.setValue({
      nombre : 'Test',
      correo: 'test@test.com',
      contrasinal: '123456',
      contrasinal2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.formulario.invalid) {
      return;
    }

    if (!this.formulario.value.condiciones) {
      Swal('Importante', 'Debe aceptar las condiciones', 'error');
      return;
    }

    const usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.contrasinal
    );

    this._usuarioService.crearUsuario(usuario)
                .subscribe(resp => this.router.navigate(['/login']));
  }

}
