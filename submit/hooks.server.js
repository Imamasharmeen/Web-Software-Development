export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    try {
      // Split JWT token
      const parts = token.split('.');
      
      if (parts.length === 3) {
        // Get payload part
        let base64Url = parts[1];
        
        // Convert base64url to base64
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if needed
        while (base64.length % 4) {
          base64 += '=';
        }
        
        // Decode base64
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
        
        // Parse JSON
        const payload = JSON.parse(jsonPayload);
        
        // Set user in locals
        event.locals.user = { email: payload.email };
      } else {
        event.locals.user = null;
      }
    } catch (error) {
      console.error('JWT decode error:', error);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return await resolve(event);
}