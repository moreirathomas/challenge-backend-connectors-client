import fetch from "../node-fetch";

const API_URL = `${process.env["API_URL"]}/token`;

export async function getAccesToken(refreshToken: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encodeData(refreshToken),
  });

  if (response.status !== 200) {
    console.error(await response.text());
    throw new Error(`Response error: ${response.statusText}`);
  }

  const data = await response.json();
  return parseTokenResponse(data).access_token;
}

const encodeData = (refreshToken: string) => {
  return new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
};

interface TokenResponse {
  access_token: string;
}

const parseTokenResponse = (response: unknown): TokenResponse => {
  if (typeof response !== "object" || response === null) {
    throw new Error("Invalid response");
  }
  // TODO dedicated typeguards
  const { access_token } = response as Record<string, unknown>;
  if (typeof access_token !== "string") {
    throw new Error("Invalid response");
  }
  return { access_token };
};
