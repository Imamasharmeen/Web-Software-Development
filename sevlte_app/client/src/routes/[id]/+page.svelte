<script>
  import { onMount } from 'svelte';
  import QuestionForm from '$lib/components/QuestionForm.svelte';
  import QuestionList from '$lib/components/QuestionList.svelte';

  export let data;
  let courseId = data.courseId;
  let course = {};
  let questions = [];

  const fetchData = async () => {
    const courseRes = await fetch(`/api/courses/${courseId}`);
    course = await courseRes.json();

    const questionsRes = await fetch(`/api/courses/${courseId}/questions`);
    questions = await questionsRes.json();
  };

  const addQuestion = (question) => {
    questions = [...questions, question];
  };

  const updateQuestion = (updated) => {
    questions = questions.map(q => q.id === updated.id ? updated : q);
  };

  const removeQuestion = (id) => {
    questions = questions.filter(q => q.id !== id);
  };

  onMount(fetchData);
</script>

<h1>{course.name}</h1>

<QuestionList {questions} {courseId} on:updateQuestion={e => updateQuestion(e.detail)} on:removeQuestion={e => removeQuestion(e.detail)} />

<QuestionForm {courseId} on:addQuestion={e => addQuestion(e.detail)} />
