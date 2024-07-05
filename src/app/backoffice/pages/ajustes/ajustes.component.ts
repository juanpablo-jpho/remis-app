import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {

  menu: MenuAjustes[] = menuAjustes;

  constructor() { }

  ngOnInit() {}

}

interface MenuAjustes {
  nombre: string;
  enlace: string;
  icono: string;
  color: string;
  background: string;
}

const menuAjustes: MenuAjustes[] = [
  {nombre: 'Categorias', enlace: '/backoffice/ajustes/categorias', icono: 'text', color: '#ffffff', background: '#2196f3'},
  {nombre: 'Productos', enlace: '/backoffice/ajustes/productos', icono: 'cube', color: '#ffffff', background: '#00bcd4'},
  {nombre: 'Pedidos', enlace: '/backoffice/pedidos', icono: 'storefront', color: '#ffffff', background: '#accd2b'}

] 
