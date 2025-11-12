import postgres from "postgres";

const sql = postgres(); // uses env vars

export default sql;
