import { Account } from "src/core/account";
import { AccountsResponse, getAllAccounts } from "./accounts";
import { getAccountTransactions, TransactionsResponse } from "./transactions";

export async function fetchAndTransform(accessToken: string): Promise<Account[]> {
  const accounts = await getAllAccounts(accessToken);
  const transactions = await Promise.all(
    accounts.account.map((account) => getAccountTransactions(account.acc_number, accessToken))
  );

  return transform(accounts, transactions);
}

const transform = (accounts: AccountsResponse, transactions: TransactionsResponse[]): Account[] => {
  return accounts.account.map((account, index) =>
    mergeTransactionsOnAccount(account, transactions[index].transactions)
  );
};

const mergeTransactionsOnAccount = (
  account: AccountsResponse["account"][number],
  transactions: TransactionsResponse["transactions"]
): Account => {
  return {
    acc_number: account.acc_number,
    amount: Number(account.amount),
    transactions: transactions.map((transaction) => ({
      label: transaction.label,
      // TODO extract as a unit
      amount: transaction.sign === "CDT" ? Number(transaction.amount) : -Number(transaction.amount),
      currency: transaction.currency,
    })),
  };
};
