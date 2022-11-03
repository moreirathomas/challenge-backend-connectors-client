import fetch from "../../node-fetch";

const apiURL = (accountNumber: string) => `${process.env["API_URL"]}/accounts/${accountNumber}/transactions`;

export async function getAccountTransactions(
  accountNumber: string,
  accessToken: string
): Promise<TransactionsResponse> {
  const response = await fetch(apiURL(accountNumber), {
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
  return parseTransactionsResponse(data);
}

export interface TransactionsResponse {
  transactions: {
    id: string;
    label: string;
    sign: "DBT" | "CDT";
    amount: string; // TODO conversion to number
    currency: "EUR";
  }[];

  link: unknown;
}

const parseTransactionsResponse = (response: unknown): TransactionsResponse => {
  if (typeof response !== "object" || response === null) {
    throw new Error("Invalid response");
  }
  const { transactions, link } = response as TransactionsResponse;
  // TODO deep parsing
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid response");
  }
  // TODO do not ignore link property
  return { transactions, link };
};
