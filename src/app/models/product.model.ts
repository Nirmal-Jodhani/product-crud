export interface Product {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    category: Array<string>,
    price: number,
    profit: string,
    isDeleted: number,
}