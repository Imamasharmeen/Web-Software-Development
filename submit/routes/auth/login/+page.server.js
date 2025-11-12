import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch(`${process.env.PUBLIC_INTERNAL_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Set the token cookie
        if (result.token) {
          cookies.set('token', result.token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 24 * 7 // 7 days
          });
        }
        
        throw redirect(303, '/');
      } else {
        return {
          message: 'Login failed. Please check your credentials.'
        };
      }
    } catch (error) {
      if (error.status === 303) {
        throw error;
      }
      return {
        message: 'An error occurred. Please try again.'
      };
    }
  }
};