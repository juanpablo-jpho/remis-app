import { Component, Input, OnInit, inject } from '@angular/core';
import { Models } from 'src/app/models/models';
import { InteractionService } from '../../../services/interaction.service';
import { FunctionsService } from 'src/app/firebase/functions.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {

  @Input() user: Models.Auth.UserProfile;
  private functionsService: FunctionsService = inject(FunctionsService);
  roles: Models.Auth.Rol[] = ['admin', 'cliente', 'motorizado'];
  rolesSelect: Models.Auth.Rol[] = [];

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
      this.initRoles()
  }

  initRoles() {
    for (const key in this.user.roles) {
       const rol: any = key
       this.rolesSelect.push(rol)
    }
    console.log('this.rolesSelect -> ', this.rolesSelect);
  }

  async changeRol(ev: any) {
    console.log('changeRol -> ', ev.detail.value);
    await this.interactionService.showLoading('Actualizando...')
    const roles: any = {};
    this.rolesSelect.forEach( rol => {
          roles[rol] = true 
    });
    const updateDoc = { 
      roles
    }
    console.log('updateDoc roles -> ', updateDoc);
    const request: Models.Functions.RequestSetRol = {
      roles,
      uid: this.user.id
    }
    try {
      const response = await this.functionsService.call<any, any>('appCall', request)
      this.interactionService.dismissLoading();
      this.interactionService.showToast('Rol actualizado con éxito');
      console.log('response -> ', response);
    } catch (error) {
      this.interactionService.dismissLoading();
      this.interactionService.presentAlert('Error', 'No se pudo actualizar el rol del usuario');
      console.log('changeRol error -> ', error);
      
    }
    
  }

}
