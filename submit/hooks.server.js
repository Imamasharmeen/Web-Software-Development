export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    try {
      // Decode JWT token
      const [header, payload, signature] = token.split('.');
      
      if (payload) {
        const decodedPayload = JSON.parse(
          Buffer.from(payload, 'base64').toString('utf-8')
        );
        
        if (decodedPayload.email) {
          event.locals.user = { email: decodedPayload.email };
        }
      }
    } catch (err) {
      console.error('Error decoding token:', err);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  const response = await resolve(event);
  return response;
}