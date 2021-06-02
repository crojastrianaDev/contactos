import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  ToastController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { ContactosService } from '../services/contactos.service';
import { Contacto } from '../models/contactos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.page.html',
  styleUrls: ['./editar-contacto.page.scss'],
})
export class EditarContactoPage implements OnInit {
  id: any;
  contacto: Contacto;
  seleccionado: Contacto;
  updateForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private contactoService: ContactosService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.forEach((e: Params) => {
      console.log(e.id);
      this.contactoService.getContacto(e.id).subscribe((select) => {
        console.log(select);

        this.seleccionado = select;
        this.crearForm(this.seleccionado);
      });
    });
  }
  editar(): void {
    console.log(this.seleccionado);

    if (this.updateForm.invalid) {
      this.mostrarMensaje('Debe ingresar correctamento los campos');
    } else {
      this.contacto = this.updateForm.value;
      this.contacto.id = this.seleccionado.id;
      this.contactoService.editarContacto(this.contacto).then(
        () => {
          this.mostrarMensaje('Contacto actualizado');
        },
        (err) => {
          this.mostrarMensaje('Error al actualizar');
        }
      );
      this.regresar();
    }
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
  resetForm() {
    this.updateForm.reset();
  }
  private crearForm(contacto: Contacto) {
    this.updateForm = this.formBuild.group({
      nombre: [contacto.nombre, Validators.required],
      apellidos: [contacto.apellidos, Validators.required],
      telefono: [contacto.telefono, Validators.required],
      empresa: [contacto.empresa, Validators.required],
      correo: [contacto.correo, Validators.required],
    });
  }
}
