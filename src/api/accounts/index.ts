import fetch from "../../node-fetch";

const API_URL = `${process.env["API_URL"]}/accounts`;

export async function getAllAccounts(accessToken: string) {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    console.error(await response.text());
    throw new Error(`Response error: ${response.statusText}`);
  }

  const data = await response.json();
  return parseAccountsResponse(data);
}

interface AccountsResponse {
  account: {
    acc_number: string;
    amount: string; // TODO conversion to number
    currency: "EUR";
  }[];

  link: unknown;
}

const parseAccountsResponse = (response: unknown): AccountsResponse => {
  if (typeof response !== "object" || response === null) {
    throw new Error("Invalid response");
  }
  const { account, link } = response as AccountsResponse;
  // TODO deep parsing
  if (!Array.isArray(account)) {
    throw new Error("Invalid response");
  }
  // TODO do not ignore link property
  return { account, link };
};
