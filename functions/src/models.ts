export namespace ModelsFunctions {

    export interface RequestSetRol {
        roles: {
            admin?: boolean
            cliente?: boolean
            motorizado?: boolean
        },
        uid: string
    }

    export interface ResponseSetRol {
        ok: boolean
    }

    export interface UserProfile {
        name: string;
        photo: string;
        age: number;
        id: string;
        email: string;
        roles?: {
            admin?: boolean;
            cliente?: boolean;
            motorizado?: boolean;
        }
        token: string;
    }

    export interface ResponseCreateUser {
        ok: boolean,
        uid?: string;
    }

    export interface NotificationPush {
        tokens: string[], 
        message: {
            title: string; 
            content: string; 
            image?: string;
        };
        data?: any
        tag?: string
    }

    export interface Carrito {
        items: any[];
        total: number;
        cant: number
    }

    export interface InfoPedido {
        datos: DatosUserPedido
        fechaEntrega: Date | any;
        direccionEntrega: any
    }

    export interface DatosUserPedido {
        id?: string
        name: string;
        mail: string
        phone: string;
    }

    export interface Pedido {
        carrito: Carrito
        info: InfoPedido;
        id?: string;
        date?: any
        uid: string;
        state: StatePedido;
        motorizado?: {
            uid: string;
            name: string;
            coordinate: any;
        }
    }

    export type StatePedido = 'nuevo' | 'tomado' | 'asignado' | 'en camino' | 'entregado' | 'cancelado';

    export interface NotificationApp {
        titulo: string;
        descripcion: string;
        enlace: string;
        icono: string;
        color: string;
        state: 'nueva' | 'vista';
        id?: string;
        date?: any
    }

}
