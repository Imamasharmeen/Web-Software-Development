/** Checking password
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";

const hashedPassword = hash("saippuakivikauppias");
console.log(hashedPassword);

const passwordsMatch = verify("asparagus", hashedPassword);
console.log(passwordsMatch);

const passwordsDoNotMatch = verify("password", hashedPassword);
console.log(passwordsDoNotMatch);
 */


app.post("/api/auth/register", async (c) => {
  const data = await c.req.json();
  const email = data.email.trim().toLowerCase();

  try {
    const result = await sql`INSERT INTO users (email, password_hash)
      VALUES (${email}, ${hash(data.password.trim())}) RETURNING *`;
    return c.json({ message: `Confirmation email sent to address ${email}.` });
  } catch (error) {
    return c.json({ message: `Confirmation email sent to address ${email}.` });
  }
});

app.post("/api/auth/login", async (c) => {
  const data = await c.req.json();
  const email = data.email.trim().toLowerCase();

  const result = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (result.length === 0) {
    return c.status(401).json({ message: "Invalid email or password!" });
  }

  const user = result[0];
  const passwordValid = verify(data.password.trim(), user.password_hash);

  if (passwordValid) {
    return c.json({ message: `Logged in as user with id ${user.id}` });
  }
  return c.status(401).json({ message: "Invalid email or password!" });
});