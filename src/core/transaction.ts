type Currency = "EUR";

export interface Transaction {
  label: string;
  amount: number;
  currency: Currency;
}
