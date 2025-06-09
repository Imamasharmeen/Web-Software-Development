import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";

const app = new Hono();

app.use("/*", cors());

let questions = [
  {
    id: 1,
    title: "Question 12345",
    text: "Test question for automated test",
    upvotes: 0,
  },
];

app.get("/courses/:id/questions", (c) => c.json(questions));

app.post("/courses/:id/questions", async (c) => {
  const { title, text } = await c.req.json();
  const newQuestion = {
    id: questions.length ? Math.max(...questions.map(q => q.id)) + 1 : 1,
    title,
    text,
    upvotes: 0,
  };
  questions.push(newQuestion);
  return c.json(newQuestion, 201);
});

app.post("/courses/:id/questions/:qId/upvote", (c) => {
  const qId = Number(c.req.param("qId"));
  const question = questions.find((q) => q.id === qId);
  if (question) {
    question.upvotes += 1;
    return c.json(question);
  }
  return c.json({ error: "Question not found" }, 404);
});

app.delete("/courses/:id/questions/:qId", (c) => {
  const qId = Number(c.req.param("qId"));
  const index = questions.findIndex((q) => q.id === qId);
  if (index !== -1) {
    const deletedQuestion = questions.splice(index, 1)[0];
    return c.json(deletedQuestion);
  }
  return c.json({ error: "Question not found" }, 404);
});

export default app;