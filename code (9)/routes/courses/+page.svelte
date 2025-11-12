<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let courses = [];
  let name = '';
  let error = '';

  async function fetchCourses() {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        courses = await res.json();
      } else {
        error = 'Failed to load courses.';
      }
    } catch {
      error = 'Failed to load courses.';
    }
  }

  async function addCourse(event) {
    event.preventDefault();
    if (!name.trim()) {
      error = 'Course name is required.';
      return;
    }
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const newCourse = await res.json();
        courses = [...courses, newCourse];
        name = '';
        error = '';
      } else {
        error = 'Failed to add course.';
      }
    } catch {
      error = 'Failed to add course.';
    }
  }

  onMount(fetchCourses);
</script>

<h1>Courses</h1>

{#if error}
  <p style="color: red;">{error}</p>
{/if}

<ul>
  {#each courses as course}
    <li><a href={`/courses/${course.id}`}>{course.name}</a></li>
  {/each}
</ul>

<form on:submit={addCourse}>
  <input
    type="text"
    name="name"
    placeholder="New course name"
    bind:value={name}
    required
  />
  <button type="submit">Add course</button>
</form>