export interface IGame {
    id: number;
    title: string;
    thumbnail: string | null;
    price: number;
    discount: number | null;
}