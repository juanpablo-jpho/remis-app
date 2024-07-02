import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Models } from 'src/app/models/models';
import { LocalStorageService } from '../../services/local-storage.service';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { FirestoreService } from '../../firebase/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private firestoreService: FirestoreService = inject(FirestoreService);
  private interactionService: InteractionService = inject(InteractionService)

  private carrito: Models.Tienda.Carrito;
  private carrito$ = new Subject<Models.Tienda.Carrito>;

  private infoPedido: Models.Tienda.InfoPedido;
  private infoPedido$ = new Subject<Models.Tienda.InfoPedido>;

  constructor(private router: Router) { 
    this.loadCarrito();
    this.initInfoPedido();
  }

  private initCarrito() {
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

  private getTotal() {
    let total = 0;
    let cantidad = 0;
    this.carrito.items.forEach( item => {
      total += item.cant * item.product.price;
      cantidad += item.cant
    });
    this.carrito.total = total;
    this.carrito.cant = cantidad;
  }

  private async loadCarrito() {
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

  private saveCarrito() {
    const path = 'Carrito';
    this.localStorageService.setData(path, this.carrito);
  }

  private initInfoPedido() {
    this.infoPedido = {
      datos: null,
      fechaEntrega: null,
      direccionEntrega: {
        coordinate: null,
        referencia: null
      }
    }
  }

  getInfoPedido() {
    return this.infoPedido;
  }

  getInfoPedidoChanges() {
    return this.infoPedido$.asObservable();
  }

  setDatosPedido(datos: Models.Tienda.DatosUserPedido) {
    this.infoPedido.datos = datos;
    this.infoPedido$.next(this.infoPedido);
  }

  setFechaEntregaPedido(fecha: Date) {
    this.infoPedido.fechaEntrega = fecha;
    this.infoPedido$.next(this.infoPedido);
  }

  setDireccionPedido(direccion: Models.Tienda.DireccionPedido) {
    this.infoPedido.direccionEntrega = direccion;
    this.infoPedido$.next(this.infoPedido);
  }

  setCoordenadasPedido(coordinate: LatLng) {
    console.log('setCoordenadasPedido -> ', coordinate);
    this.infoPedido.direccionEntrega.coordinate = coordinate;
    this.infoPedido$.next(this.infoPedido);
  }


  async pedir() {
    // validaciones adicionales
    if (this.infoPedido?.datos?.id) {
      const uid = this.infoPedido.datos.id;
      const path = `${Models.Auth.PathUsers}/${uid}/${Models.Tienda.pathPedidos}`; 
      // crear regla en firestore
      const pedido: Models.Tienda.Pedido = {
        carrito: this.carrito,
        info: this.infoPedido,
        uid,
        state: 'nuevo'
      }
      try {
        await this.interactionService.showLoading('Realizando pedido...');
        await this.firestoreService.createDocument(path, pedido);
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Pedido creado con éxito');
        this.clearCarrito();
        // redirigir a la sección que deseemos
        this.router.navigate(['/store/mis-pedidos'])
      } catch (error) {
        this.interactionService.dismissLoading();
        this.interactionService.presentAlert('Error', 'No se pudo realizar el pedido, intenta nuevamente');
      }
    } else {
      this.interactionService.presentAlert('Importante', 'Por favor ingresa tus datos');
    }

  }

  clearCarrito() {
    this.initCarrito();
    this.saveCarrito();
  }







}
