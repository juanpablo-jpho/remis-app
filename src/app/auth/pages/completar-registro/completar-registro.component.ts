

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { Models } from 'src/app/models/models';
import { FirestoreService } from '../../../firebase/firestore.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/firebase/storage.service';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.scss'],
})
export class CompletarRegistroComponent  implements OnInit {

  authenticationService: AuthenticationService = inject(AuthenticationService);
  firestoreService:   FirestoreService = inject(  FirestoreService);
  storageService: StorageService = inject(StorageService);
 
  cargando: boolean = false;

  user: User;
  userProfile: Models.Auth.UserProfile;

  datosFormCompleteRegistro = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    name: ['', Validators.required],
    photo: [null, Validators.required],
    age: [null, Validators.required],
  });
  

  constructor(private fb: FormBuilder,
              private router: Router,
              private interactionService: InteractionService) { 


               this.user =  this.authenticationService.auth.currentUser;
               const photo: any = this.user.photoURL
               this.datosFormCompleteRegistro.setValue({
                email: this.user.email,
                name: this.user.displayName,
                photo: photo,
                age: null
              }
)


  }

  ngOnInit() {}

  async completarRegistro() {
    this.cargando = true;
    await this.interactionService.showLoading('Procensando...')
    console.log('datosFormCompleteRegistro -> ', this.datosFormCompleteRegistro);
    if (this.datosFormCompleteRegistro.valid) {
      const data = this.datosFormCompleteRegistro.value;
      console.log('valid -> ', data);
      try {

        let photo: any = data.photo;
        if (typeof data.photo != 'string') {
          const foto: File = data.photo;
          const folder = `PhotosPerfil/${this.user.uid}`;
          const snapshot = await this.storageService.uploadFile(folder, foto.name, foto);
          const url = await this.storageService.getDownloadURL(snapshot.ref.fullPath);
          console.log('url -> ', url);
          photo = snapshot.ref.fullPath
         
        }
        
        let profile: Models.Auth.UpdateProfileI = {
          displayName: data.name,
          photoURL: photo
        };
     
        // https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg
        const user = this.authenticationService.getCurrentUser()
        await this.authenticationService.updateProfile(profile);
        const datosUser: Models.Auth.UserProfile = {
          name: data.name,
          photo: photo,
          age: data.age,
          id: user.uid,
          email: data.email,
          roles: { cliente: true }
        }
        console.log('datosUser -> ', datosUser);
        await this.firestoreService.createDocument(Models.Auth.PathUsers, datosUser, user.uid);
        console.log('completado registro con éxito');
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Completado registro con éxito')
        this.router.navigate(['/user/perfil'])
      } catch (error) {
        console.log('registrarse error -> ', error);
        this.interactionService.presentAlert('Error', 'Ocurrió un error, intenta nuevamente')

      }
    }
    this.cargando = false;
  }

  async viewPreview(input: HTMLInputElement) {
    if (input.files.length) {
        const files = input.files;
        console.log('viewPreview files -> ', files);
        const img: any = files.item(0)
        this.datosFormCompleteRegistro.controls.photo.setValue(img);
        console.log('this.datosFormCompleteRegistro.controls.photo -> ', this.datosFormCompleteRegistro.controls.photo.value);

    }
  }

}
