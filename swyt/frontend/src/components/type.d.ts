export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    zoomStyle?: string;
    showSubtitle?: boolean;
}
