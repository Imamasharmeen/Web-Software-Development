import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_INTERNAL_API_URL } from '$env/static/public';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.trim().toLowerCase();
    const password = formData.get('password')?.trim();

    if (!email || !password) {
      return fail(400, { message: 'Email and password required.' });
    }

    // Send registration request to backend API
    const res = await fetch(`${PUBLIC_INTERNAL_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // If registration succeeded, redirect to login page
    if (res.ok) {
      throw redirect(303, '/auth/login');
    }

    // Otherwise show message
    const body = await res.json().catch(() => ({}));
    return fail(400, { message: body?.message || 'Registration failed.' });
  }
};
