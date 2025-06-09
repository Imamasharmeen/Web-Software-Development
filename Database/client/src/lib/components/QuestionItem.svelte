<script>
  import { upvoteQuestion, deleteQuestion } from '$lib/states/questionState.svelte';

  export let question;
</script>

<div class="question-item">
  <h3>{question.title}</h3>
  <p>{question.text}</p>
  <p>Upvotes: {question.upvotes}</p>
  <button on:click={() => upvoteQuestion(question.id)}>Upvote</button>
  <button on:click={() => deleteQuestion(question.id)}>Delete</button>
</div>

<style>
  .question-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  button {
    margin-right: 0.5rem;
    padding: 0.5rem;
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