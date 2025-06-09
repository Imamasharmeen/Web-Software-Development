import { writable } from 'svelte/store';

export const questions = writable([]);

const API_URL = 'http://localhost:8000/courses/1/questions';

export async function fetchQuestions() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to fetch questions: ${response.status}`);
    const data = await response.json();
    questions.set(data || []);
  } catch (error) {
    console.error('Error fetching questions:', error);
    questions.set([]);
  }
}

export async function addQuestion(title, text) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text })
    });
    if (!response.ok) throw new Error(`Failed to add question: ${response.status}`);
    await fetchQuestions();
  } catch (error) {
    console.error('Error adding question:', error);
  }
}

export async function upvoteQuestion(id) {
  try {
    const response = await fetch(`${API_URL}/${id}/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to upvote question: ${response.status}`);
    await fetchQuestions();
  } catch (error) {
    console.error('Error upvoting question:', error);
  }
}

export async function deleteQuestion(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Failed to delete question: ${response.status}`);
    await fetchQuestions();
  } catch (error) {
    console.error('Error deleting question:', error);
  }
}