export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rate: number;
  state: "Started" | "Finished";
}
