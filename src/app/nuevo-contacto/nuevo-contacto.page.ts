import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Contacto } from '../models/contactos';
import { ContactosService } from '../services/contactos.service';

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.page.html',
  styleUrls: ['./nuevo-contacto.page.scss'],
})
export class NuevoContactoPage implements OnInit {
  nuevoContacto = {} as Contacto;
  nuevoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavController,
    private loadingController: LoadingController,
    private formBuild: FormBuilder,
    private toastCtrl: ToastController,
    private contactoSerive: ContactosService
  ) {}

  ngOnInit() {
    this.crearForm();
  }
  guardar() {
    if (this.nuevoForm.invalid) {
      this.mostrarMensaje('Ingrese todos los campos');
      return false;
    } else {
      this.nuevoContacto = this.nuevoForm.value;
      this.mostrarMensaje('Guardando...');
      this.contactoSerive.crearContacto(this.nuevoContacto).then(
        () => {
          this.regresar();
          this.mostrarMensaje('Contacto creado');
          this.resetForm();
        },
        (err) => {
          this.mostrarMensaje('Eror creando contacto');
        }
      );
    }
  }
  resetForm() {
    this.nuevoForm.reset();
  }
  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
  regresar() {
    this.router.navigate(['/tabs/contactos']);
  }
  private crearForm() {
    this.nuevoForm = this.formBuild.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required, Validators.pattern('[- +()0-9]+')],
      empresa: ['', Validators.required],
      correo: ['', Validators.email],
    });
  }
}
