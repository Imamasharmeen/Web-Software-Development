import { Hono } from "jsr:@hono/hono@4.6.5";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import postgres from "postgres";

const sql = postgres(); // Do NOT include any DB credentials

const app = new Hono();

// Constants
const COOKIE_NAME = "token";
const JWT_SECRET = "wsd-project-secret";

// Middleware
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// 🔧 Helper: Clean input
const clean = (data) => {
  data.email = data.email.trim().toLowerCase();
  data.password = data.password.trim();
};

// 🔐 POST /api/auth/register
app.post("/api/auth/register", async (c) => {
  const data = await c.req.json();
  clean(data);

  const passwordHash = await hash(data.password);

  try {
    await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${data.email}, ${passwordHash})
    `;
    return c.json({ message: "Registration successful." });
  } catch (e) {
    return c.json({ message: "Email already registered." });
  }
});

// 🔐 POST /api/auth/login
app.post("/api/auth/login", async (c) => {
  const data = await c.req.json();
  clean(data);

  const users = await sql`
    SELECT * FROM users WHERE lower(email) = ${data.email}
  `;

  if (users.length === 0) {
    return c.json({ message: "Incorrect email or password." });
  }

  const user = users[0];
  const valid = await verify(data.password, user.password_hash);

  if (!valid) {
    return c.json({ message: "Incorrect email or password." });
  }

  const token = await jwt.sign({ email: user.email }, JWT_SECRET);

  setCookie(c, COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    domain: "localhost",
  });

  return c.json({ message: "Welcome!" });
});

export default app;
