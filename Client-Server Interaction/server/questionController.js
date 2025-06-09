import { getQuestions, addQuestion, upvoteQuestion, deleteQuestion } from './questionRepository.js';

export async function getQuestions({ params }) {
  const questions = await getQuestions();
  return questions;
}

export async function addQuestion({ request, response }) {
  const { title, text } = await request.body.json();
  const question = await addQuestion(title, text);
  response.body = question;
}

export async function upvoteQuestion({ params }) {
  const question = await upvoteQuestion(parseInt(params.qId));
  return question;
}

export async function deleteQuestion({ params }) {
  const question = await deleteQuestion(parseInt(params.qId));
  return question;
}