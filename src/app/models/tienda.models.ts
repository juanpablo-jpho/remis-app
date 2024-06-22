export namespace ModelsTienda {

    export const pathCategories = 'Categories';
    export const pathProducts = 'Products'

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

}