import { authenticate } from "./api/auth";
import { getAllAccounts } from "./api/accounts";

async function main() {
  const token = await authenticate();

  const accounts = await getAllAccounts(token);
  console.log("accounts", accounts);
}

main().catch(console.error);
