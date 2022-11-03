import type { Transaction } from "./transaction";

export interface Account {
  acc_number: string;
  amount: number;
  transactions: Transaction[];
}
