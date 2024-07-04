import { LatLng } from "@capacitor/google-maps/dist/typings/definitions";

export namespace ModelsTienda {

    export const pathCategories = 'Categories';
    export const pathProducts = 'Products';
    export const folderProducts = 'Products'
    export const pathPedidos = 'pedidos'

    export interface Category {
        id?: string;
        name: string;
        description: string;
    }

    export interface Product {
        id?: string;
        name: string;
        price: number;
        description: string;
        images: string[];
        enlacePermanente: string
        category: Category
    }

    export interface Carrito {
        items: ItemCarrito[];
        total: number;
        cant: number
    }

    export interface ItemCarrito {
        cant: number;
        product: Product;
    }

    export interface InfoPedido {
        datos: DatosUserPedido
        fechaEntrega: Date | any;
        direccionEntrega: DireccionPedido
    }

    export interface DatosUserPedido {
        id?: string
        name: string;
        mail: string
        phone: string;
    }

    export interface DireccionPedido {
        coordinate: LatLng;
        referencia: string;
    }

    export interface Pedido {
        carrito: Carrito
        info: InfoPedido;
        id?: string;
        date?: any
        uid: string;
        state: StatePedido;
    }

    export type StatePedido = 'nuevo' | 'tomado' | 'asignado' | 'en camino' | 'entregado' | 'cancelado';

    export const StepsPedido: StatePedido[] = ['nuevo', 'tomado', 'asignado', 'en camino', 'entregado'];
    


}