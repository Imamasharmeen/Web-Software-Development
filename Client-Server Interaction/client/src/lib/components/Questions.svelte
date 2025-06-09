<script>
  import { onMount } from 'svelte';
  import QuestionForm from './QuestionForm.svelte';
  import QuestionList from './QuestionList.svelte';

  let questions = [];
  let loading = true;
  let error = '';
  const API_BASE = 'http://localhost:8001'; // MODIFIED: Port 8001 ensured

  async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // NEW: 5s timeout
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, ${await response.text()}`);
        }
        return response;
      } catch (err) {
        if (i === retries - 1) throw err;
        console.warn(`Retry ${i + 1} for ${url}: ${err.message}`); // NEW: Log retries
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  async function fetchQuestions() {
    try {
      loading = true;
      console.log('Fetching questions from:', `${API_BASE}/courses/1/questions`); // NEW: Debugging
      const response = await fetchWithRetry(`${API_BASE}/courses/1/questions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // NEW: CORS compatibility
      });
      const data = await response.json();
      questions = Array.isArray(data) ? data : [];
      console.log('Questions fetched:', questions); // NEW: Debugging
      error = '';
    } catch (err) {
      error = `প্রশ্ন ফেচ করতে ব্যর্থ: ${err.message}`;
      console.error('Fetch questions error:', err); // NEW: Detailed logging
      questions = [];
    } finally {
      loading = false;
    }
  }

  async function handleAddQuestion(event) {
    const { title, text } = event.detail;
    try {
      console.log('Posting question:', { title, text }); // NEW: Debugging
      const response = await fetchWithRetry(`${API_BASE}/courses/1/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text }),
        credentials: 'include', // NEW: CORS compatibility
      });
      const newQuestion = await response.json();
      console.log('Posted question:', newQuestion); // NEW: Debugging
      await fetchQuestions();
    } catch (err) {
      error = `প্রশ্ন যোগ করতে ব্যর্থ: ${err.message}`;
      console.error('Add question error:', err); // NEW: Detailed logging
      throw err; // NEW: Propagate error to form
    }
  }

  async function handleUpvoteQuestion(event) {
    const qId = event.detail;
    try {
      console.log(`Upvoting question ID: ${qId}`); // NEW: Debugging
      const response = await fetchWithRetry(`${API_BASE}/courses/1/questions/${qId}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // NEW: CORS compatibility
      });
      const updatedQuestion = await response.json();
      console.log('Upvoted question:', updatedQuestion); // NEW: Debugging
      await fetchQuestions();
    } catch (err) {
      error = `প্রশ্ন আপভোট করতে ব্যর্থ: ${err.message}`;
      console.error('Upvote question error:', err); // NEW: Detailed logging
    }
  }

  async function handleDeleteQuestion(event) {
    const qId = event.detail;
    try {
      console.log(`Deleting question ID: ${qId}`); // NEW: Debugging
      const response = await fetchWithRetry(`${API_BASE}/courses/1/questions/${qId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // NEW: CORS compatibility
      });
      const deletedQuestion = await response.json();
      console.log('Deleted question:', deletedQuestion); // NEW: Debugging
      await fetchQuestions();
    } catch (err) {
      error = `প্রশ্ন ডিলিট করতে ব্যর্থ: ${err.message}`;
      console.error('Delete question error:', err); // NEW: Detailed logging
    }
  }

  onMount(fetchQuestions);
</script>

<div>
  <h2>প্রশ্নসমূহ</h2>
  {#if loading}
    <p>প্রশ্ন লোড হচ্ছে...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if questions.length === 0}
    <p>কোনো প্রশ্ন নেই।</p> <!-- NEW: Handle empty list -->
  {:else}
    <QuestionForm on:addQuestion={handleAddQuestion} />
    <QuestionList
      {questions}
      on:upvoteQuestion={handleUpvoteQuestion}
      on:deleteQuestion={handleDeleteQuestion}
    />
  {/if}
</div>

<style>
  h2 {
    margin-bottom: 1rem;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>