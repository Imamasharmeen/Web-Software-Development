export function load({ locals }) {
  return {
    user: locals.user
  };
}

// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '$env/static/private';

// /** @type {import('./$types').LayoutServerLoad} */
// export const load = async ({ cookies }) => {
//   const token = cookies.get('token');

//   if (!token) {
//     return { user: null };
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return {
//       user: { email: decoded.email }
//     };
//   } catch (err) {
//     return { user: null };
//   }
// };
