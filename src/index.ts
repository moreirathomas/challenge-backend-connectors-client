import { authenticate } from "./api/auth";
import { getAllAccounts } from "./api/accounts";
import { getAccountTransactions } from "./api/accounts/transactions";

async function main() {
  const token = await authenticate();

  const accounts = await getAllAccounts(token);
  console.log("accounts", accounts);

  for (const account of accounts.account) {
    const transactions = await getAccountTransactions(account.acc_number, token);
    console.log("transactions", transactions);
  }
}

main().catch(console.error);
