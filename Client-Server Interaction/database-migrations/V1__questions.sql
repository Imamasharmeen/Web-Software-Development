CREATE TABLE question (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0
);