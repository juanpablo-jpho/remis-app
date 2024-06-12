import { InteractionService } from './../../../services/interaction.service';
import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/firebase/authentication.service';
import { Models } from 'src/app/models/models';
import { FirestoreService } from '../../../firebase/firestore.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/firebase/storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {

  authenticationService: AuthenticationService = inject(AuthenticationService);
  firestoreService: FirestoreService = inject(  FirestoreService);
  storageService: StorageService = inject(StorageService);
  userService: UserService = inject(UserService);
 
  datosForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', Validators.required],
    name: ['', Validators.required],
    photo: [null, Validators.required],
    age: [null, Validators.required],
  });

  cargando: boolean = false;

  
  
  

  constructor(private fb: FormBuilder,
              private router: Router,
              private interactionService: InteractionService) {
              }

  async ngOnInit() {}

  async registrarse() {
    this.cargando = true;
    console.log('datosForm -> ', this.datosForm);
    if (this.datosForm.valid) {
      const data = this.datosForm.value;
      console.log('valid -> ', data);
      try {
        await this.interactionService.showLoading('Registrando...');
        const foto: File = data.photo;
        this.userService.validateHasProfile = false;
        const res =  await this.authenticationService.createUser(data.email, data.password)
        const folder = `PhotosPerfil/${res.user.uid}`;
        const snapshot = await this.storageService.uploadFile(folder, foto.name, foto);
        const url = await this.storageService.getDownloadURL(snapshot.ref.fullPath);
        console.log('url -> ', url);
        
        let profile: Models.Auth.UpdateProfileI = {
          displayName: data.name,
          photoURL: snapshot.ref.fullPath
        };
        // https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg'
        // https://cdn.pixabay.com/photo/2021/01/04/10/37/icon-5887113_1280.png
        // https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg
        await this.authenticationService.updateProfile(profile);

        const datosUser: Models.Auth.UserProfile = {
          name: data.name,
          photo: snapshot.ref.fullPath,
          age: data.age,
          id: res.user.uid,
          email: data.email,
          roles: { cliente: true}
        }
        console.log('datosUser -> ', datosUser);
        await this.firestoreService.createDocument(Models.Auth.PathUsers, datosUser, res.user.uid);
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Usuario creado con éxito')
        console.log('usuario creado con éxito');
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
        this.datosForm.controls.photo.setValue(img);
        console.log('this.datosForm.controls.photo -> ', this.datosForm.controls.photo.value);

    }
  }

  download(path: string) {
    this.storageService.downloadFile(path)
  }




}
