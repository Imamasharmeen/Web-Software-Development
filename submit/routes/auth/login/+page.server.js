import { redirect, fail } from '@sveltejs/kit';
import { PUBLIC_INTERNAL_API_URL } from '$env/static/public';

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();

    if (!email || !password) {
      return fail(400, { message: 'Email and password are required.' });
    }

    // Call backend login API
    const response = await fetch(`${PUBLIC_INTERNAL_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      return fail(401, { message: 'Login failed. Please check your credentials.' });
    }

    const result = await response.json();

    if (result.token) {
      cookies.set('token', result.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // change to true in production
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    // Redirect to home page
    throw redirect(303, '/');
  }
};
