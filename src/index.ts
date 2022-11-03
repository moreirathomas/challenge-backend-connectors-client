import { authenticate } from "./api/auth";
import { fetchAndTransform } from "./api/accounts";

async function main() {
  const token = await authenticate();

  const output = await fetchAndTransform(token);

  console.log(output);
}

main().catch(console.error);
