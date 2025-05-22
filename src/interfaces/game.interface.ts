export interface IGame {
    id: string;
    title: string;
    thumbnail: string | null;
    price: number;
    discount: number | null;
}