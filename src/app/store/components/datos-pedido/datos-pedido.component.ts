import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { IonText, IonButton, IonRouterLink, IonItem, IonLabel, IonAvatar, IonIcon, IonInput, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-pedido',
  templateUrl: './datos-pedido.component.html',
  styleUrls: ['./datos-pedido.component.scss'],
  standalone: true,
  imports: [
    IonGrid, IonRow, IonCol,
    IonButton, IonText, 
    RouterModule,
    IonRouterLink,
    IonItem, IonLabel, IonAvatar, IonIcon,
    SharedModule, CommonModule,
    IonInput,
    FormsModule, ReactiveFormsModule

  ]
})
export class DatosPedidoComponent  implements OnInit {

  private authenticationService: AuthenticationService = inject(AuthenticationService)
  user: User;

  datosForm = new FormGroup({
    phone: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  })

  constructor() { 

      this.authenticationService.authState.subscribe( user => {
          this.user = user;
      });

  }

  ngOnInit() {
      this.datosForm.controls.phone.statusChanges.subscribe( res => {
          console.log('phone -> ', res);
      })
  }



}
