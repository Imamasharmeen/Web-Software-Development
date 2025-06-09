import postgres from 'postgres';

const sql = postgres({
  host: 'wsd_project_database',
  port: 5432,
  user: 'username',
  password: 'password',
  database: 'database'
});

export async function getQuestions() {
  return await sql`SELECT id, title, description AS text, upvotes FROM question WHERE course_id = 1`;
}

export async function addQuestion(title, text) {
  const [question] = await sql`
    INSERT INTO question (course_id, title, description, upvotes)
    VALUES (1, ${title}, ${text}, 0)
    RETURNING id, title, description AS text, upvotes
  `;
  return question;
}

export async function upvoteQuestion(id) {
  const [question] = await sql`
    UPDATE question
    SET upvotes = upvotes + 1
    WHERE id = ${id} AND course_id = 1
    RETURNING id, title, description AS text, upvotes
  `;
  return question;
}

export async function deleteQuestion(id) {
  const [question] = await sql`
    DELETE FROM question
    WHERE id = ${id} AND course_id = 1
    RETURNING id, title, description AS text, upvotes
  `;
  return question;
}