<script>
  import QuestionForm from './QuestionForm.svelte';
  import QuestionList from './QuestionList.svelte';
  import { addQuestion, upvoteQuestion, deleteQuestion } from '../states/questionState.svelte.js';

  export let questions;
  export let courseId;
</script>

<div class="space-y-6">
  <QuestionForm {addQuestion} {courseId} />
  <QuestionList {questions} {upvoteQuestion} {deleteQuestion} />
</div>

<style>
  @import '$lib/app.css';
</style>