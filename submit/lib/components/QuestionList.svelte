<script>
  import QuestionItem from './QuestionItem.svelte';
  export let questions = [];
  export let courseId;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handleUpdate = (q) => dispatch('updateQuestion', q);
  const handleRemove = (id) => dispatch('removeQuestion', id);
</script>

<ul>
  {#each questions as question}
    <QuestionItem {question} {courseId} on:update={e => handleUpdate(e.detail)} on:remove={e => handleRemove(e.detail)} />
  {/each}
</ul>