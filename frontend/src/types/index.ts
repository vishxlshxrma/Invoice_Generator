export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}

export interface userState {
  isSignedIn: boolean;
  user: User | null;
}

export interface FormState {
  name?: string;
  email: string;
  password: string;
}

export interface Product {
  _id?: string;
  name: string;
  qty: number;
  rate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Invoice {
  _id: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface InvoiceEntry {
  invoice: Invoice;
  product: Product[];
}
