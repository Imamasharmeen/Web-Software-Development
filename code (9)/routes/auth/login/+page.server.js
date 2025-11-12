import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch(`${process.env.PUBLIC_INTERNAL_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      return {
        status: res.status,
        errors: { message: 'Login failed' }
      };
    }

    const { token } = await res.json();

    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 60 * 60 * 24
    });

    throw redirect(303, '/');
  }
};