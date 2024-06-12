import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCol, IonContent, 
  IonGrid, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonItem, 
  IonLabel, IonList, IonMenuButton, IonModal, IonChip, IonListHeader,
  IonRow, IonText, IonTitle, IonToolbar, IonAvatar, 
  IonFooter,
  IonRouterLink,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar} from '@ionic/angular/standalone';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CompletarRegistroComponent } from './pages/completar-registro/completar-registro.component';
import { RequestLoginComponent } from './pages/request-login/request-login.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    CompletarRegistroComponent,
    RequestLoginComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonItem, IonAvatar, IonLabel, IonCard, IonBackButton, IonButtons,
    IonMenuButton, IonBackButton, IonList, IonItem, IonButton,
    IonModal, IonGrid, IonRow, IonCol,
    IonInput, IonInputPasswordToggle,
    IonCard, IonText,
    IonChip, IonIcon, IonSpinner,
    IonListHeader, IonList, IonFooter,
    IonSegment, IonSegmentButton,
    IonSelect, IonSelectOption,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonSearchbar,
    IonRouterLink
  ]
})
export class AuthModule { }
