<script>
  export let question;
  export let courseId;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const upvote = async () => {
    const res = await fetch(`/api/courses/${courseId}/questions/${question.id}/upvote`, {
      method: 'POST'
    });
    const updated = await res.json();
    dispatch('update', updated);
  };

  const deleteQuestion = async () => {
    await fetch(`/api/courses/${courseId}/questions/${question.id}`, {
      method: 'DELETE'
    });
    dispatch('remove', question.id);
  };
</script>

<li>
  <strong>{question.title}</strong> — {question.upvotes} upvotes
  <button on:click={upvote}>Upvote</button>
  <button on:click={deleteQuestion}>Delete</button>
</li>