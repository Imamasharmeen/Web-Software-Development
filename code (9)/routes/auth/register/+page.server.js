import { redirect, fail } from '@sveltejs/kit';

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
      // Use fail() to properly signal form error to SvelteKit
      return fail(res.status, { message: 'Registration failed' });
    }

    // Redirect to login on successful registration
    throw redirect(303, '/auth/login');
  }
};