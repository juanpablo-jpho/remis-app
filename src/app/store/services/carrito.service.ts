import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Models } from 'src/app/models/models';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  localStorageService: LocalStorageService = inject(LocalStorageService)

  carrito: Models.Tienda.Carrito;
  carrito$ = new Subject<Models.Tienda.Carrito>;

  constructor() { 
    this.initCarrito();
    this.loadCarrito();
  }

  initCarrito() {
    this.carrito = {
      items: [],
      total: 0,
      cant: 0
    }
  }

  addItem(product: Models.Tienda.Product) {
    const index = this.carrito.items.findIndex( itemExist => itemExist.product.id == product.id );
    if (index >= 0) {
      // agregar cantidad
      this.carrito.items[index].cant ++;
    } else {
      // es nuevo
      this.carrito.items.push( {
        cant: 1,
        product
      })
    }
    this.getTotal();
    this.saveCarrito();
    this.carrito$.next(this.carrito);
  }

  removeItem(product: Models.Tienda.Product) {
    const index = this.carrito.items.findIndex( itemExist => itemExist.product.id == product.id );
    if (index >= 0) {
      if (this.carrito.items[index].cant > 1) {
        this.carrito.items[index].cant --;
      } else {
        this.carrito.items.splice(index, 1);
      }
    } 
    this.getTotal();
    this.saveCarrito();
    this.carrito$.next(this.carrito);
  }

  deleteItem(product: Models.Tienda.Product) {
    const index = this.carrito.items.findIndex( itemExist => itemExist.product.id == product.id );
    if (index >= 0) {
      this.carrito.items.splice(index, 1);
    }
    this.getTotal();
    this.saveCarrito();
    this.carrito$.next(this.carrito);
  }

  getCarritoChanges() {
    return this.carrito$.asObservable();
  }

  getCarrito() {
    return this.carrito;
  }

  getTotal() {
    let total = 0;
    let cantidad = 0;
    this.carrito.items.forEach( item => {
      total += item.cant * item.product.price;
      cantidad += item.cant
    });
    this.carrito.total = total;
    this.carrito.cant = cantidad;
  }

  async loadCarrito() {
    const path = 'Carrito';
    const data = await this.localStorageService.getData(path);
    if (data) {
      console.log('localStorage carrito -> ', data);
      this.carrito = data;
    } else {
      this.initCarrito();
    }
    this.carrito$.next(this.carrito);
  }

  saveCarrito() {
    const path = 'Carrito';
    this.localStorageService.setData(path, this.carrito);
  }



}
