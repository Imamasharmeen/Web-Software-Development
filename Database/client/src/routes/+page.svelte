<script>
  import Questions from '$lib/components/Questions.svelte';
  import { fetchQuestions } from '$lib/states/questionState.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    fetchQuestions();
  });
</script>

<Questions />