import { authenticate } from "./auth";

async function main() {
  await authenticate();
}

main().catch(console.error);
