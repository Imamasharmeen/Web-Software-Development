<script>
  import { addQuestion } from '$lib/states/questionState.svelte';

  let title = '';
  let text = '';

  async function handleSubmit() {
    if (title && text) {
      await addQuestion(title, text);
      title = '';
      text = '';
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Title:
    <input type="text" bind:value={title} name="title" required />
  </label>
  <label>
    Text:
    <textarea bind:value={text} name="text" required></textarea>
  </label>
  <button type="submit">Add Question</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin-bottom: 2rem;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>