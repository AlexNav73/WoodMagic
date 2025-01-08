export interface Product {
  id: string | null;
  name: string;
  imageUrl: string;
  price: number;
  rate: number;
  state: 'Started' | 'Finished';
}

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
}
