import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contactos';
import { ContactosService } from '../services/contactos.service';
import {
  NavController,
  LoadingController,
  ToastController,
  ActionSheetController,
  AlertController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos: Observable<Contacto[]>;

  constructor(
    private contactosService: ContactosService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.contactos = this.contactosService.getContactos();
  }
  async selectContacto(contacto: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Qué deseas hacer?',
      buttons: [
        {
          text: 'Borrar contecto',
          role: 'destructive',
          handler: () => {
            this.borrar(contacto);
          },
        },
        {
          text: 'Editar contacto',
          handler: () => {
            this.editar(contacto);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
  async borrar(contacto: Contacto) {
    const alert = await this.alertCtrl.create({
      header: 'Borrar',
      message: 'Esta seguro que desea borrar a ' + contacto.nombre,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.mostrarMensaje('Cancelado');
          },
        },
        {
          text: 'SI',
          handler: () => {
            this.contactosService.borrarContacto(contacto);
            this.mostrarMensaje('Se elimino el contacto con exito');
          },
        },
      ],
    });
    await alert.present();
  }
  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
  async editar(contacto: Contacto) {
    this.router.navigate(['tabs/editarContacto', contacto]);
  }
}
