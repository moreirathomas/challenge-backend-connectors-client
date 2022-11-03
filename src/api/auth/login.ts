import fetch from "../../node-fetch";

interface Credentials {
  login: string;
  password: string;
  client_id: string;
  client_secret: string;
}

const API_URL = `${process.env["API_URL"]}/login`;

export async function login(credentials: Credentials): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: stringifyAuthorization(credentials),
    },
    body: jsonifyBody(credentials),
  });

  if (response.status !== 200) {
    console.error(await response.text());
    throw new Error(`Response error: ${response.statusText}`);
  }

  const data = await response.json();
  return parseLoginResponse(data).refresh_token;
}

const stringifyAuthorization = ({ client_id, client_secret }: Credentials) => {
  return `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`;
};

const jsonifyBody = ({ login, password }: Credentials) => {
  return JSON.stringify({ user: login, password });
};

interface LoginResponse {
  refresh_token: string;
}

const parseLoginResponse = (response: unknown): LoginResponse => {
  if (typeof response !== "object" || response === null) {
    throw new Error("Invalid response");
  }
  // TODO dedicated typeguards
  const { refresh_token } = response as Record<string, unknown>;
  if (typeof refresh_token !== "string") {
    throw new Error("Invalid response");
  }
  return { refresh_token };
};
