import { login } from "./login";
import { getAccesToken } from "./token";

const getCredential = () => {
  return {
    login: process.env["LOGIN"] as string,
    password: process.env["PASSWORD"] as string,
    client_id: process.env["CLIENT_ID"] as string,
    client_secret: process.env["CLIENT_SECRET"] as string,
  };
};

export async function authenticate() {
  const credentials = getCredential();
  const refreshToken = await login(credentials);
  const accessToken = await getAccesToken(refreshToken);
  return accessToken;
}
