import * as privateApi from "./private-generated";
import * as publicApi from "./public-generated";
const api = { ...publicApi, ...privateApi };
export type { ApiError } from "./types";
export { api };
