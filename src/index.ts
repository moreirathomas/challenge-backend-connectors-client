import { login } from "./auth/login";

const getCredential = () => {
  return {
    login: process.env["LOGIN"] as string,
    password: process.env["PASSWORD"] as string,
    client_id: process.env["CLIENT_ID"] as string,
    client_secret: process.env["CLIENT_SECRET"] as string,
  };
};

async function main() {
  const credentials = getCredential();
  const rt = await login(credentials);
  console.log(rt);
}

main().catch(console.error);
