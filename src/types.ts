export interface ISellPrice {
  id?: string;
  date: Date;
  amPrice: number;
  pmPrice: number;
}

export interface IBuyPrice {
  id?: string;
  date: Date;
  price: number;
}
