import { Component, OnInit, inject } from '@angular/core';
import { IonContent, IonHeader, IonMenuToggle, IonTitle, 
         IonToolbar, IonIcon, IonButtons, IonButton, IonLabel, 
         IonItem, IonRouterLink, MenuController, 
         IonToggle, IonAvatar } from "@ionic/angular/standalone";
import { Models } from 'src/app/models/models';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../firebase/authentication.service';
import { User } from '@angular/fire/auth';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonItem, IonLabel, IonButton, IonButtons, IonIcon, 
    IonHeader, IonContent, 
    IonToolbar, IonTitle,
    IonMenuToggle,
    RouterModule,
    CommonModule,
    IonRouterLink,
    IonToggle,
    FormsModule,
    SharedModule
  ]
})
export class SidemenuComponent  implements OnInit {

  menu: Menu[] = [];
  paletteToggle = false;
  user: User;

  admin: boolean = false;

  roles: Models.Auth.Roles;

  constructor(private menuController: MenuController,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) { 
      // this.initMenu();
      this.initDarkMode();

      this.authenticationService.authState.subscribe( async res =>  {
          this.user = res;
          if (this.user) {
            const roles = await this.userService.getRol();
            console.log('roles -> ', roles);
            if (roles?.admin) {
              this.admin = true;
            }
            this.roles = roles;
            
          } 
          this.initMenu();
      });

  }

  ngOnInit() {}

  initMenu() {
    this.menu = [];
    // const menu: Menu[] = [
    //   {name: 'Content', enlace: '/content', icon: 'square-outline'},
    //   {name: 'Items', enlace: '/items', icon: 'list'},
    //   {name: 'Buttons', enlace: '/buttons', icon: 'caret-forward-circle'},
    //   {name: 'Menú', enlace: '/menu', icon: 'menu'},
    //   {name: 'Sliding', enlace: '/sliding', icon: 'hand-left'},
    //   {name: 'Select', enlace: '/select', icon: 'ellipsis-vertical-circle'},
    //   {name: 'Card', enlace: '/card', icon: 'square'},
    //   {name: 'Modal', enlace: '/modal', icon: 'browsers'},
    //   {name: 'Popover', enlace: '/popover', icon: 'stop-circle'},
    //   {name: 'Action Sheet', enlace: '/action-sheet', icon: 'filter-circle'},
    //   {name: 'Alert', enlace: '/alert', icon: 'alert-circle'},
    //   {name: 'Accordion', enlace: '/accordion', icon: 'swap-vertical'},
    //   {name: 'Toast', enlace: '/toast', icon: 'remove'},
    //   {name: 'Loading', enlace: '/loading', icon: 'refresh'},
    //   {name: 'Progress Indicators', enlace: '/progress-indicators', icon: 'hourglass'},
    //   {name: 'Inputs', enlace: '/input', icon: 'keypad'},
    //   {name: 'Textarea', enlace: '/textarea', icon: 'document-text'},
    //   {name: 'Checkbox', enlace: '/checkbox', icon: 'checkbox'},
    //   {name: 'Radio', enlace: '/radio', icon: 'radio-button-on'},
    //   {name: 'Toggle', enlace: '/toggle', icon: 'toggle'},
    //   {name: 'Infinite Scroll', enlace: '/ion-infinite-scroll', icon: 'infinite'},
    //   {name: 'Datetime', enlace: '/datetime', icon: 'calendar'},
    //   {name: 'Tabs', enlace: '/tabs', icon: 'ellipsis-horizontal'},
    //   {name: 'Segment', enlace: '/segment', icon: 'code-working'},
    //   {name: 'Interacción service', enlace: '/interaction', icon: 'help-circle'},
    //   {name: 'Grid', enlace: '/grid', icon: 'apps'},
    // ];
    menu.forEach( opc => {
        let enable: boolean = false;
        if (opc.roles) {
          // ['admin', 'motorizado', 'cliente'];
          // this.roles = { admin: true, motorizado: true, cliente: true }
          if (this.roles) {
            opc.roles.every( role => {
                if (this.roles[role]) {
                  enable = true;
                  return false;
                }
                return true;
            });
          }
        } else {
          enable = true;
        }
        if (enable) {
          this.menu.push(opc);
        }
    });
  } 

  async closeMenu() {
    const isOpen = await this.menuController.isOpen('sidemenu');
    if (isOpen) {
      this.menuController.close('sidemenu');
    }
  }


  initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: any) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  salir() {
    this.authenticationService.logout();
  }


}

interface Menu {
  name: string;
  enlace: string;
  icon: string;
  roles?: Models.Auth.Rol[]
}


const menu: Menu[] = [
  {  name: 'Usuarios', enlace: '/user/admin', icon: 'people', roles: ['admin']},
  {  name: 'Ajustes', enlace: '/backoffice/ajustes', icon: 'cog', roles: ['admin']},
  {  name: 'Tienda', enlace: '/store', icon: 'storefront'},
  {  name: 'Mis pedidos', enlace: '/tienda/mis-pedidos', icon: 'cube', roles: ['cliente']}
];  


