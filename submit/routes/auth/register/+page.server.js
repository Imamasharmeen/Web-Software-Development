import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch(`${process.env.PUBLIC_INTERNAL_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        throw redirect(303, '/auth/login');
      } else {
        return {
          message: 'Registration failed. Please try again.'
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