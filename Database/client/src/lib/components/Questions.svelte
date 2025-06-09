<script>
  import QuestionForm from './QuestionForm.svelte';
  import QuestionList from './QuestionList.svelte';
</script>

<div class="questions-container">
  <h2>Questions</h2>
  <QuestionForm />
  <QuestionList />
</div>

<style>
  .questions-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  h2 {
    margin-bottom: 1rem;
  }
</style>