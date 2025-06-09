
// import { Hono } from "jsr:@hono/hono@4.6.5";

// const app = new Hono();

// app.get("/courses", (c) => {
//   return c.json({
//     courses: [
//       { id: 1, name: "Web Software Development" },
//       { id: 2, name: "Device-Agnostic Design" }
//     ]
//   });
// });

// app.get("/courses/:id", (c) => {
//   const id = Number(c.req.param("id"));
//   return c.json({
//     course: { id: id, name: "Course Name" }
//   });
// });

// app.post("/courses", async (c) => {
//   const { name } = await c.req.json();
//   return c.json({
//     course: { id: 3, name: name }
//   });
// });

// app.get("/courses/:id/topics", (c) => {
//   return c.json({
//     topics: [
//       { id: 1, name: "Topic 1" },
//       { id: 2, name: "Topic 2" }
//     ]
//   });
// });

// app.get("/courses/:cId/topics/:tId/posts", (c) => {
//   return c.json({
//     posts: [
//       { id: 1, title: "Post 1" },
//       { id: 2, title: "Post 2" }
//     ]
//   });
// });

// app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
//   const pId = Number(c.req.param("pId"));
//   return c.json({
//     post: { id: pId, title: "Post Title" },
//     answers: [
//       { id: 1, content: "Answer 1" },
//       { id: 2, content: "Answer 2" }
//     ]
//   });
// });

// export default app;


// BOOk_ratting

// import { Hono } from "jsr:@hono/hono@4.6.5";
// import { cors } from "jsr:@hono/hono@4.6.5/cors";

// import * as bookController from "./bookController.js";
// import * as ratingController from "./ratingController.js";

// const app = new Hono();
// app.use("/*", cors());

// app.post("/books", ...bookController.createBook);
// app.get("/books", bookController.getBooks);
// app.get("/books/:id", bookController.getBook);
// app.put("/books/:id", ...bookController.updateBook);
// app.delete("/books/:id", bookController.deleteBook);

// app.post("/books/:bookId/ratings", ...ratingController.createRating);
// app.get("/books/:bookId/ratings", ratingController.getRatings);
// app.get("/books/:bookId/ratings/:ratingId", ratingController.getRating);
// app.put("/books/:bookId/ratings/:ratingId", ...ratingController.updateRating);
// app.delete("/books/:bookId/ratings/:ratingId", ratingController.deleteRating);

// export default app;

import { Application } from 'https://deno.land/x/oak/mod.ts';
import { cors } from 'https://deno.land/x/cors/mod.ts';
import questionController from './questionController.js';

const app = new Application();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5174',
  methods: 'GET,POST,DELETE',
  allowedHeaders: ['Content-Type']
}));

// Routes
app.get('/courses/:id/questions', questionController.getQuestions);
app.post('/courses/:id/questions', questionController.addQuestion);
app.post('/courses/:id/questions/:qId/upvote', questionController.upvoteQuestion);
app.delete('/courses/:id/questions/:qId', questionController.deleteQuestion);

await app.listen({ port: 8000 });