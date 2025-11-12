/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const courseId = params.id;

  const courseRes = await fetch(`/api/courses/${courseId}`);
  const questionsRes = await fetch(`/api/courses/${courseId}/questions`);

  if (!courseRes.ok || !questionsRes.ok) {
    return {
      status: 404,
      error: new Error('Course not found')
    };
  }

  const course = await courseRes.json();
  const questions = await questionsRes.json();

  return { course, questions };
}