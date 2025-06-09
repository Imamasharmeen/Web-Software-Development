<script>
  import QuestionItem from './QuestionItem.svelte';
  import { questions } from '$lib/states/questionState.svelte';
</script>

{#if $questions.length === 0}
  <p>No questions available.</p>
{:else}
  {#each $questions as question}
    <QuestionItem {question} />
  {/each}
{/if}

<style>
  p {
    color: #666;
  }
</style>