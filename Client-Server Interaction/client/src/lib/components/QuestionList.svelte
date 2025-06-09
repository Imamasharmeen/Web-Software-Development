<script>
  export let questions;
</script>

{#each questions as question (question.id)}
  <QuestionItem
    {question}
    on:upvoteQuestion
    on:deleteQuestion
  />
{/each}

<style>
  /* Styles are handled by QuestionItem */
</style>