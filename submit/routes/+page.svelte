<script>
  export let data;
</script>

<h1>Welcome!</h1>
<a href="/courses">Courses</a>

{#if data.user}
  <p>Logged in as: {data.user.email}</p>
{/if}