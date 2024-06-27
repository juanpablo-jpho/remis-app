export namespace ModelsTienda {

    export const pathCategories = 'Categories';
    export const pathProducts = 'Products';
    export const folderProducts = 'Products'

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
        items: {
            cant: number;
            product: Product;
        }[];
        total: number;
        cant: number
    }

}