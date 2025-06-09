CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL
);

CREATE TABLE book_ratings (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT
);

-- Example: Insert a book
INSERT INTO books (title, year) VALUES ('The Pragmatic Programmer', 1999);

-- Example: Insert a rating for the book (assuming the book's id is 1)
INSERT INTO book_ratings (book_id, rating, feedback) VALUES (1, 5, 'Excellent resource for developers!');