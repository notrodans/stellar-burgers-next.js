import * as publicApi from "./public-generated";
import * as privateApi from "./private-generated";
const api = { ...publicApi, ...privateApi };
export { api };
export type { ApiError } from "./types";
