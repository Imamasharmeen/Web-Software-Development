<script>
  import { page } from '$app/stores';
  import { invalidate } from '$app/navigation';

  export let data;

  let { course, questions } = data;

  let title = '';
  let text = '';
  let error = '';

  async function addQuestion(event) {
    event.preventDefault();
    if (!title.trim() || !text.trim()) {
      error = 'Both title and text are required.';
      return;
    }
    try {
      const res = await fetch(`/api/courses/${course.id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text }),
      });
      if (res.ok) {
        const newQuestion = await res.json();
        questions = [...questions, newQuestion];
        title = '';
        text = '';
        error = '';
      } else {
        error = 'Failed to add question.';
      }
    } catch {
      error = 'Failed to add question.';
    }
  }

  async function upvote(questionId) {
    try {
      const res = await fetch(`/api/courses/${course.id}/questions/${questionId}/upvote`, {
        method: 'POST',
      });
      if (res.ok) {
        // update local upvotes count
        questions = questions.map((q) =>
          q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
        );
      }
    } catch {
      // silently ignore errors here
    }
  }

  async function deleteQuestion(questionId) {
    try {
      const res = await fetch(`/api/courses/${course.id}/questions/${questionId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        questions = questions.filter((q) => q.id !== questionId);
      }
    } catch {
      // silently ignore errors here
    }
  }
</script>

<h1>{course.name}</h1>

{#if error}
  <p style="color: red;">{error}</p>
{/if}

<h2>Questions</h2>
<ul>
  {#each questions as question}
    <li>
      <div>
        <strong>{question.title}</strong>
        <p>{question.text}</p>
        <p>Upvotes: {question.upvotes}</p>
      </div>
      <div>
        <button on:click={() => upvote(question.id)}>Upvote</button>
        <button on:click={() => deleteQuestion(question.id)}>Delete</button>
      </div>
    </li>
  {/each}
</ul>

<h2>Add a new question</h2>
<form on:submit={addQuestion}>
  <input
    type="text"
    name="title"
    placeholder="Title"
    bind:value={title}
    required
  />
  <textarea
    name="text"
    placeholder="Text"
    rows="4"
    bind:value={text}
    required
  ></textarea>
  <button type="submit">Add question</button>
</form>

<style>
  ul li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  ul li div {
    max-width: 75%;
  }

  button {
    margin-left: 0.5rem;
  }

  form input, form textarea {
    margin-bottom: 0.5rem;
  }
</style>