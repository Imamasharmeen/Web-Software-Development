<script>
  export let question;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function upvote() {
    dispatch('upvoteQuestion', question.id);
    console.log(`Upvote triggered for question ID: ${question.id}`); // NEW: Debugging
  }
  function del() {
    dispatch('deleteQuestion', question.id);
    console.log(`Delete triggered for question ID: ${question.id}`); // NEW: Debugging
  }
</script>

<div class="question">
  <h3 data-testid="question-title">{question.title}</h3>
  <p>{question.text}</p>
  <p>Upvotes: {question.upvotes}</p>
  <button on:click={upvote}>Upvote</button>
  <button on:click={del}>Delete</button>
</div>

<style>
  .question {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  h3 {
    margin-top: 0;
  }
  button {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:first-of-type {
    background-color: #28a745;
    color: white;
  }
  button:first-of-type:hover {
    background-color: #218838;
  }
  button:last-of-type {
    background-color: #dc3545;
    color: white;
  }
  button:last-of-type:hover {
    background-color: #c82333;
  }
</style>