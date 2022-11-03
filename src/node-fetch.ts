// When transpiling to CommmonJS, node-fetch@3 will not be available.
// Workaround: defer the import to load it asychronously.
// https://github.com/node-fetch/node-fetch/issues/1279
import type { RequestInfo, RequestInit } from "node-fetch";

const importDynamic = new Function("modulePath", "return import(modulePath)");

type Fetch = typeof import("node-fetch").default;

const fetchPromise: Promise<Fetch> = importDynamic("node-fetch").then(
  (mod: typeof import("node-fetch")) => mod.default
);

const fetch = (url: RequestInfo, init?: RequestInit) => fetchPromise.then((fetch) => fetch(url, init));

// eslint-disable-next-line import/no-default-export
export default fetch;
