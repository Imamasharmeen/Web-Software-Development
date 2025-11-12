<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let courses = [];
  let name = '';

  // Load courses on mount
  onMount(async () => {
    const res = await fetch('/api/courses');
    if (res.ok) {
      courses = await res.json();
    }
  });

  // Add new course
  async function addCourse() {
    if (!name.trim()) return;

    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      const newCourse = await res.json();
      courses = [...courses, newCourse];
      name = '';
    }
  }
</script>

<h1>Courses</h1>

<ul>
  {#each courses as course}
    <li><a href={`/courses/${course.id}`}>{course.name}</a></li>
  {/each}
</ul>

<form on:submit|preventDefault={addCourse}>
  <input name="name" bind:value={name} required />
  <button type="submit">Add Course</button>
</form>
