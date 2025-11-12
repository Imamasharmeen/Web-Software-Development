import { parse } from 'cookie';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    try {
      // Decode JWT payload safely
      const base64Payload = token.split('.')[1];
      const jsonPayload = Buffer.from(base64Payload, 'base64').toString();
      const payload = JSON.parse(jsonPayload);

      event.locals.user = { email: payload.email };
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}
