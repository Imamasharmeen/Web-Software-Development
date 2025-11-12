import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch(`${process.env.PUBLIC_INTERNAL_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      return {
        status: res.status,
        errors: { message: 'Registration failed' }
      };
    }

    // Redirect after successful registration
    throw redirect(303, '/auth/login');
  }
};
