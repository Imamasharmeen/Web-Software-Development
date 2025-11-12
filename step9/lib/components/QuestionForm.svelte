<script>
  export let courseId;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let title = '';
  let text = '';

  const submitForm = async () => {
    const res = await fetch(`/api/courses/${courseId}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text })
    });
    const newQuestion = await res.json();
    dispatch('addQuestion', newQuestion);
    title = '';
    text = '';
  };
</script>

<form on:submit|preventDefault={submitForm}>
  <input name="title" placeholder="Question title" bind:value={title} />
  <textarea name="text" placeholder="Question text" bind:value={text}></textarea>
  <button type="submit">Add Question</button>
</form>