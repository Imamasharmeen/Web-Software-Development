<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let title = '';
  let text = '';
  let error = ''; // NEW: Form error state

  async function handleSubmit() {
    if (!title.trim() || !text.trim()) {
      error = 'Title and text are required'; // NEW: Validation
      return;
    }
    try {
      await dispatch('addQuestion', { title, text });
      title = '';
      text = '';
      error = '';
      console.log('Question submitted successfully'); // NEW: Debugging
    } catch (err) {
      error = 'Failed to submit question'; // NEW: Error handling
      console.error('Form submission error:', err); // NEW: Debugging
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="title">Title</label>
    <input id="title" name="title" type="text" bind:value={title} required />
  </div>
  <div>
    <label for="text">Question Text</label>
    <textarea id="text" name="text" bind:value={text} required></textarea>
  </div>
  {#if error}
    <p class="error">{error}</p> <!-- NEW: Display errors -->
  {/if}
  <button type="submit">Add Question</button>
</form>

<style>
  div {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
    height: 100px;
    resize: vertical;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>