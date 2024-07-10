export namespace ModelsNotifications {

    export const pathNotificaciones = 'notificaciones';

    export interface Notification {
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

