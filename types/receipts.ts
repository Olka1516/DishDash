export interface IReceipt {
  title: string;
  description: string;
  id: string;
  image: string;
  page: string;
  ingredients: { name: string; count: string }[];
}
